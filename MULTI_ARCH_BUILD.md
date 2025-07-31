# 多架构 Docker 镜像构建指南

## 概述

修改后的 Dockerfile 现在支持构建适用于不同 CPU 架构的 Docker 镜像，包括：
- **AMD64** (x86_64) - 常见的桌面和服务器架构
- **ARM64** (aarch64) - Apple Silicon、ARM 服务器等架构

## 主要改进

### 1. 多架构支持参数
```dockerfile
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS
```

### 2. 架构特定的浏览器安装
- **ARM64**: 安装系统的 Chromium 浏览器
- **AMD64**: 使用 Puppeteer 默认的 Chrome 下载

### 3. 环境变量优化
- ARM64 架构上跳过 Puppeteer 的 Chromium 下载
- 为 ARM64 设置正确的 Chromium 执行路径

## 构建命令

### 单架构构建
```bash
# 构建 AMD64 镜像
docker build --platform linux/amd64 -t your-app:amd64 .

# 构建 ARM64 镜像  
docker build --platform linux/arm64 -t your-app:arm64 .
```

### 多架构构建 (推荐)

**⚠️ 重要提示**: 使用 `docker buildx` 构建时必须指定输出方式，否则会收到警告且镜像不会保存。

#### 方案1: 推送到镜像仓库 (推荐)
```bash
# 创建 buildx 构建器
docker buildx create --name multiarch --use

# 构建并推送多架构镜像到仓库
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t your-registry/your-app:latest \
  --push .
```

#### 方案2: 本地使用 (单架构)
```bash
# 只能加载当前平台的镜像到本地 Docker
docker buildx build \
  --platform linux/amd64 \
  -t your-app:latest \
  --load .

# 或者构建 ARM64 (在 Apple Silicon Mac 上)
docker buildx build \
  --platform linux/arm64 \
  -t your-app:latest \
  --load .
```

#### 方案3: 导出为文件
```bash
# 导出多架构镜像为 tar 文件
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t your-app:latest \
  --output type=tar,dest=your-app.tar .

# 或导出到目录
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t your-app:latest \
  --output type=local,dest=./build-output .
```

## 故障排除

### Puppeteer Chrome 错误

如果遇到以下错误：
```
Error: Could not find Chrome (ver. 138.0.7204.168). This can occur if either
 1. you did not perform an installation before running the script (e.g. `npx puppeteer browsers install chrome`) or
 2. your cache path is incorrectly configured (which is: /root/.cache/puppeteer).
```

**原因**: 在 ARM64 架构上，Puppeteer 无法找到 Chrome 浏览器

**解决方案**: 
已实现**双重保障**来解决此问题：

1. **Dockerfile 级别**: 
   - ARM64 架构自动安装 Chromium
   - 环境变量 `PUPPETEER_EXECUTABLE_PATH` 自动设置为 `/usr/bin/chromium`

2. **代码级别**: 
   - 添加了自动检测 Chrome 可执行文件路径的函数
   - 自动尝试多个可能的 Chrome/Chromium 路径
   - 如果找不到系统 Chrome，回退到 Puppeteer 内置版本

**验证修复**:
```bash
# 构建镜像
docker build -t test-app .

# 运行容器并检查环境变量
docker run --rm test-app bash -c "echo \$PUPPETEER_EXECUTABLE_PATH"

# 在 ARM64 上应该输出: /usr/bin/chromium
# 在 AMD64 上应该输出: (空)
```

### 警告: "No output specified with docker-container driver"

如果看到此警告：
```
WARNING: No output specified with docker-container driver. Build result will only remain in the build cache. To push result image into registry use --push or to load image into docker use --load
```

**原因**: 使用 `docker buildx` 时没有指定输出方式

**解决方案**:
1. **推送到仓库**: 添加 `--push` 参数
2. **加载到本地**: 添加 `--load` 参数 (仅支持单架构)
3. **导出文件**: 使用 `--output type=tar,dest=filename.tar`

**注意**: 多架构镜像无法直接 `--load` 到本地 Docker，因为本地 Docker 只能运行一个架构的镜像。

### 无法推送到仓库？

如果没有 Docker Registry，可以：
1. 使用本地文件导出方式
2. 分别构建单架构镜像
3. 使用 Docker Hub 等公共仓库

## 注意事项

1. **ARM64 兼容性**: 在 ARM64 架构上，使用系统安装的 Chromium 而不是 Puppeteer 下载的 Chrome
2. **字体支持**: 已包含中文字体支持，在所有架构上都可以正常渲染中文内容
3. **性能**: ARM64 架构上的性能可能与 AMD64 略有差异
4. **构建时间**: 多架构构建需要更长时间，特别是在非原生架构上
5. **本地测试**: 如需本地测试，建议先构建当前平台的单架构镜像

## 验证构建

构建完成后，可以使用以下命令验证镜像支持的架构：

```bash
docker buildx imagetools inspect your-registry/your-app:latest
```

这将显示镜像支持的所有平台架构。
