const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')

router.get('/',function(req,res){
    new Flutter().get_condition({},{title:1,_v:0},function(titles){
        
    })
})


module.exports = router