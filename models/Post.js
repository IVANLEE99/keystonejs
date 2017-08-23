var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */
	// singular: //String	列表中条目的单数标签。用在管理界面中，默认为label的单数格式。
	// plural String	列表中条目的复数标签。用在管理界面中，默认为label的复数格式。
	// schema String	
	// 列表的Mongoose模式的参数。 除了其他方面外，这个参数可以给集合指定一个定制的名称。参见mongoose模式的文档查看可用参数的清单。

	// 警告: 不要修改模式参数id或_id；这是Keystone要求的默认行为。

	// drilldown String	以空格分隔的关系清单，在管理界面中显示为下钻项。
	// sortable Boolean	给模式添加一个隐藏的sortOrder域，并在管理界面中启用拖拽式的排序。
	// sortContext String	管理界面中有拖拽式排序时用来控制的List:relationship对。
	// searchFields String	在管理界面中用于搜索的路径清单，用空格分隔。
	// defaultSort String	管理界面中用于排序的默认列或路径。
	// defaultColumns String	在管理界面的列表视图中默认显示的列清单，用逗号分隔。 你可以在管道符|后面用像素或百分比指定宽度。
	// map Object	将域映射到特定列表路径上的对象。如果添加了带那个键的域，则每个路径都默认为它的键。映射路径包括
	// name - 包含条目名称的域，显示在管理界面中
	// autokey Object	在列表上添加一个插件，文档保存时自动基于另一个域或路径为它生成一个键。这个参数的值应该是带有如下键的对象：
	// from String - 用于生成键值的域或路径，可以是用空格分开的域清单
	// path String - 存储键的路径
	// unique Boolean - 键是否应该有唯一性
	// fixed Boolean - 如果键存在并且非空，应该保留。默认为false。
	// 路径Autokey是自动索引的；你可能还想把它放在复合索引中。
	// track Boolean or Object	
	// 在列表上添加一个插件，追踪谁在什么时候（比如哪个Keystone用户）创建和最后修改了一个条目。

	// 设为true时，所有追踪域都是用它们的默认名称启用的。

	// 你也可以选择性地启用各个域，并且还可以通过将track设为一个带有下面任一或全部域的object来指定一个定制的域名：

	// createdAt Boolean/String - 设为true时，追踪条目何时创建(使用默认的域名createdAt)。要使用定制的域名，用想要的名称设置String。默认为false。
	// createdBy Boolean/String -设为true时，追踪哪个用户创建了条目(使用默认的域名createdBy)。要使用定制的域名，用想要的名称设置String。默认为false。
	// updatedAt Boolean/String - 设为true时，追踪条目的最后更新时间(使用默认的域名updatedAt)。要使用定制的域名，用想要的名称设置String。默认为false。
	// updatedBy Boolean/String - 设为true时，追踪是哪个用户最后更新了条目(使用默认的域名updatedBy)。要使用定制的域名，用想要的名称设置String。默认为false。
	// createdBy和updatedBy域只有通过Keystone管理界面添加/修改条目时才能自动更新。然而，如果你想在自己的程序内添加/修改条目，则必须在保存条目之前手工将条目的._req_user属性设为当前登录的用户(req.user)，如下例所示。

	// var item = new List.model();
	// item.set({ field1: 'value1', field2: 'value2' });
	// item._req_user = req.user;
	// item.save();
	// noedit Boolean	禁止在Keystone管理界面中编辑列表中的条目。
	// nocreate Boolean	禁止在Keystone管理界面中创建列表的新条目。
	// nodelete Boolean	禁止在Keystone管理界面中删除列表中的条目。
	// hidden Boolean	在Keystone管理界面中隐藏这个列表。
var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
