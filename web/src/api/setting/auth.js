import request from '@/plugins/request';

//获取用户列表
export function getUser (data) {
    return request({
        url: '/api/sys/user/list?page='+data.page,
        method: 'post',
		data
    });
}

//通过id获取用户信息
export function getUserById (data) {
    return request({
        url: '/api/sys/user/show',
        method: 'post',
		data: data
    });
}

//新增用户
export function addUser (data) {
    return request({
        url: '/api/sys/user/add',
        method: 'post',
		data: data
    });
}

//编辑用户信息
export function editUser (data) {
    return request({
        url: '/api/sys/user/edit',
        method: 'post',
		data: data
    });
}

//删除用户
export function enableUser (data) {
    return request({
        url: '/api/sys/user/enable',
        method: 'post',
		data: data
    });
}