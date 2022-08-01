const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn } = require('../../utils')

router.post('/', async ctx => {
    let { username, password } = ctx.request.body
    if (username && password) {
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql)
        if (result.length > 0) {
            let token = jwt.sign(
                { username, password },
                'laoniunencao',
                { expiresIn: '1h' }
            )
            let addToken = `UPDATE user SET token='${token}' WHERE username='${username}'`;
            await queryFn(addToken)
            let result1 = await queryFn(sql)
            let obj = {
                username:result1[0].username,
                'cms-token':result1[0].token,
                avatar:result1[0].avatar,
                player:result1[0].player,
                editable:result1[0].editable
            }
            ctx.body = returnMsg(0, '登陆成功', obj)
        } else {
            ctx.body = returnMsg(2, 'user not exist')
        }
    } else {
        ctx.body = returnMsg(1, 'element worng')
    }
})

module.exports = router;