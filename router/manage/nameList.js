const Router = require('koa-router')
const router = new Router()
const {returnMsg, queryFn, jwtVerify} = require('../../utils')

router.get('/',async ctx=>{
    let token = ctx.request.headers['cms-token']
    if(!jwtVerify(token)){
        ctx.body = returnMsg(0, 'token过期或用户不存在')
        return;
    }
    
    let sql = `SELECT id,avatar,editable,player,username FROM user WHERE player!='vip'`;
    let result = await queryFn(sql)
    ctx.body = returnMsg(0, '请求成功',result)
})

router.post('/', async ctx=>{
    let token = ctx.request.headers['cms-token']
    if(!jwtVerify(token)){
        ctx.body = returnMsg(0, 'token过期或用户不存在')
        return;
    }
    let {id, open} = ctx.request.body;
    if(!id || !open) {
        ctx.body =returnMsg(1, '参数错误')
        return;
    }
    let sql = `SELECT editable FROM user WHERE id='${id}'`
    let result = await queryFn(sql);
    if(result[0].editable === 1 && open === 1){
        ctx.body = returnMsg(2, '用户已有权限')
    }
    if(result[0].editable === 2 && open === 2){
        ctx.body = returnMsg(2, '用户没有权限')
    }
    let sql1 = `UPDATE user SET editable='${open}' WHERE id='${id}'`
    let result1 = await queryFn(sql1)
    ctx.body = returnMsg(0,'修改成功',result1[0])
})

module.exports = router;