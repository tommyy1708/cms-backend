const Router = require("koa-router")
const router = new Router()
const { returnMsg, queryFn } = require("../../utils")

router.post('/', async ctx => {
    let { username, password } = ctx.request.body
    if (username && password) {
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql)
        if (result.length > 0) {
            ctx.body = returnMsg(1, 'user exsisted')
        } else {
            let sql1 = `INSERT INTO user VALUES (null, '${username}','${password}',null, 'avatar.jpeg', null,'normal',1)`
            await queryFn(sql1)
            ctx.body = returnMsg(0, 'register success', result);
        }
    } else {
        ctx.body = returnMsg(1, 'some wrong');
    }
   
})

module.exports = router;