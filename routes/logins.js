const { Router } = require("express")
const passport=require("passport")
const logger = require("../config/loggers")
const compression=require("compression")
const { getProducts } = require("../controller/product")
const routerLogins= Router()
const numCpus=require("os").cpus().length


routerLogins.get('/datos',async (req,res)=>{//si el usuario se loguea se muestra el listado de los productos
    if(req.session.username){
    const produc=await getProducts()
    const nombre=req.session.username
    res.render('form.ejs',{produc,nombre})
    return  
    }
    res.redirect("/login.html")
})
routerLogins.get("/info",compression(),(req,res)=>{//muestra el path la version de node, el numero de procesadores, la memoria que se usa
    let path=process.argv[1]
    let processId=process.pid
    let node=process.version
    let os=process.platform
    let memoria=process.memoryUsage()
    let carpetaProyecto=process.cwd()
    let procesadores=numCpus
    const datos={
        pathEjecucion:path,
        Process:processId,
        versionNode:node,
        sistemaOperativo:os,
        procesadores,
        memoriaTotal:memoria,
        carpetaDelProyecto:carpetaProyecto
    }
    res.send(JSON.stringify(datos,null,2))
})

routerLogins.post('/signup',passport.authenticate("signup",{failureRedirect:"login.html"}),async (req,res)=>{//ruta para que el usuario se registre
   req.session.username=req.user.username
  res.redirect("/datos")
})

routerLogins.post('/login',passport.authenticate("login",{failureRedirect:"/login.html"}), async (req,res)=>{//ruta para que el usuario inicie sesion
    req.session.username=req.user.username
    
    
  
    res.redirect("/datos")
})

routerLogins.get("/logout",async(req,res)=>{//ruta para cerrar sesion
    req.session.destroy(()=>{
        res.send("hasta luego")
    })
})
routerLogins.get("*",(req,res)=>{//si se busca una ruta no implementada da un warning
    const {url,method}=req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no implementada`)
})

module.exports={routerLogins}