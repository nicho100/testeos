const mongoose= require("mongoose")

const chatSchema=new mongoose.Schema({//creo el esquema de los chats para mongo
    email:{type:String, required: true},
    message:{type:String,required:true},
})

module.exports=mongoose.model("chat",chatSchema)
