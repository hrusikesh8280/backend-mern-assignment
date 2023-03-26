const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    password:String,
    location:String,
    age:Number

},{
    vewsionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}