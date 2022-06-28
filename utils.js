// 这样写的原因是便于今后不同host之间的切换, 只需要注释掉就好了.
const mysql = require("mysql")
// 开发环境的host
let host = 'http://localhost';
//生产环境的host
// let host = 'http://8.53.13.511'

//开发环境的port
let port = 9000;

//生产环境的port
// let port = 80;

const pool = mysql.createPool({
    host:"localhost",
    port:3306,
    database:"sys",
    user:"root",
    password:"12345678",
})

const query = (sql,callback) =>{
    pool.getConnection(function(err,connection){
        connection.query(sql, function(err, rows){
            callback(err,rows)
            connection.release()
        })
    })
}



// node的导出
module.exports = {
    host, port,query
}