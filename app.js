const express = require('express')
const app = express()
const {execFile} = require('child_process')
const {Flutter} = require('./mongo/model')

execFile('node',['./backend/backend.js'],function(err,stdout,stderr){
    if(err){
        console.error(err);
    }
    console.log(stdout);
    console.log(stderr);
    
})

app.get('/detail',function(req,res){
    if(req.query.id){
        new Flutter().get_condition({_id:req.query.id},{_v:0},function(data){
            res.json({ "code": 0, "data": data[0] })
        })
    }else{
        res.json({"code":1,"msg":"params missing"})
    }
})
app.listen('8888',()=>{
    console.log(`running at port 8888`);
    
})