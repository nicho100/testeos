const{getAllChats,getChatById,addSingleChat}=require("../dao/chat")

const getChats=async()=>{//trae todos los chats que hay en la base de datos
    const chats=await getAllChats()//se usa la implementacion del dao
    return chats
}
            
const addChat=async(chat)=>{//añade un chat a la base de datos
    if (chat.email){
        const addedChat=await addSingleChat(chat)
        return addedChat
    }
        throw new Error("Invalid chat")
}
    //const delete= async(elementId)=>{
    //    let elementDelete= await this.model.deleteOne({_id:elementId})
    //    console.log(elementDelete)
    //}
const getById=async(id)=>{//trae el chat de un usuario por id
    const chat= await getChatById(id)
    return chat
}
//const update= async(elementId,key,newValue)=>{
 //   const update = {};
 //   update.$set[key] = newValue

  //  let elementUpdate= await this.model.findByIdAndUpdate(elementId,update)
   // console.log(elementUpdate)
//}

module.exports={getChats,addChat,getById}