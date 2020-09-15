const pre = '/affairs_center/';

const organization = {
	path: `${pre}organization`,
	title: '党组织管理',
	header: 'affairs_center',
	menu_id:'1-1',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-organization',
	children: [
		{
			path: `${pre}organization/list`,
			title: '党组织列表',
			menu_id: '1-1-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}organization/map`,
			title: '党组织地图',
			menu_id: '1-1-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}organization/excellent`,
			title: '优秀党组织',
			menu_id: '1-1-3',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}organization/post`,
			title: '党内职务管理',
			menu_id: '1-1-4',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const member = {
	path: `${pre}member`,
	title: '党员管理',
	header: 'affairs_center',
	menu_id:'1-2',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-member',
	children: [
		{
			path: `${pre}member/list`,
			title: '党员列表',
			menu_id: '1-2-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}member/history`,
			title: '历史党员',
			menu_id: '1-2-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}member/volunteer`,
			title: '志愿者列表',
			menu_id: '1-2-3',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}member/house`,
			title: '党员中心户',
			menu_id: '1-2-4',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}member/develop`,
			title: '党员发展全纪实',
			menu_id: '1-2-5',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const relation = {
	path: `${pre}relation`,
	title: '党员关系转移',
	header: 'affairs_center',
	menu_id:'1-3',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-relation',
	children: [
		{
			path: `${pre}relation/out`,
			title: '党员关系转出',
			menu_id: '1-3-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}relation/in`,
			title: '党员关系转入',
			menu_id: '1-3-2',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const flow = {
	path: `${pre}flow`,
	title: '流动党员',
	header: 'affairs_center',
	menu_id:'1-4',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-flow',
	children: [
		{
			path: `${pre}flow/out`,
			title: '流动党员转出',
			menu_id: '1-4-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}flow/in`,
			title: '流动党员转入',
			menu_id: '1-4-2',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const payment = {
	path: `${pre}payment`,
	title: '党费缴纳记录',
	header: 'affairs_center',
	menu_id:'1-5',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-payment'
}

const birthday = {
	path: `${pre}birthday`,
	title: '政治生日',
	header: 'affairs_center',
	menu_id: '1-6',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-birthday'
}

const affairs_center = [
	organization,
	member,
	relation,
	flow,
	payment,
	birthday
]

export default affairs_center
