'use strict';
const express = require('express')
const router = express.Router()
const { Flutter, Pic } = require('../../mongo/model')
var Fontmin = require('fontmin');

var srcPath = 'fonts/lixuke.ttf'; // 字体源文件
var destPath = 'uploads';    // 输出路径
// var text = [我说你是人间的四月天；笑响点亮了四面风；轻灵在春的光艳中交舞着变。];
var chinese = ['风满楼']

// 初始化
// var fontmin = new Fontmin()
//     .src(srcPath)               // 输入配置
//     .use(Fontmin.glyph({        // 字型提取插件
//         text: chinese              // 所需文字
//     }))
//     .use(Fontmin.ttf2eot())     // eot 转换插件
//     .use(Fontmin.ttf2woff())    // woff 转换插件     
//     .use(Fontmin.ttf2svg())     // svg 转换插件
//     .use(Fontmin.css())         // css 生成插件
//     .dest(destPath);            // 输出配置


//---------

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
    chinese = [chinese, ...arr].join('')

    // 初始化
    var fontmin = new Fontmin()
        .src(srcPath)               // 输入配置
        .use(Fontmin.glyph({        // 字型提取插件
            text: chinese              // 所需文字
        }))
        .use(Fontmin.ttf2eot())     // eot 转换插件
        .use(Fontmin.ttf2woff())    // woff 转换插件     
        .use(Fontmin.ttf2svg())     // svg 转换插件
        .use(Fontmin.css())         // css 生成插件
        .dest(destPath);            // 输出配置


    // 执行
    fontmin.run(function (err, files, stream) {

        if (err) {                  // 异常捕捉
            console.error(err);
        }
        console.log(files);

        console.log('done');        // 成功
    });

    res.json({ "code": 0, data: data })

})

module.exports = router