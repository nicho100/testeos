const Chat=require("../schemas/mongoChat")
class MongoChat{
    async connect(){
        await connectToDb()
    }

getAllChats=async()=>{//se traen todos los chats de la base de datos
    const chats=await Chat.find({})
    return chats
}
addSingleChat =async(chat)=>{//se añade un chat a la base de datos
    const newChat=new Chat(chat)
    await newChat.save()
    return chat
}
getChatById=async(id)=>{//se busca un chat por el id en la base de datos
    const chat=await Chat.getById(id)
    return chat
}  

}



module.exports=MongoChat
