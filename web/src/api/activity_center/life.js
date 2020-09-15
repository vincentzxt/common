import request from '@/plugins/request';

//获取评议记录列表
export function getLifeList () {
    return request({
        url: '/api/activity_center/life/list',
        method: 'get'
    })
}

