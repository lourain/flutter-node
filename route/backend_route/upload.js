const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const {Pic} = require('../../mongo/model')

router.post('/',upload.any(),function(req,res){
    let pics= req.files
    console.log(req.body,pics)
    pics.forEach(pic => {
        fs.rename(`./uploads/${pic.filename}`,`./uploads/${pic.originalname}`,err=>{
            if(err) console.error(err);
            // new Pic({name:pic.originalname,introduce:'',url:'/'+pic.originalname}).save()
        })
    });
	res.json({ "code": 0, "msg": "上传成功" })
})
module.exports = router