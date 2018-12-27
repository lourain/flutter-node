'use strict';
const express = require('express')
const router = express.Router()
const { Flutter, Pic } = require('../../mongo/model')
var youziku = require("youziku");
var youzikuClient = new youziku.youzikuClient("8d4498b1eeb0afb4b2a230aca5bfb102"); //apikey
var cdata = {
    Datas: []
};
var chinese = ['风满楼']


let getFlutter = function () {
    return new Promise((resolve, resject) => {
        new Flutter().get_condition({}, { title: 1 }, function (titles) {
            let o = {}
            o.item_name = '记录'
            o.path = '/detail'
            o.list = titles
            resolve(o)
        })
    })
}
let getPic = function () {
    return new Promise((resolve, reject) => {
        new Pic().get({}, null, function (pics) {
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

router.get('/', async function (req, res) {
    let article = await getFlutter()
    let pics = await getPic()
    let data = []
    data.push(article, pics)
    // console.log(pics);
    
    let arr = JSON.stringify(data).match(/[A-Za-z0-9]*[\u4e00-\u9fa5]+[A-Za-z0-9]*/g)
    chinese = [chinese,...arr].join('')
    cdata.Datas.push({ AccessKey: '7316cbf0e0dc4648bf4c89f5522534b0', Content: chinese, Url: 'youziku/test1' });
    youzikuClient.createBatchWoffWebFontAsync(cdata, function (result) {//发送 有字库 我用到的字
        console.log(result);
    })
    
    res.json({ "code": 0, data: data })

})

module.exports = router