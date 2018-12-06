const express = require('express')
const app = express()
const {execFile} = require('child_process')
execFile('node',['./backend/backend.js'],function(err,stdout,stderr){
    if(err){
        console.error(err);
    }
    console.log(stdout);
    console.log(stderr);
    
})
app.get('/',function(req,res){
    res.json({"code":0})
})
app.listen('8888',()=>{
    console.log(`running at port 8888`);
    
})