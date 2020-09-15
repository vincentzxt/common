import request from '@/plugins/request';

//获取评议记录列表
export function getDemocraticList () {
    return request({
        url: '/api/activity_center/democratic/list',
        method: 'get'
    })
}

