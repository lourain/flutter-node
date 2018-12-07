const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')

const expressJwt = require('express-jwt')
const bodyParser = require('body-parser')
const Model = require('./mongo/model.js')

//引入路由
const loginRouter = require('./route/backend_route/login')
const editRouter = require('./route/backend_route/edit')
const deleteRouter = require('./route/backend_route/delete')
const postRouter = require('./route/backend_route/post')
const titlesRouter = require('./route/backend_route/titles')
const uploadRouter = require('./route/backend_route/upload')
const articleRouter = require('./route/backend_route/article')

const detailRouter = require('./route/frontend_route/detail')
const directoryRouter = require('./route/frontend_route/directory')


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
	maxAge:60*60,//60min过期时间
}).unless({ path: ['/login','/detail'] })



app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(jwtAuth)

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {//token失效
        console.error(err);
        
		res.status(401).json({ "code": 1111, "msg": "无效token，请重新登录！！" });
	} else {

		next()
	}
});

//后台管理系统
//登录
app.use('/login',loginRouter)
//编辑文章
app.use('/edit',editRouter)
//删除文章
app.use('/del',deleteRouter)
//发表文章
app.use('/post',postRouter)
//获取所有文章
app.use('/titles',titlesRouter)
//获取一篇文章详情
app.use('/article',articleRouter)
//上传图片
app.use('/upload',uploadRouter)


//前端blog接口
//目录
app.use('/directory',directoryRouter)
//详情
app.use('/detail',detailRouter)

app.listen(9999,()=>{
    console.log('backend is running at port 9999');
    
}) 