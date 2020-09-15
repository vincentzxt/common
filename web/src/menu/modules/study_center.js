const pre = '/study_center/';

const data = {
	path: `${pre}data`,
	title: '学习资料管理',
	header: 'study_center',
	menu_id:'1-1',
	menu_uncheck:true,
	is_public: true, 
	custom: 'iconfont icon-data',
	children: [
		{
			path: `${pre}data/column`,
			title: '学习资料栏目',
			menu_id: '1-1-1',
			is_public: true,
			menu_uncheck: true
		},
		{
			path: `${pre}data/list`,
			title: '学习资料列表',
			menu_id: '1-1-2',
			is_public: true,
			menu_uncheck: true
		}
	]
}

const thematic = {
	path: `${pre}thematic`,
	title: '专题设置',
	header: 'study_center',
	menu_id: '1-2',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-thematic'
}

const question = {
	path: `${pre}question`,
	title: '题库管理',
	header: 'study_center',
	menu_id: '1-3',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-question'
}

const exam = {
	path: `${pre}exam`,
	title: '考试中心',
	header: 'study_center',
	menu_id: '1-4',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-exam'
}

const note = {
	path: `${pre}note`,
	title: '学习笔记',
	header: 'study_center',
	menu_id: '1-5',
	menu_uncheck: true,
	is_public: true,
	custom: 'iconfont icon-note'
}

const study_center = [
	data,
	thematic,
	question,
	exam,
	note
]

export default study_center
