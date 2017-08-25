var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req,res);
	var locals = res.locals;

	var title = req.body.title || '没有title';
	var brief = req.body.brief || 'brief';
	var extended = req.body.extended || '没有extended';
	var id = req.body.id;
	var Blog = keystone.list('Blog');

	Blog.model.findById(id).exec(function (err,blog) {
		if (err) {
			 return errHandle('/myblog/modify/'+id,err)
		}
		blog.title = title;
		blog.brief = brief;
		blog.extended = extended;
		blog._req_user = req.user;
		blog.save(function (err,updatedblog) {
					if (err) {
						return errHandle('/myblog/modify/'+id,err);
					}
					req.flash('success','修改成功');
					locals.blog = updatedblog;
					res.redirect('/myblog/modify/'+id)
		})

	});
}

function errHandle(url,mess) {
		req.flash('error',mess);
		res.redirect(url);
}
