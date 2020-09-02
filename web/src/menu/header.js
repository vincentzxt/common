// 菜单，顶栏
export default [
	{
		path: '/party_affairs_center',
    title: '党务中心',
    custom: 'iconfont icon-dangjian',
    hideSider: false, // 是否隐藏侧边栏
    name: 'party_affairs_center', // 用 name 区分哪些二级菜单显示
    auth: ['vip','common','trial'] // 权限
  },
  {
		path: '/setting',
    title: '系统设置',
    custom: 'iconfont icon-dangjian',
    hideSider: false, // 是否隐藏侧边栏
    name: 'setting', // 用 name 区分哪些二级菜单显示
    auth: ['vip','common','trial'] // 权限
  }
]