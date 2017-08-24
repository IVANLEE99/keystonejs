var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('init',function (next) {
		next();
	});
	view.render('addmyblog')
}
