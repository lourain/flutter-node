'use strict';
const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const proxy = require('http-proxy-middleware')
process.env.PORT = 9999

const logger = require('morgan')
const expressJwt = require('express-jwt')
const bodyParser = require('body-parser')


//引入路由
const loginRouter = require('./route/backend_route/login')
const editRouter = require('./route/backend_route/edit')
const deleteRouter = require('./route/backend_route/delete')
const postRouter = require('./route/backend_route/post')
const titlesRouter = require('./route/backend_route/titles')
const uploadRouter = require('./route/backend_route/upload')
const albumsRouter = require('./route/backend_route/albums')
const articleRouter = require('./route/backend_route/article')

const detailRouter = require('./route/frontend_route/detail')
const directoryRouter = require('./route/frontend_route/directory')
const ablumRouter = require('./route/frontend_route/ablum')


const jwtAuth = expressJwt({
    secret: '李逸威的fluttering',
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return req.headers.authorization
    },
    maxAge: 60*60*72,//3day过期时间
}).unless({ path: ['/login' ,'/detail','/api/directory', '/api/ablum','/api/detail','/directory','/ablum','/detail'] })
const whitelist = ['http://www.fluttering.cn', 'http://fluttering.cn','http://localhost:8080','http://localhost:9999','http://backend.fluttering.cn']
var corsOptions = {
    origin:whitelist
  }

app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(express.static(__dirname + '/uploads'))
// app.use(express.static('./flutter'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(jwtAuth)

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {//token失效
        console.error(err);
        res.status(401).json({ "code": 1111, "msg": "无效token，请重新登录！！" });
    }else if(err){
        res.status(404).json({"code":404,"msg":err.name})
    } else {
        next()
    }
});
app.use('/api', proxy({
    target: 'http://localhost:9999', 
    changeOrigin: true, 
    pathRewrite: {
        '^/api':''
    }
}))

//后台管理系统
//登录
app.use('/login', loginRouter)
//编辑文章
app.use('/edit', editRouter)
//删除文章
app.use('/del', deleteRouter)
//发表文章
app.use('/post', postRouter)
//获取所有文章
app.use('/titles', titlesRouter)
//获取一篇文章详情
app.use('/article', articleRouter)
//上传图片
app.use('/upload', uploadRouter)
//相册
app.use('/albums', albumsRouter)


//前端blog接口
//目录
app.use('/directory', directoryRouter)
//详情
app.use('/detail', detailRouter)
//前端相册
app.use('/ablum', ablumRouter)
app.listen(9999, () => {
    console.log('backend is running at port 9999');

}) 