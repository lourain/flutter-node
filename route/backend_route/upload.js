'use strict';
const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const tinify = require('tinify')
const upload = multer({ dest: 'uploads/' })
const {Pic} = require('../../mongo/model')
tinify.key = 'Rm2zHDh0wzkkpJkpgVx9LjjkpNd3zkny'

router.post('/',upload.any(),function(req,res){
    let pics= req.files
    console.log(req.body,pics)
    let urls = []
    pics.forEach(pic => {
        urls.push('/'+pic.originalname)
        fs.rename(`./uploads/${pic.filename}`,`./uploads/${pic.originalname}`,err=>{
            if(err) console.error(err);
            console.log(pic.originalname);
            //压缩图片
            const source = tinify.fromFile('./uploads/' + pic.originalname);
            source.toFile('./uploads/' + pic.originalname)

        })
    });
    //查找是否有此相册若没有就创建
    new Pic().update({album_name:req.body.album_name},{$push:{urls:urls}},function(data){
        res.json({"code":0,data:data})
    })
})
module.exports = router