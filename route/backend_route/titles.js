
const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')

router.get('/',function(req,res){
    new Flutter().get_condition({}, { title: 1 }, function (titles) {

		res.json({ "code": 0, "data": titles })

	})
})
module.exports = router