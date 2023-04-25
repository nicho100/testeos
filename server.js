//npm innit -y ,npm i express ,i socket.io, init -y , i ejs,express cookie-parser, express-session,connect-mongo ,mongoose,passport,passport-local,bcrypt
//minimist,dotenv, i compression, i log4js,i autocannon
const cluster =require("cluster")
const express=require('express')
const {createServer}= require('http')
require("./config/auth")
const passport=require("passport")

const mongoStore=require("connect-mongo")
const expressSession=require("express-session")
const { urlMongo, config} = require('./config/enviorment')
const { routerRandom } = require('./routes/random')
const logger = require("./config/loggers")
const { routerLogins } = require("./routes/logins")
const { getProducts, addProduct } = require("./controller/product")
const { getChats, addChat } = require("./controller/chat")


const modo=config.modo


if (cluster.isPrimary && modo==="cluster"){//dependiendo del modo se inicia el server en modo cluster o fork
    for(let i=0;i<numCpus;i++){
        cluster.fork()
    }
    cluster.on("exit",(worker,code,signal)=>{
        cluster.fork()
    })
}else{
const app= express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
const socketIo = require('socket.io')
const server=createServer(app)
const io =socketIo(server)

app.use(expressSession({//se crea una cookie
    store: mongoStore.create({mongoUrl:urlMongo}),
    secret:"secreto",
    resave: true,
    saveUninitialized:true,
    cookie:{maxAge:10000},
    rolling:true,
}))

app.use(passport.initialize())//se usa passport para controlar los logins de los usuariosS
app.use(passport.session())
app.set('views', './public')
app.set('view engine', 'ejs')
    

app.use('/api',routerRandom)//traigo las rutas implementadas
app.use("/",routerLogins)//traigo las rutas de logeos

io.on('connection',async(client) => {
    //guardo todos los productos y mensajes en una variable
    const produc=await getProducts()
    const messages=await getChats()
    console.log("cliente se conecto")
    client.emit("messages",messages)//emito al cliente los mensajes y productos
    client.emit("products",produc)
    
    //escucho el nuevo mensaje recibido del cliente, lo guardo en una variable con el resto de los mensajes y lo emito a todos
    client.on("newMessage",async(msg)=>{
        await addChat(msg)
        const messages=await getChats()
        io.sockets.emit("messageAdded",messages)
        console.log(msg)
    })
    //escucho el nuevo producto recibido del cliente, lo guardo en una variable con el resto de los productos y lo emito a todos
    client.on("newProduct",async(pro)=>{
        await addProduct(pro)
        const produc=await getProducts()
        io.sockets.emit("productAdded",produc)
    })
    
  
    
 });
    
    server.listen(config.puerto,(req,res)=>logger.info("funciona"))    
 
   
 
}


