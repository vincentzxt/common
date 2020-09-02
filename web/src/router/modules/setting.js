import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'setting-';

export default {
    path: '/setting',
    name: 'setting',
    redirect: {
        name: `${pre}mycenter/user`
    },
    meta,
    component: BasicLayout,
    children: [
		{
		    path: 'mycenter/user',
		    name: `${pre}mycenter/user`,
		    meta: {
		        ...meta,
		        title: '个人设置',
		    },
		    component: () => import('@/pages/setting/mycenter/user')
		},
		{
		    path: 'mycenter/message',
		    name: `${pre}mycenter/message`,
		    meta: {
		        ...meta,
		        title: '通知消息',
		    },
		    component: () => import('@/pages/setting/mycenter/message')
		},
    {
        path: 'user',
        name: `${pre}user`,
        meta: {
            ...meta,
            title: '用户管理',
        },
        component: () => import('@/pages/setting/auth/user')
    },
    {
        path: 'role',
        name: `${pre}role`,
        meta: {
            ...meta,
            title: '角色设置'
        },
        component: () => import('@/pages/setting/auth/role')
    },
		{
		    path: 'usergroup',
		    name: `${pre}usergroup`,
		    meta: {
		        ...meta,
		        title: '用户组'
		    },
		    component: () => import('@/pages/setting/auth/usergroup')
		},
    {
        path: 'dict',
        name: `${pre}dict`,
        meta: {
            ...meta,
            title: '字典管理'
        },
        component: () => import('@/pages/setting/dict')
    }
  ]
};
