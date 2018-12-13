'use strict';
const express = require('express')
const app = express()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {User} = require('../../mongo/model')

app.set('secret', '李逸威的fluttering')

router.post('/',function(req,res){
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
		const token = jwt.sign(payload, secret,{expiresIn:60*60})
		payload['token'] = token
		new User(payload).save(function () {
			res.json({ "code": 0, "msg": '授权成功', "token": token })
		})
	})
})


module.exports = router