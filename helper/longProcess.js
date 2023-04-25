//se crea un proceso bloqueante
process.on("message",(cantidad)=>{//child
    const resultadoObjeto={}
for(let i=0;i<cantidad;i++){
    const numeroRandom=Math.trunc(Math.random()*1000+1)
    resultadoObjeto[numeroRandom]=resultadoObjeto[numeroRandom]?resultadoObjeto[numeroRandom]+1:1//del lado izquierdo muestra los numeros 
                                                                                            //y del derecho muestra la cantidad de repeticiones
}

process.send(resultadoObjeto)
})
