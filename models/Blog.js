var keystone = require('keystone');
var Types = keystone.Field.Types;
	// map:带连接的字段
	// autokey  就是自增的值， path： 自增值得名称
	// label keystone后台显示的名称
var Blog = new keystone.List('Blog', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	label:'我的博客',
	track:true
});

Blog.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'B, L, G', default: 'B', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'G' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Blog.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Blog.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Blog.register();
