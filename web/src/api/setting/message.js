import request from '@/plugins/request';

//获取消息列表
export function listReceiveMessage (data) {
    return request({
        url: '/api/common/msg/list?page='+data.page,
        method: 'post',
		data
    });
}

//设置已读
export function setMessageRead (data) {
    return request({
        url: '/api/common/msg/setread',
        method: 'post',
		data: data
    });
}

//删除消息
export function delMessage (data) {
    return request({
        url: '/api/common/msg/del',
        method: 'post',
		data: data
    });
}

//查看消息
export function showMessage (data) {
    return request({
        url: '/api/common/msg/show',
        method: 'post',
		data: data
    });
}

//发送列表
export function listSendMessage (data) {
    return request({
        url: '/api/common/msg/send/list?page='+data.page,
        method: 'post',
		data: data
    });
}

//发送消息
export function sendMessage (data) {
    return request({
        url: '/api/common/msg/send',
        method: 'post',
		data: data
    });
}

//消息撤回
export function revokeMessage (data) {
    return request({
        url: '/api/common/msg/revoke',
        method: 'post',
		data: data
    });
}

//发送列表
export function countMessage (data) {
    return request({
        url: '/api/common/msg/count',
        method: 'post',
		data: data
    });
}
