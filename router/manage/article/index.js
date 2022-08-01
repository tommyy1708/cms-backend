const Router = require("koa-router")
const router = new Router()
const list = require('./list')
const info = require('./id')
const edit = require('./edit')

router.use('/list', list.routes(),list.allowedMethods());
router.use('/info', info.routes(),info.allowedMethods());
router.use('/edit', edit.routes(),edit.allowedMethods());

module.exports = router; 