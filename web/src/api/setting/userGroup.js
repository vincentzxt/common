import request from '@/plugins/request';

//获取用户组列表
export function getUserGroup (data) {
    return request({
        url: '/api/sys/usergroup/list?page='+data.page,
        method: 'post',
		data
    });
}

//通过id获取用户组信息
export function getUserGroupById (data) {
    return request({
        url: '/api/sys/usergroup/show',
        method: 'post',
		data: data
    });
}

//新增用户组
export function addUserGroup (data) {
    return request({
        url: '/api/sys/usergroup/add',
        method: 'post',
		data: data
    });
}

//编辑用户组
export function editUserGroup (data) {
    return request({
        url: '/api/sys/usergroup/edit',
        method: 'post',
		data: data
    });
}
