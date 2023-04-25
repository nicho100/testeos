const axios= require("axios")
 axios.post("/signup",{
    username:"nico",
    password:"123"
 })
 .then(function(response){
    console.log(response)
 }).catch(function(error){
    console.log(error);
 })