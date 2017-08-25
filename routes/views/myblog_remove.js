var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req,res);
	var locals = res.locals;
	var id = req.params.id || '';
	console.log(id,'id')
	if (!id) {
		req.flash('error', '没有找到该博客');
		// res.redirect('/myblog');
	}

	view.on('init',function (next) {
	});

		var Blog = keystone.list('Blog');
		Blog.model.findById(id)
		.remove(function (err) {
			if (err) {
				req.flash('error', '删除失败，请重试');
				next(err)
			}
			console.log('remove======')
			console.log(err,'err')
			// req.flash('success','删除成功');
			// res.redirect('/myblog');
		}).exec(function (err,blg) {
			console.log(err,'err')
			req.flash('success','删除成功');
			console.log('exec======')
			res.redirect('/myblog');
			next(err);
			res.redirect('/myblog');
		});;

	// res.redirect('/myblog');
	// view.render('myblog')
}
