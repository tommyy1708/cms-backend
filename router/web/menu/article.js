const Router = require("koa-router")
const router = new Router()
const {returnMsg, queryFn} = require('../../../utils')

router.get('/', async ctx=>{
    let id = ctx.request.query.id;
    let sql = `SELECT * FROM artical WHERE id=${id} `;
    let result = await queryFn(sql)
    
    ctx.body = returnMsg(0,'请求成功',result);
})

module.exports = router;