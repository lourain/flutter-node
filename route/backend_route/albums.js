const express = require('express')
const router = express.Router()
const {Pic} = require('../../mongo/model')

router.get('/',function(req,res){
    new Pic().get({},{album_name:1,_id:0},function(albums){
        // let data = []
        // albums.forEach(album => {
        //     data.concat(Object.values(album))
        // });
        // console.log(albums,data);
        
        res.json({"code":0,data:albums})
    })
})

module.exports = router