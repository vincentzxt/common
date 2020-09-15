import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'activity_center-';

export default {
    path: '/activity_center',
    name: 'activity_center',
    redirect: {
        name: `${pre}threeMeetings/organizing`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'threeMeetings/organizing',
            name: `${pre}threeMeetings/organizing`,
            meta: {
                ...meta,
                title: '组织会议'
            },
            component: () => import('@/pages/activity_center/threeMeetings/organizing')
        },
        {
            path: 'threeMeetings/list',
            name: `${pre}threeMeetings/list`,
            meta: {
                ...meta,
                title: '会议列表'
            },
            component: () => import('@/pages/activity_center/threeMeetings/list')
        },
        {
            path: 'threeMeetings/record',
            name: `${pre}threeMeetings/record`,
            meta: {
                ...meta,
                title: '会议记录'
            },
            component: () => import('@/pages/activity_center/threeMeetings/record')
        },
        {
            path: 'partyDay/plan',
            name: `${pre}partyDay/plan`,
            meta: {
                ...meta,
                title: '党日活动计划'
            },
            component: () => import('@/pages/activity_center/partyDay/plan')
        },
        {
            path: 'partyDay/write',
            name: `${pre}partyDay/write`,
            meta: {
                ...meta,
                title: '党日活动计划填写'
            },
            component: () => import('@/pages/activity_center/partyDay/write')
        },
        {
            path: 'partyDay/track',
            name: `${pre}partyDay/track`,
            meta: {
                ...meta,
                title: '党日活动计划跟踪'
            },
            component: () => import('@/pages/activity_center/partyDay/track')
        },
        {
            path: 'brand/build',
            name: `${pre}brand/build`,
            meta: {
                ...meta,
                title: '品牌党建建设'
            },
            component: () => import('@/pages/activity_center/brand/build')
        },
        {
            path: 'brand/dynamic',
            name: `${pre}brand/dynamic`,
            meta: {
                ...meta,
                title: '品牌党建动态'
            },
            component: () => import('@/pages/activity_center/brand/dynamic')
        },
        {
            path: 'brand/log',
            name: `${pre}brand/log`,
            meta: {
                ...meta,
                title: '品牌党建日志'
            },
            component: () => import('@/pages/activity_center/brand/log')
        },
        {
            path: 'first/setting',
            name: `${pre}first/setting`,
            meta: {
                ...meta,
                title: '第一书记设置'
            },
            component: () => import('@/pages/activity_center/first/setting')
        },
        {
            path: 'first/dynamic',
            name: `${pre}first/dynamic`,
            meta: {
                ...meta,
                title: '第一书记动态'
            },
            component: () => import('@/pages/activity_center/first/dynamic')
        },
        {
            path: 'first/log',
            name: `${pre}first/log`,
            meta: {
                ...meta,
                title: '第一书记日志'
            },
            component: () => import('@/pages/activity_center/first/log')
        },
        {
            path: 'life',
            name: `${pre}life`,
            meta: {
                ...meta,
                title: '组织生活'
            },
            component: () => import('@/pages/activity_center/life')
        },
        {
            path: 'democratic',
            name: `${pre}democratic`,
            meta: {
                ...meta,
                title: '民主评议'
            },
            component: () => import('@/pages/activity_center/democratic')
        }
    ]
};
