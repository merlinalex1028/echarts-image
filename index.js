const Koa = require("koa");
const path = require("path")
const koaStatic = require("koa-static")
const bodyParser = require("koa-bodyparser")
const views = require("@ladjs/koa-views")
const Router = require("@koa/router")
const app = new Koa();
const router = new Router();
const renderCharts = require('./controller/charts')
const config = require("./config")

//配置静态路径
app.use(koaStatic(path.join(__dirname, "./resource")))
app.use(koaStatic(path.join(__dirname, "./dist/html")))

//配置请求体解析
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))

//将ejs设置为默认的模板引擎
app.use(views(path.resolve(__dirname, "views"), {
  extension: 'ejs'
}))

//调试界面
router.get("/", async (ctx, next) => {
  await ctx.render("chartsDebug")
})

//接口
router.post("/echarts", renderCharts)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, () => {
  //服务器启动后，执行
  console.log("服务器已经启动！")
})
