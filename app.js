const express = require('express')
const app = express()
const cors = require('cors')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var Model = require('./mongo/model.js')


app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const secret = '李逸威的fluttering'

//登录
app.post('/login', function (req, res) {
	let username = req.body.name
	let pwd = req.body.pwd
	if (username === 'admin' && pwd === '123') {
		//token数据
		let payload = req.body  
		//签发token
		const token = jwt.sign(payload,secret)
		payload['token'] = token
		const User = Model.User
		new User(payload).save(function(){
			res.json({ msg: 'success',token:token })
		})
	} else {
		res.json({ msg: 'error' })
	}
})

//发表文章
app.post('/post',function(req,res){
	let params = req.body
	params.tags.filter(tags=>tags)
	let vals = Object.values(params)
	let isEmpty = !vals.every(val=> val)
	if(isEmpty){
		return res.json({"code":100,msg:"输入不能为空"})
	}

	const Flutter = Model.Flutter
	new Flutter(req.body).save(function(){
		res.json({msg:'success'})
	})
})
//获取所有文章
app.get('/titles',(req,res)=>{
	const Flutter = Model.Flutter
	new Flutter().get_condition({},{title:1},function(titles){
		res.json({"code":0,"data":titles})
		
	})
})
//获取一篇文章详情
app.get('/article',(req,res)=>{
	const Flutter = Model.Flutter
	new Flutter().get_condition({_id:req.query.id},null,function(article){
		res.json({"code":0,"data":article})
	})
})
app.listen(9999)