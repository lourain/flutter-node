'use strict';
const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')
router.post('/',function(req,res){
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
		new Flutter(req.body).save(function () {
			res.json({ msg: 'success' })
		})
	}
})

module.exports = router