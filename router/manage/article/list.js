const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

//url is /article/list
router.get('/', async ctx=>{
    let sql = `SELECT id,title,subtitle,author,date FROM artical`
    let result =  await queryFn(sql)

    ctx.body = returnMsg(0,'success',result)
})


module.exports = router; 