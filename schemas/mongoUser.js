const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({//creo el esquema de usuarios para mongo
    username:{type:String, required: true},
    password:{type:String,required:true},
})

module.exports=mongoose.model("user",userSchema)

