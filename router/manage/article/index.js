const Router = require("koa-router")
const router = new Router()
const list = require('./list')
const info = require('./id')
const edit = require('./edit')
const delete1 = require('./delite_ar')
const { queryFn } = require("../../../utils")
const add = require('./add')


router.get('/', async ctx=>{
    let index = 10;
    let count = 10;
    let sql = `SELECT * FROM artical LIMIT ${index},${count}`;
    let result = await queryFn(sql)
    // let sql = `SELECT * FROM artical`; 
    // let arr = result.slice(index,index+count)
    // let arr = result
    ctx.body = result 
})

router.use('/list', list.routes(),list.allowedMethods());
router.use('/add', add.routes(),add.allowedMethods());
router.use('/info', info.routes(),info.allowedMethods());
router.use('/edit', edit.routes(),edit.allowedMethods());
router.use('/delete', delete1.routes(),delete1.allowedMethods());

module.exports = router; 