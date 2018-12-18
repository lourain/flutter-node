'use strict';
const express = require('express')
const router = express.Router()
const {Flutter,Pic} = require('../../mongo/model')

let getFlutter = function(){
    return new Promise((resolve,resject)=>{
        new Flutter().get_condition({},{title:1},function(titles){
            let o = {}
            o.item_name = '记录'
            o.path = '/detail'
            o.list = titles
            resolve(o)
        })
    })
}
let getPic = function(){
    return new Promise((resolve,reject)=>{
        new Pic().get({},null,function(pics){
            pics.forEach(pic => {
                // var newPic = Object.create(pic)
                pic['title'] = pic['album_name']
                delete pic['album_name']
            });
            let o = {}
            o.item_name = '相册'
            o.path = '/ablum'
            o.list = pics
            console.log(o);
            

            resolve(o)
        })
    })
}

router.get('/',async function(req,res){
    let article = await getFlutter()
    let pics = await getPic()
    let data = []
    data.push(article,pics)
    // console.log(pics);
     
    res.json({"code":0,data:data})
    
})


module.exports = router