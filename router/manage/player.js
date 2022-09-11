const Router = require('koa-router')
const router = new Router()
const {returnMsg, queryFn, jwtVerify} = require('../../utils')

router.get('/',async ctx=>{
    let token = ctx.request.headers['cms-token']
    if(!jwtVerify(token)){
        ctx.body = returnMsg(1, 'token过期或用户不存在')
        return;
    }
    
    let sql = `SELECT player FROM user WHERE token='${token}'`
    let result = await queryFn(sql)
    ctx.body = returnMsg(0, '请求成功',result)
})


module.exports = router;