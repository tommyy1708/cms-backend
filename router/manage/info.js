const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../utils')


router.get('/', async ctx => {
    //get token
    let token = ctx.request.headers['cms-token'];
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, '签名错误', 'token无效或过期')
        return;
    }
    let sql = `SELECT username,token,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql)
    ctx.body = result[0];
})

router.post('/', async ctx => {
    let token = ctx.request.headers['cms-token'];
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, '签名错误', 'token无效或过期')
        return;
    }
    
    //数据库中的字段
    let { username, password,avatar } = ctx.request.body;
    let sql2 = `SELECT * FROM user WHERE username='${username}'`;
    let result2 = await queryFn(sql2)
    if(result2.length > 0){
       ctx.body = returnMsg(1, '用户名已存在')
        return;
    }

    let sqlOld = `SELECT username,password,avatar FROM user WHERE token='${token}'`
    let resultOld = await queryFn(sqlOld)

    let sql = `UPDATE user SET username="${username || resultOld[0].username}", password="${password || resultOld[0].password}" , avatar="${avatar || resultOld[0].avatar}" WHERE token="${token}"`;
    await queryFn(sql)
    //再次查询数据
    let sql1 = `SELECT * FROM user WHERE token='${token}'`;
    let result = await queryFn(sql1)
    ctx.body = returnMsg(0, '修改成功', {
        avatar:result[0].avatar,
        username: result[0].username,
        'cms-token': result[0].token
    });
})

module.exports = router;