var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Render the view
	view.on('init',function (next) {
		keystone.list('Blog').model.find().sort('title')
		.populate('author categories')
		.exec(function (err,results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.blog = results;
			console.log(results);
			next(err);
		});
	});
	view.render('myblog');
};
//数据库的增删改查 
//分页
