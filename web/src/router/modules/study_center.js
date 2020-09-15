import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'study_center-';

export default {
    path: '/study_center',
    name: 'study_center',
    redirect: {
        name: `${pre}data/column`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'data/column',
            name: `${pre}data/column`,
            meta: {
                ...meta,
                title: '学习资料栏目'
            },
            component: () => import('@/pages/study_center/data/column')
        },
        {
            path: 'data/list',
            name: `${pre}data/list`,
            meta: {
                ...meta,
                title: '学习资料列表'
            },
            component: () => import('@/pages/study_center/data/list')
        },
        {
            path: 'thematic',
            name: `${pre}thematic`,
            meta: {
                ...meta,
                title: '专题设置'
            },
            component: () => import('@/pages/study_center/thematic')
        },
        {
            path: 'question',
            name: `${pre}question`,
            meta: {
                ...meta,
                title: '题库管理'
            },
            component: () => import('@/pages/study_center/question')
        },
        {
            path: 'exam',
            name: `${pre}exam`,
            meta: {
                ...meta,
                title: '考试中心'
            },
            component: () => import('@/pages/study_center/exam')
        },
        {
            path: 'note',
            name: `${pre}note`,
            meta: {
                ...meta,
                title: '学习笔记'
            },
            component: () => import('@/pages/study_center/note')
        }
    ]
};
