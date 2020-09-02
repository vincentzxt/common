const pre = '/party_affairs_center/';

const organization = {
	path: `${pre}organization`,
	title: '党组织管理',
	header: 'party_affairs_center',
	menu_id:'1-1',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-channel',
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
	header: 'party_affairs_center',
	menu_id:'1-2',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-channel',
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

const party_affairs_center = [
	organization,
	member
]

export default party_affairs_center
