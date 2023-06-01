const mysql = require("mysql");
const client = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"010115",
    database:"test"
})



module.exports = function sqlFn(sql,arr,callback){
    client.query(sql,arr,(error,result) =>{
        if(error){
            console.log(error)
            return;
        }
        callback(result) // 回调函数
    })
}

