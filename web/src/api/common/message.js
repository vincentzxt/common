import request from '@/plugins/request';

//获取未读列表
export function listUnread (data) {
    return request({
        url: '/api/common/msg/unread',
        method: 'post',
        data: data
    });
}

//设置已读
export function setRead(data) {
    return request({
        url: '/api/common/msg/setread',
        method: 'post',
        data: data
    });
}
