import request from '@/plugins/request';

//用户登陆
export function login (data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    });
}

//修改当前用户密码
export function editpwd (data) {
    return request({
        url: '/api/auth/editpwd',
        method: 'post',
        data
    });
}

//获取当前用户信息
export function userinfo (data) {
    return request({
        url: '/api/auth/userinfo',
        method: 'post',
		data
    });
}

//获取当前用户信息
export function editInfo (data) {
    return request({
        url: '/api/auth/userinfo/edit',
        method: 'post',
		data
    });
}
//用户登出
export function logout () {
    return request({
        url: '/api/auth/logout',
        method: 'get'
    });
}