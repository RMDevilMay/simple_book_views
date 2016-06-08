var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/book');//连接数据库books

router.get('/page',function(req,res,next){
	var collection = db.get('book');
	var tmp1 = {"name":req.params.name};
	var tmp2 = {"author":req.params.author};
		collection.find(tmp1,function(e,docs){
		res.render('page', {
			"userlist" : docs,
			title: "网上书城",
		});
	});
});


module.exports = router;