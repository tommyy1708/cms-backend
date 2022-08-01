const Router = require("koa-router")
const router = new Router();
const { jwtVerify, returnMsg, queryFn } = require("../../utils")
const fs = require("fs");
const multer = require('@koa/multer');//加载@koa/multer模块
const path = require("path")


let myFileName = ''

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload/'),
    filename: (req, file, cb) => {
        myFileName = `${file.fieldname}-${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`
        cb(null, myFileName)
    }
})

const limits = {
    filedSize: 1024 * 200,//字节为单位
    fields: 1,
    files: 1
}
let upload = multer({ storage, limits });

router.post('/', upload.single('avatar'), async ctx => {
    let token = ctx.request.headers['cms-token']
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, '查询失败')
        return;
    } else {
        let updataSql = `UPDATE user SET avatar="${myFileName || result[0].avatar}" WHERE token="${token}"`
        await queryFn(updataSql)

        let sql = `SELECT avatar,username, token FROM user WHERE token="${token}"`
        let result = await queryFn(sql)
        ctx.body = returnMsg(0, '头像修改成功', {
            avatar: result[0].avatar,
            "cms-token": result[0].token,
            username: result[0].username
        })
    }
})

module.exports = router