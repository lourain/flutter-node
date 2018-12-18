"use strict";
const express = require('express')
const router = express.Router()
const os = require('os')
const {Pic} = require('../../mongo/model')

router.get('/',function(req,res){
    let id = req.query.id
    console.log(os.networkInterfaces());
    
    new Pic().get({_id:id},null,function(data){
        res.json({"code":0,"data":data[0]})
    })
})

module.exports = router