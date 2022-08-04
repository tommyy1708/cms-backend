// 这样写的原因是便于今后不同host之间的切换, 只需要注释掉就好了.
const mysql = require("mysql")
const jwt = require('jsonwebtoken')
// 开发环境的host
let host = 'http://127.0.0.1';
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
    password:"root123",
})

const query = (sql,callback) =>{
    pool.getConnection(function(err,connection){
        if(err) return console.log(err.sqlMessage)
        connection.query(sql, function(err, rows){
            callback(err,rows)
            connection.release()
        })
    })
}

const queryFn = (sql) =>{
    return new Promise((resolve, reject)=>{
        query(sql, (err, rows)=>{
            if(err) reject(err);
            resolve(rows)  // 返回的是数组  [{}]
        })
    })
}

const returnMsg = (errCode,message,data) =>{
    return {
        errCode:errCode || 0,
        message:message || "",
        data:data || {}
    }
}

const jwtVerify = (token) =>{
    try{
         jwt.verify(token , 'laoniunencao')
         return true;
    }catch(err){
        return false;
    }
}

// node的导出
module.exports = {
    host, port,query, returnMsg,queryFn,jwtVerify
}