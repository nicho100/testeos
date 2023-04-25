const{getAllUsers,getUserById,addSingleUser}=require("../dao/user")

const getUsers=async()=>{
    const users=await getAllUsers()
    return users
}
            
const addUser=async(user)=>{
    if (user.name){
        const addedUser=await addSingleUser(user)
        return addedUser
    }
        throw new Error("Invalid user")
}
    //const delete= async(elementId)=>{
    //    let elementDelete= await this.model.deleteOne({_id:elementId})
    //    console.log(elementDelete)
    //}
const getById=async(id)=>{
    const user= await getUserById(id)
    return user
}
//const update= async(elementId,key,newValue)=>{
 //   const update = {};
 //   update.$set[key] = newValue

  //  let elementUpdate= await this.model.findByIdAndUpdate(elementId,update)
   // console.log(elementUpdate)
//}

module.exports={getUsers,addUser,getById}