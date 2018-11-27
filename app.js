const express = require('express')
const app = express()
const cors = require('cors')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var Model = require('./mongo/model.js')
const Flutter =  Model.Flutter
const User = Model.User

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
		new User(payload).save(function(){
			res.json({ msg: 'success',token:token })
		})
	} else {
		res.json({ msg: 'error' })
	}
})
//编辑文章
app.get('/edit',(req,res)=>{
    new Flutter().get_condition({_id:req.query.id},{__v:0},data=>{
        res.json({"code":0,"data":data[0]})
    })
})
//删除文章
app.delete('/del/:id',(req,res)=>{
	let id = req.params.id
	new Flutter().delete(id,function(data){
		res.json({"code":0,"msg":data})
	})
})
//发表文章
app.post('/post',function(req,res){
	let params = req.body
	let _id = params._id
	delete params._id
	if(_id){//如果有_id号就是edit
		new Flutter().update(_id,params,function(){
			res.json({"code":0,"msg":"success"})
		})
	}else{//如果没有_id号就是post
		params.tags.filter(tags=>tags)
		let vals = Object.values(params)
		console.log(params);
		
		let isEmpty = !vals.every(val=> val)
		if(isEmpty){
			return res.json({"code":100,msg:"输入不能为空"})
		}
	
		new Flutter(req.body).save(function(){
			res.json({msg:'success'})
		})
	}
})
//获取所有文章
app.get('/titles',(req,res)=>{
	new Flutter().get_condition({},{title:1},function(titles){
		res.json({"code":0,"data":titles})
		
	})
})
//获取一篇文章详情
app.get('/article',(req,res)=>{
	new Flutter().get_condition({_id:req.query.id},null,function(article){
		res.json({"code":0,"data":article})
	})
})
app.listen(9999)