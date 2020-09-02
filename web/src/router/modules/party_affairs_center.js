import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'party_affairs_center-';

export default {
    path: '/party_affairs_center',
    name: 'party_affairs_center',
    redirect: {
        name: `${pre}organization/list`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'organization/list',
            name: `${pre}organization/list`,
            meta: {
                ...meta,
                title: '党组织列表'
            },
            component: () => import('@/pages/party_affairs_center/organization/list')
        }
    ]
};
