const Router = require("koa-router")
const router = new Router()
const { returnMsg, queryFn, jwtVerify } = require('../../../utils')

router.post('/', async ctx => {
  let token = ctx.request.headers['cms-token']
  if (!jwtVerify(token)) {
    ctx.body = returnMsg(2, '查询用户失败或者token过期')
    return;
  }

  let { id,content,title ,subtitle,date,author} = ctx.request.body
  let sql = `SELECT * FROM artical WHERE id='${id}'`
  let result = await queryFn(sql)
  let sql1 = `UPDATE artical SET title='${title}', subtitle='${subtitle||''}',content='${content||''}',date='${date||''}', author='${author||''}' WHERE id='${id}'`;
   await queryFn(sql1)
   
  ctx.body =returnMsg(0, '文章修改成功',result[0])
})

module.exports = router; 