import request from '@/plugins/request';

//获取所有党员列表
export function getMemberList () {
    return request({
        url: '/api/affairs_center/member/list',
        method: 'get'
    })
}

//根据组织id获取党员列表
export function getMemberListById (data) {
    return request({
        url: '/api/affairs_center/member/listById',
        method: 'post',
        data: data
    })
}

