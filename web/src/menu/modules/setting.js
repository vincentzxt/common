const pre = '/setting/';

const mycenter = {
	path: `${pre}mycenter`,
	title: '个人中心',
	header: 'setting',
	menu_id:'2-1',
	is_public: true, 
	menu_uncheck:true,
	custom: 'iconfont icon-mycenter',
	children: [
		{
			path: `${pre}mycenter/user`,
			title: '个人设置',
			menu_id:'2-1-1',
			is_public: true, 
			menu_uncheck:true
		},
		{
			path: `${pre}mycenter/message`,
			title: '消息中心',
			menu_id:'2-1-2',
			is_public: true, 
			menu_uncheck:true
		}
	]
}

const auth = {
  path: `${pre}auth`,
	title: '权限管理',
	header: 'setting',
	menu_id:'2-2',
	is_public: false, 
	menu_uncheck:false,
	custom: 'iconfont icon-auth',
  children: [
  	{
			path: `${pre}user`,
			title: '用户管理',
			menu_id:'2-2-1',
			is_public: false, 
			menu_uncheck:false
    },
    {
			path: `${pre}role`,
			title: '角色管理',
			menu_id:'2-2-2',
			is_public: false, 
			menu_uncheck:false
    },
		{
			path: `${pre}usergroup`,
			title: '用户组管理',
			menu_id:'2-2-3',
			is_public: false, 
			menu_uncheck:false
		}
  ]
}

const setting = [
	mycenter,
  auth
]

export default setting
