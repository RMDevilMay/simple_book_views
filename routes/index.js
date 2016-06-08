var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var multiparty = require('multiparty');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/book');//连接数据库books


/* GET home page. */
router.get('/', function(req, res, next) {
// res.render('index', { title: '网上书城' });
	var collection = db.get('book');
	collection.find({},{},function(e,docs){
		res.render('index', {
			"userlist" : docs,
			title: '网上书城'
		});
	});
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: '网上书城' });
});

router.post('/new',function(req,res){
	var from = new multiparty.Form();
	from.parse(req,function(err,fields,files){
		var img = files.images[0];
		var fs = require("fs");
		fs.readFile(img.path,function(err,data){
			var path = "./public/images/"+img.originalFilename;
			var img_path = "/images/"+img.originalFilename;
			fs.writeFile(path,data,function(error){
				if(error) console.log(error);

				var collection = db.get('book');

				collection.insert({
					"name":fields.title[0],
					"author":fields.author[0],
					"image":img_path,
					"infomation":fields.info[0],
					"price":fields.price[0],
					"time":fields.time[0],
					"publishing":fields.publishing[0],
					"pages":fields.pages[0],
				}, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
				res.render('success', {
					text: '发表成功',
					title: "网上书城",
		});
            }
        });

			});
		});
	});
});

router.get('/page',function(req,res,next){
	var collection = db.get('book');
	var tmp1 = {"name":req.query.name};
	var tmp2 = {"author":req.params.author};
		collection.find( tmp1,function(e,docs){
		res.render('page', {
			"userlist" : docs,
			title: "网上书城",
		});
	});
});

router.get('/manage', function(req, res, next) {
// res.render('index', { title: '网上书城' });
	var collection = db.get('book');
	collection.find({},{},function(e,docs){
		res.render('manage', {
			"userlist" : docs,
			title: "管理",
		});
	});
});

router.get('/delete',function(req,res,next){
	var collection = db.get('book');
	var tmp1 = {"name":req.query.name};
	// var tmp2 = {"image":req.query.image};
	collection.remove( tmp1,function(e,docs){
		req.query.image
		var fs = require("fs");
		var path="public"+req.query.image;
		fs.unlink(path, function(){
			console.log("success");
		});
		res.render('success', {
			text: path,
			title: "网上书城",
		});
	});
});

module.exports = router;
