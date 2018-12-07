const express = require('express')
const router = express.Router()
const {Pic} = require('../../mongo/model')

router.get('/',function(req,res){
    new Pic().get()
})

module.exports = router