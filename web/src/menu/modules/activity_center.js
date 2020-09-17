const pre = '/activity_center/';

const threeMeetings = {
	path: `${pre}threeMeetings`,
	title: '三会一课',
	header: 'activity_center',
	menu_id:'1-1',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-threeMeetings',
	children: [
		{
			path: `${pre}threeMeetings/organizing`,
			title: '组织会议',
			menu_id: '1-1-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}threeMeetings/list`,
			title: '会议列表',
			menu_id: '1-1-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}threeMeetings/record`,
			title: '会议记录',
			menu_id: '1-1-3',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const partyDay = {
	path: `${pre}partyDay`,
	title: '主题党日',
	header: 'activity_center',
	menu_id: '1-2',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-partyDay',
	children: [
		{
			path: `${pre}partyDay/active`,
			title: '党日活动',
			menu_id: '1-2-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}partyDay/plan`,
			title: '活动计划',
			menu_id: '1-2-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}partyDay/track`,
			title: '活动跟踪',
			menu_id: '1-2-3',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const brand = {
	path: `${pre}brand`,
	title: '品牌党建',
	header: 'activity_center',
	menu_id: '1-3',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-brand',
	children: [
		{
			path: `${pre}brand/build`,
			title: '品牌党建建设',
			menu_id: '1-3-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}brand/dynamic`,
			title: '品牌党建动态',
			menu_id: '1-3-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}brand/log`,
			title: '品牌党建日志',
			menu_id: '1-3-3',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const first = {
	path: `${pre}first`,
	title: '第一书记',
	header: 'activity_center',
	menu_id: '1-4',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-member',
	children: [
		{
			path: `${pre}first/setting`,
			title: '第一书记设置',
			menu_id: '1-4-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}first/dynamic`,
			title: '第一书记动态',
			menu_id: '1-4-2',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}first/log`,
			title: '第一书记日志',
			menu_id: '1-4-3',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const life = {
	path: `${pre}life`,
	title: '组织生活',
	header: 'activity_center',
	menu_id: '1-5',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-life'
}

const democratic = {
	path: `${pre}democratic`,
	title: '民主评议',
	header: 'activity_center',
	menu_id: '1-6',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-democratic'
}

const activity_center = [
	threeMeetings,
	partyDay,
	brand,
	first,
	life,
	democratic
]

export default activity_center
