const express = require("express")
const{UserModel} = require("../models/users.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const{name,password,location,age}=req.body

    try{
        const check_user = await UserModel.findOne({name});
        if(check_user){
            res.status(400).send({msg:"User alredy exist,please login"})
        }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({name,password:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"Register Has benn Done"})
        })
    }
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

userRouter.post("/login",async(req,res)=>{
    const{name,password}=req.body
    try{
        const user = await UserModel.findOne({name})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Successfull!","token":jwt.sign({"userId":user._id},"soni")})
                }else{
                    res.status(400).send({"msg":"Wrong Credentilas"})
                }
            })
        }else{
            res.status(200).send({"msg":"Nosuch User Exist"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={userRouter}