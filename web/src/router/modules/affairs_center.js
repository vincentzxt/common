import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'affairs_center-';

export default {
    path: '/affairs_center',
    name: 'affairs_center',
    redirect: {
        name: `${pre}organization-list`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'organization/list',
            name: `${pre}organization-list`,
            meta: {
                ...meta,
                title: '党组织列表'
            },
            component: () => import('@/pages/affairs_center/organization/list')
        },
        {
            path: 'organization/map',
            name: `${pre}organization-map`,
            meta: {
                ...meta,
                title: '党组织地图'
            },
            component: () => import('@/pages/affairs_center/organization/map')
        },
        {
            path: 'organization/excellent',
            name: `${pre}organization-excellent`,
            meta: {
                ...meta,
                title: '优秀党组织'
            },
            component: () => import('@/pages/affairs_center/organization/excellent')
        },
        {
            path: 'organization/post',
            name: `${pre}organization-post`,
            meta: {
                ...meta,
                title: '党内职务管理'
            },
            component: () => import('@/pages/affairs_center/organization/post')
        },
        {
            path: 'member/list',
            name: `${pre}member-list`,
            meta: {
                ...meta,
                title: '党员列表'
            },
            component: () => import('@/pages/affairs_center/member/list')
        },
        {
            path: 'member/history',
            name: `${pre}member-history`,
            meta: {
                ...meta,
                title: '历史党员'
            },
            component: () => import('@/pages/affairs_center/member/history')
        },
        {
            path: 'member/volunteer',
            name: `${pre}member-volunteer`,
            meta: {
                ...meta,
                title: '志愿者列表'
            },
            component: () => import('@/pages/affairs_center/member/volunteer')
        },
        {
            path: 'member/house',
            name: `${pre}member-house`,
            meta: {
                ...meta,
                title: '党员中心户'
            },
            component: () => import('@/pages/affairs_center/member/house')
        },
        {
            path: 'member/develop',
            name: `${pre}member-develop`,
            meta: {
                ...meta,
                title: '党员发展全纪实'
            },
            component: () => import('@/pages/affairs_center/member/develop')
        },
        {
            path: 'relation/out',
            name: `${pre}relation-out`,
            meta: {
                ...meta,
                title: '党员关系转出'
            },
            component: () => import('@/pages/affairs_center/relation/out')
        },
        {
            path: 'relation/in',
            name: `${pre}relation-in`,
            meta: {
                ...meta,
                title: '党员关系转入'
            },
            component: () => import('@/pages/affairs_center/relation/in')
        },
        {
            path: 'flow/out',
            name: `${pre}flow-out`,
            meta: {
                ...meta,
                title: '流动党员转出'
            },
            component: () => import('@/pages/affairs_center/flow/out')
        },
        {
            path: 'flow/in',
            name: `${pre}flow-in`,
            meta: {
                ...meta,
                title: '流动党员转入'
            },
            component: () => import('@/pages/affairs_center/flow/in')
        },
        {
            path: 'payment',
            name: `${pre}payment`,
            meta: {
                ...meta,
                title: '党费缴纳记录'
            },
            component: () => import('@/pages/affairs_center/payment')
        },
        {
            path: 'birthday',
            name: `${pre}birthday`,
            meta: {
                ...meta,
                title: '政治生日'
            },
            component: () => import('@/pages/affairs_center/birthday')
        }
    ]
};
