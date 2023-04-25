const User=require("../schemas/mongoUser")
const connectToDb=require("../config/connectToDb")
class MongoUser{
    async connect(){
        await connectToDb()
    }
getAllUsers=async()=>{//se traen todos los usuarios de la base de datos
    const users=await User.find({})
    return users
}
addSingleUser =async(user)=>{//se añade un usuario a la base de datos
    const newUser=new User(user)
    await newUser.save()
    return user
}
getUserById=async(id)=>{//se busca un usuario por id en la base de datos
    const user=await User.getById(id)
    return user
}
}


module.exports={MongoUser}