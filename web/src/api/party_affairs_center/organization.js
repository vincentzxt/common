import request from '@/plugins/request';

//获取党组织列表
export function getOrgList (data) {
    return request({
        url: '/api/party_affairs_center/org/list',
        method: 'post',
        data: data
    })
}

