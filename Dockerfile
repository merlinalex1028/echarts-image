FROM node:20-slim

# Multi-architecture build arguments
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

# Install common dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    unzip \
    dpkg \
    xdg-utils \
    fonts-wqy-microhei \
    fonts-wqy-zenhei \
    xfonts-wqy \
    && rm -rf /var/lib/apt/lists/*

# Install architecture-specific Chrome/Chromium
RUN if [ "$TARGETARCH" = "arm64" ]; then \
        apt-get update && apt-get install -y chromium chromium-sandbox && rm -rf /var/lib/apt/lists/*; \
    fi

# Enable pnpm
RUN corepack enable

WORKDIR /app
COPY . .
RUN rm -rf node_modules

# Install dependencies with architecture-specific environment variables
RUN if [ "$TARGETARCH" = "arm64" ]; then \
        PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true pnpm install; \
    else \
        pnpm install; \
    fi

# Create architecture-specific environment file
RUN if [ "$TARGETARCH" = "arm64" ]; then \
        echo "PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium" >> /etc/environment; \
    fi

EXPOSE 3000

# Create startup script that sources environment
RUN echo '#!/bin/bash\n\
if [ -f /etc/environment ]; then\n\
    set -a\n\
    source /etc/environment\n\
    set +a\n\
fi\n\
exec "$@"' > /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["pnpm", "start"]
