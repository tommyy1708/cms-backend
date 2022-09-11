const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')
const moment = require('moment')

router.post('/', async ctx=>{
    let token = ctx.request.headers['cms-token']
    //test
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2,'查询失败','token过期')
        return;
    }
    let sql = `SELECT username FROM user WHERE token="${token}"`
    let result = await queryFn(sql) 
    let {title, subtitle, content} = ctx.request.body;
    if(!title || !content){
        ctx.body= returnMsg(1,'缺少参数')
        return;
    }
    let mydate = moment().format('YYYY-MM-DD hh:mm:ss');
    let sql1 = `INSERT INTO artical VALUES (null,'${title||""}','${subtitle||""} ','${result[0].username||""}','${mydate}', '${content||" "}')`;
    await queryFn(sql1)
    ctx.body = returnMsg(0, '文章添加成功')
    
}) 

module.exports = router; 