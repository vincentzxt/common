import request from '@/plugins/request';

//获取评议记录列表
export function getThreeMeetingList () {
    return request({
        url: '/api/activity_center/threeMeeting/list',
        method: 'get'
    })
}

