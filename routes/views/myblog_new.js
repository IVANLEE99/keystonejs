var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req,res);
	var locals = res.locals;

	var title = req.body.title || '没有title';
	var brief = req.body.brief || 'brief';
	var extended = req.body.extended || '没有extended';
	var Blog = keystone.list('Blog');
	var newblog = new Blog.model({
		title:title,
		content:{
			brief:brief,
			extended:extended
		},
		author:req.user
	});
	newblog._req_user = req.user;
	newblog.save(function (err) {
		if (err) {
			// next(err);
			req.flash('error', err);
			return;
		}
		req.flash('success', '成功添加');
		// next()
		res.redirect('/myblog')
	})
}
