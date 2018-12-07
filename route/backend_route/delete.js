const express = require('express')
const router = express.Router()
const {Flutter} = require('../../mongo/model')


router.delete('/:id',function(req,res){
    let id = req.params.id
	new Flutter().delete(id, function (data) {
		res.json({ "code": 0, "msg": data })
	})
})
module.exports = router