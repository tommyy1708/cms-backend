//node主要是写在服务端的项目
// node 的项目基本是使用require引入 
const Koa = require("koa2")
const Router = require("koa-router")
const {port , host } = require("./utils")
const app = new Koa()
const router = new Router()
const manage = require('./router/manage')
const web = require('./router/web')
const cors = require("koa2-cors")
const path = require("path")
// 引入静态文件中间件middle ware
const static = require("koa-static")
const nomatch = require("./router/nomatch")

// async 是异步的.  除了ctx还有next

app.use(cors())
// 让路由生效, 所有的app.use里面参数都是端口+callback
app.use(router.routes(),router.allowedMethods())
app.use(static( path.join(__dirname,"static")))
router.get('/',async ctx=>{
    ctx.body='home page'
})
router.use('/web', web.routes(),web.allowedMethods())
router.use('/manage', manage.routes(),manage.allowedMethods())
//这写的是后端的路由
router.use('/404', nomatch.routes(), nomatch.allowedMethods())
 
app.use(async (ctx, next)=>{
    await next();
    if(parseInt(ctx.status)===404){
        ctx.response.redirect('/404')
    }
})


app.listen(port, ()=>{
    console.log(`server is running at ${host}:${port}`);
})