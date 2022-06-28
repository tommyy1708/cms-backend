const Router = require("koa-router")
const router = new Router()
const {query} = require('../../utils')

router.get('/', async ctx =>{

    let result = await new Promise((resolve, reject)=>{
        query(`SELECT * FROM user`, (err, rows)=>{
            if(err) reject(err);
            resolve(rows)
        })
    })
    ctx.body = result
})

module.exports = router;