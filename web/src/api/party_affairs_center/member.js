import request from '@/plugins/request';

//获取渠道列表
export function getChannel (data = {}) {
    return request({
        url: '/api/business/channel/list?page=' + data.page,
        method: 'post',
        data: data
    });
}

//通过id获取渠道信息
export function getChannelById (data) {
    return request({
        url: '/api/business/channel/show',
        method: 'post',
        data: data
    });
}

//新增渠道
export function addChannel (data) {
    return request({
        url: '/api/business/channel/add',
        method: 'post',
        data: data
    });
}

//编辑渠道信息
export function editChannel (data) {
    return request({
        url: '/api/business/channel/edit',
        method: 'post',
        data: data
    });
}
//查看渠道客户
export function channelCustomer (data) {
    return request({
        url: '/api/business/channel/customer',
        method: 'post',
        data: data
    });
}
//查看渠道佣金
export function listChannelBrokerage (data) {
    return request({
        url: '/api/business/channel/brokerage/list',
        method: 'post',
        data: data
    });
}
//启用、禁用渠道
export function enableChannel (data) {
    return request({
        url: '/api/business/channel/enable',
        method: 'post',
        data: data
    });
}