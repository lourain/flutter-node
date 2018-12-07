const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')

router.get('/',function(req,res){
    if(req.query.id){
        new Flutter().get_condition({_id:req.query.id},{_v:0},function(data){
            res.json({ "code": 0, "data": data[0] })
        })
    }else{
        res.json({"code":1,"msg":"params missing"})
    }
})
module.exports = router