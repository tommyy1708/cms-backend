const Router = require("koa-router")
const router = new Router()
const utils = require('../../utils')
const login = require('./login')
const register = require('./register')
const info = require('./info')
const upload = require('./upload')
const article = require('./article')
const namelist = require('./nameList')

router.get('/', async ctx =>{
    let result = await new Promise((resolve, reject)=>{
        utils.query(`SELECT * FROM user`, (err, rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
    ctx.body = result
})


router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/upload', upload.routes(),upload.allowedMethods())
router.use('/article', article.routes(),article.allowedMethods())
router.use('/namelist', namelist.routes(),namelist.allowedMethods())

module.exports = router;