const express = require('express')
const app = express()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var Flutter = require('./mongo/model')

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const secret = '李逸威的fluttering'

// Flutter.save(err=>{
// 	if (!err) console.log('Success!');
// })

app.post('/login', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	console.log(req.body);
	let username = req.body.name
	let pwd = req.body.pwd
	if (username === 'admin' && pwd === '123') {
		//token数据
		let payload = req.body  
		//签发token
		const token = jwt.sign(payload,secret)
		res.json({ msg: 'success',token:token })
	} else {
		res.json({ msg: 'error' })

	}
})

app.post('/publicArticle',function(req,res){
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	console.log(req.body);
	new Flutter(req.body).save(function(){
		res.json({msg:'success'})
	})
})
app.listen(9999)