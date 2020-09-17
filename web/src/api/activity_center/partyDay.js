import request from '@/plugins/request';

//获取活动列表
export function getActiveList () {
    return request({
        url: '/api/activity_center/partyDay/active/list',
        method: 'get'
    })
}

//获取计划列表
export function getPlanList () {
    return request({
        url: '/api/activity_center/partyDay/plan/list',
        method: 'get'
    })
}

