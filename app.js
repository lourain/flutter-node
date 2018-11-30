const express = require('express')
const app = express()
const cors = require('cors')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bodyParser = require('body-parser')
const Model = require('./mongo/model.js')
const multer = require('multer')

app.set('secret', '李逸威的fluttering')

const jwtAuth = expressJwt({ secret: '李逸威的fluttering' }).unless({ path: ['/login',]})
const upload = multer({ dest: 'uploads/' })
const Flutter = Model.Flutter
const User = Model.User


app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(jwtAuth)

app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
	  res.json({"code":1111,"msg":"无效token，请重新登录！！"});
	}else{
		next()
	}
  });
//登录
app.post('/login', function (req, res) {
	let username = req.body.name
	let pwd = req.body.pwd
	new User().find(username, function (data) {
		const USER = data && data.username
		const PWD = data && data.password
		if (!USER) {
			return res.json({ "code": 1001, "msg": "没有此用户" })
		}
		if (PWD !== pwd) {
			return res.json({ "code": 1002, "msg": "密码错误" })
		}

		//token数据
		let payload = req.body
		let secret = app.get('secret')
		//签发token
		const token = jwt.sign(payload, secret, { expiresIn: '1h' })
		payload['token'] = token
		new User(payload).save(function () {
			res.json({ "code": 0, "msg": '授权成功', "token": 'Bearer ' + token })
		})


	})
})
//编辑文章
app.get('/edit', (req, res) => {
	if(req.query.id){
		new Flutter().get_condition({ _id: req.query.id }, { __v: 0 }, data => {
			res.json({ "code": 0, "data": data[0] })
		})
	}
})
//删除文章
app.delete('/del/:id', (req, res) => {
	let id = req.params.id
	new Flutter().delete(id, function (data) {
		res.json({ "code": 0, "msg": data })
	})
})
//发表文章
app.post('/post', function (req, res) {
	let params = req.body
	let _id = params._id
	delete params._id
	if (_id) {//如果有_id号就是edit
		new Flutter().update(_id, params, function () {
			res.json({ "code": 0, "msg": "success" })
		})
	} else {//如果没有_id号就是post
		params.tags.filter(tags => tags)
		let vals = Object.values(params)
		console.log(params);

		let isEmpty = !vals.every(val => val)
		if (isEmpty) {
			return res.json({ "code": 100, msg: "输入不能为空" })
		}
		console.log(req.body);
		
		new Flutter(req.body).save(function () {
			res.json({ msg: 'success' })
		})
	}
})
//获取所有文章
app.get('/titles', (req, res) => {
	new Flutter().get_condition({}, { title: 1 }, function (titles) {
		res.json({ "code": 0, "data": titles })

	})
})
//获取一篇文章详情
app.get('/article', (req, res) => {
	new Flutter().get_condition({ _id: req.query.id }, null, function (article) {
		res.json({ "code": 0, "data": article })
	})
})
//上传图片
app.post('/upload', upload.any(), (req, res) => {
	let pic = req.files
	console.log(pic);

	res.json({ "code": 0, "msg": "上传成功" })
})
app.listen(9999) 