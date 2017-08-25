var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req,res);
	var locals = res.locals;

	var id = req.params.id || '';
	console.log(id,'id')

	view.on('init',function (next) {
		if (!id) {
			errHandle('/myblog','找不到要修改的id')
		}
		var Blog = keystone.list('Blog');
		Blog.model.findById(id).exec(function (err,blog) {
			if (err) {
				errHandle('/myblog',err)
				next(err);
			}
			locals.blog = blog;
			next()
		});
	})

	view.render('addmyblog')
}

function errHandle(url,mess) {
		req.flash('error',mess);
		res.redirect(url);
}
