const Router = require("koa-router")
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

router.post('/', async ctx => {
    let token = ctx.request.headers['cms-token']

    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, '查询用户失败或者token过期')
        return;
    }

    let { id } = ctx.request.body
    if (!id){
        ctx.body = returnMsg(1, '参数错误')
        return;
    }

    let sql2 = `SELECT editable FROM user WHERE token='${token}'`
    let result2 = await queryFn(sql2)
    if(result2[0].editable === 0){
       ctx.body = returnMsg(2,'没有删除权限')
       return;
    }
    let sql = `SELECT * FROM artical WHERE id=${id}`
    let result = await queryFn(sql)
    if (result.length == 0) {
        ctx.body = returnMsg(2, '异常或文章不存在');
        return
    }
    let sql1 = `DELETE FROM artical WHERE id=${id}`;
    await queryFn(sql1)
    ctx.body = returnMsg(0, '文章删除成功')
})

module.exports = router; 