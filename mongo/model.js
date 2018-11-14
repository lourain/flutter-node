const mongoose = require('mongoose')
var Schema = mongoose.Schema

const url = 'mongodb://122.152.219.175:27017'
var blogSchema = new Schema({
	title:String,
	tags:Array,
	time:String,
	content:String,
})

var FlutterModel = mongoose.model('Flutter',blogSchema)
// var Flutter = new FlutterModel()

mongoose.connect(url,{ useNewUrlParser: true,dbName:'flutter'})

class Flutter {
	constructor(article){
		this.title = article.title
		this.tags = article.tags
		this.content = article.content
	}
	save(cb){
		let art = {
			title:this.title,
			tags:this.tags,
			content:this.content,
			time:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
		}
		new FlutterModel(art).save(err=>{
			if(err) {
				console.error(err);
			}else{
				cb && cb()
			}
		})
	}
}
module.exports = Flutter