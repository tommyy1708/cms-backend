const Router = require("koa-router")
const router = new Router()
const nav = require('./menu/home')
const banner = require('./menu/banner')
const list = require('./menu/list')
const article = require('./menu/article')

router.get('/', async ctx=>{

    ctx.body = "官网数据"
})

router.use('/nav', nav.routes(), nav.allowedMethods())
router.use('/banner', banner.routes(), banner.allowedMethods())
router.use('/list', list.routes(), list.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())

module.exports = router;