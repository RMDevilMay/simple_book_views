var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/book');//连接数据库books

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

module.exports = router;