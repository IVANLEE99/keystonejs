// var keystone = require('keystone');
// var async = require('async');

// exports = module.exports = function (req, res) {
// 	var view = new keystone.View(req,res);

// 	view.on('init',function (next) {
// 		// var id req.
// 		console.log(req,'req')
// 		// keystone.
// 	});
// }
var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req,res);
	var locals = res.locals;
	var id = req.params.id || '';
	if (!id) {
		req.flash('error', '没有找到该博客');
		return view.render('myblog_detail');
	}

	view.on('init',function (next) {
		var Blog = keystone.list('Blog');
		Blog.model.findOne()
		    .where('_id', id)
		    .populate('author')
		    .exec(function(err, blog) {
		       locals.blog=blog
		       next(err);
		    });
	});
	console.log(id,'id')

	view.render('myblog_detail');
}
