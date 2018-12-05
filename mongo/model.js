const mongoose = require('mongoose')
var Schema = mongoose.Schema

const url = 'mongodb://122.152.219.175:27017'
mongoose.connect(url,{ useNewUrlParser: true,dbName:'flutter'})

var blogSchema = new Schema({
	title:String,
	tags:Array,
	time:String,
	content:String,
})
var userSchema = new Schema({
	username:String,
	password:String,
	token:String
})
var picSchema = new Schema({
    name:String,
    introduce:String,
    url:String
})
var FlutterModel = mongoose.model('Flutter',blogSchema)
var UserModel = mongoose.model('Users',userSchema)
var PicModel = mongoose.model('Pics',picSchema)

class User {
	constructor(user){
		if(user){
			this.username = user.name,
			this.password = user.pwd,
			this.token = user.token
		}
	}
	save(cb){
		let user = {
			username:this.username,
			password:this.password,
			token:this.token,
		}
		new UserModel(user).save(err=>{
			if(err) {
				console.error(err);
			}else{
				cb && cb()
			}
		})
	}
	find(username,cb) {
		UserModel.findOne({username:username},(err,res)=>{
			if(err){
				console.error(err);

			}else{
				cb(res)
			}
		})
	}
}
class Pic {
    constructor(pic){
        this.name = pic.name,
        this.introduce = pic.introduce,
        this.url = pic.url
    }
    save(cb){
        let pic = {
            name:this.name,
            introduce:this.introduce,
            url:this.url,
			time:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()<10?0+new Date().getMinutes():new Date().getMinutes()}:${new Date().getSeconds()}`

        }
        new PicModel(pic).save(err=>{
            if(err){
                console.error(err);
            }else{
                cb && cb()
            }
        })
    }

}
class Flutter {
	constructor(article){
		if(article){
			this.title = article.title
			this.tags = article.tags
			this.content = article.content
		}
	}
	save(cb){
		let art = {
			title:this.title,
			tags:this.tags,
			content:this.content,
			time:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()<10?0+new Date().getMinutes():new Date().getMinutes()}:${new Date().getSeconds()}`
		}
		new FlutterModel(art).save(err=>{
			if(err) {
				console.error(err);
			}else{
				cb && cb()
			}
		})
	}
	get_condition(condition,project,cb){
		FlutterModel.find(condition,project,function(err,res){
			if(err){
				console.error(err);
			}else{
				cb && cb(res)
			}
			
		})
	}
	getOne(id,cb){
		FlutterModel.findById(id,function(err,res){
			if(err){
				console.error(err);
			}else{
				cb && cb()
			}
		})
	}
	update(id,data,cb){
		FlutterModel.findByIdAndUpdate(id,data,(err,res)=>{
			if(err){
				console.error(err)
			}else{
				cb && cb(res)
			}
		})
	}
	delete(id,cb) {
		FlutterModel.findByIdAndDelete(id,(err,res)=>{
			if(err){
				cb(err)
			}else{
				cb && cb("删除成功")
			}
		})
	}

}

exports.Flutter = Flutter
exports.User = User
exports.Pic = Pic