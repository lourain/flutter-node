'use strict';
const express = require('express')
const router = express.Router()
const {Pic} = require('../../mongo/model')


router.get('/',function(req,res){
    let id = req.query.id
    if(id){
        new Pic().get({_id:id},null,function(albums){
            res.json({"code":0,data:albums})
        })
    }else{
		new Pic().get({}, { album_name: 1, urls: 1, _id: 1 }, function (albums) {
			res.json({ "code": 0, data: albums });
		});
		
    }
    
})

module.exports = router
