'use strict';
const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')


router.get('/',function(req,res){
    if (req.query.id) {
		new Flutter().get_condition({ _id: req.query.id }, { __v: 0 }, data => {
			res.json({ "code": 0, "data": data[0] })
		})
	}
})
module.exports = router