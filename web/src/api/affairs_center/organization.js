import request from '@/plugins/request';

//获取党组织列表
export function getOrgList () {
    return request({
        url: '/api/affairs_center/org/list',
        method: 'get'
    })
}

//获取党内职务列表
export function getOrgPostList (get) {
    return request({
        url: '/api/affairs_center/org/post/list',
        method: 'get'
    })
}

