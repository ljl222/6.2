const express = require("express");
const router = express.Router();
const validator = require('validator');
const isEmpty = require("lodash/isEmpty");
const sqlFn = require("./config");
const url = require("url");
const jwt = require("jsonwebtoken");
const key = require("./secretKey")


/**
 * 如果发生错误，则返回错误信息，如果不发生错误，则返回true
 */
const validatorInput = (data) =>{
    /**
     * validator.isEmpty方法验证是否为空
     */
    let errors = {}
    if(validator.isEmpty(data.username)){
        errors.username = "用户名不能为空"
    }
    if(!validator.isEmail(data.email)){
        errors.email = "不符合邮箱格式"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "用户名不能为空"
    }
    /**
     * equals:验证字符串是否相同
     */
    if(!validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation = "两次密码不相同"
    }

    return{
        // 如果 value 为空，那么返回 true，否则返回 false。
        isValid:!isEmpty(errors),
        errors
    }
}





router.post("/register",(req,res) =>{
    const { isValid,errors } = validatorInput(req.body)
    if(isValid){
        // 失败
        res.send({
            errors,
            status:400
        })
    }else{
        // 成功 将数据写入到数据库
        const { username,email,password } = req.body;
        const sql = "insert into user values (null,?,?,?)";
        const arr = [username,password,email]
        sqlFn(sql,arr,result =>{
            if(result.affectedRows >0){
                res.send({
                    msg:"注册成功",
                    status:200
                })
            }else{
                res.send({
                    msg:"注册失败",
                    status:401
                })
            }
        })
    }
})

/**
 * 重复用户名字
 */
router.get("/repeat/username",(req,res) =>{
    const username = url.parse(req.url,true).query.username;
    const sql = "select * from user where username=?";
    const arr = [username]
    sqlFn(sql,arr,result =>{
        if(result.length >0){
            res.send({
                status:200,
                msg:"用户名重复",
                flag:false
            })
        }else{
            res.send({
                status:200,
                msg:"用户名可用",
                flag:true
            })
        }
    })
})

/**
 * 用户登陆
 */
router.post("/login",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const sql = "select * from user where username=? and password=?";
    const arr = [username,password];
    sqlFn(sql,arr,result =>{
        if(result.length >0){
            const token = jwt.sign({
                uid:result[0].id,
                username:result[0].username
            },key.secretKey)
            res.send({
                token,
                nick:result[0].username,
                status:200
            })
        }else{
            res.send({
                status:400,
                msg:"用户名密码错误"
            })
        }
    })
})


/**
 * 首页的列表数据
 */
router.get("/list",(req,res) =>{
    // 读取到token
    const token = req.headers.authorization;
    if(token){
        res.send({
            list:[
                {
                    id:1001,
                    name:'数据的零知识证明'
                },
                {
                    id:1002,
                    name:'文件的零知识证明'
                }
            ], 
            status:200
        })
    }else{
        res.send({
            status:401,
            msg:"请先登陆"
        })
    }
})

module.exports = router;