const Router = require("koa-router")
const router = new Router()
const {returnMsg, queryFn} = require('../../../utils')

router.get('/', async ctx=>{

    let sql = `SELECT * FROM cms_web_menu`
    let result = await queryFn(sql)
    
    ctx.body = returnMsg(0,'请求成功',result);
})

module.exports = router;