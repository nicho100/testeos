const Mongodao= require("./product")

let mongodao=undefined
const getDao=async()=>{//conecta a la base de datos
    if(!mongodao){
        mongodao=new Mongodao()
        await mongodao.connect()
    }
    return mongodao
}
module.exports=getDao
