const Router = require("koa-router")
const router = new Router()
const jwt = require('jsonwebtoken')
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

//url is /article/add
router.post('/', async ctx=>{
    
    let token = ctx.request.headers['cms-token']
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2,'查询失败','token过期')
        return;
    }
    
    let sql = `SELECT editable , username FROM user WHERE token='${token}'`;
    let result = await queryFn(sql)
    if(result[0].editable === 1){
        let {title, subtitle, content} = ctx.request.body;
        if(!title || !subtitle){
            ctx.body= returnMsg(1,'缺少参数')
            return;
        }
       let sql1 = `INSERT INTO artical VALUES (null,'${title}','${subtitle}||"" ','${result[0],username}||""','${date}', '${content}|| "" ')`;
       await queryFn(sql1)
       ctx.body = returnMsg(0, '添加成功')
    }else{
        ctx.body = returnMsg(0,'你没有权限')
        return;
    }
    
}) 

module.exports = router; 