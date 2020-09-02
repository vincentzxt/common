import request from '@/plugins/request';

//获取业务字典类型
export function getDictType (data = {}) {
    return request({
        url: '/api/company/dict/type',
        method: 'post',
        data: data
    });
}

//通过类型获取业务字典列表
export function getDictByType (data) {
    return request({
        url: '/api/company/dict/list',
        method: 'post',
        data: data
    });
}

//新增业务字典
export function addDict (data) {
    return request({
        url: '/api/company/dict/add',
        method: 'post',
        data: data
    });
}

//编辑业务字典
export function editDict (data) {
    return request({
        url: '/api/company/dict/edit',
        method: 'post',
        data: data
    });
}

//启用、禁用业务字典
export function enableDict (data) {
    return request({
        url: '/api/company/dict/enable',
        method: 'post',
        data: data
    });
}