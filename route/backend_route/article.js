'use strict';
const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')


router.get('/',function(req,res){
    new Flutter().get_condition({ _id: req.query.id }, null, function (article) {
		res.json({ "code": 0, "data": article })
	})
})


module.exports = router