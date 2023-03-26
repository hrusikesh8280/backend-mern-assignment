const express = require("express")
const todoRouter = express.Router()
const{TodoModel} = require("../models/todo.model")
const jwt = require("jsonwebtoken")

todoRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token,"soni")
    try{
        if(decode){
            let todo = await TodoModel.find({"userId":decode.userId})
            res.status(200).send(todo)
        }
    }catch(err){
        res.status(400).json({"message":err.message})
    }
})


todoRouter.post("/add",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token,"soni")
    const payload = req.body
    try{
        if(decode){
            const todo = new TodoModel(payload)
            await todo.save()
            res.status(200).send({"msg":"a new todo has been added"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

todoRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    const userid=req.body.userId
    try{
        let payload=await TodoModel.findByIdAndUpdate({_id:id,userId:userid},{$set:data})
        res.status(200).send(JSON.stringify(payload))
    }catch(err){
        res.status(400).send({"msg":err.message})

    }
})



// todoRouter.delete("/delete/:id",auth,async(req,res)=>{
//     const id=req.params.id
//     try{
//         await TodoModel.findByIdAndDelete({_id:id})
//         res.status(200).send({"msg":"data deleted "})
//     }catch(err){
//         res.status(400).send({"msg":err.message})

//     }
// })

todoRouter.delete("/delete/:id",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token,"soni")
    const id=req.params.id
    const req_id = decode.userId
    const todo =await TodoModel.findOne({_id:id})
    const userID_in_todo = todo.userId

console.log(decode)
    try{
        if(req_id===userID_in_todo){
            await TodoModel.findByIdAndDelete({_id:id})
            res.status(200).json({"msg":"notes is Deleted"})
        }else{
            res.status(400).send({"msg":"Not Authorized"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})








module.exports={todoRouter}




