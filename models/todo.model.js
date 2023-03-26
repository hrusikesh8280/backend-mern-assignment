const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:String,
    task:String,
    subject:String,
    userId:String,
},{
    versionKey:false
})

const TodoModel = mongoose.model("Todo",todoSchema)

module.exports={
    TodoModel
}