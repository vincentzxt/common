import request from '@/plugins/request';

//获取用户角色列表
export function listRole (data) {
    return request({
        url: '/api/sys/user/role/list?page='+data.page,
        method: 'post',
		data
    });
}

//新增用户角色
export function addRole (data) {
    return request({
        url: '/api/sys/user/role/add',
        method: 'post',
		data: data
    });
}
//编辑用户角色
export function editRole (data) {
    return request({
        url: '/api/sys/user/role/edit',
        method: 'post',
		data: data
    });
}

//查看用户角色
export function showRole (data) {
    return request({
        url: '/api/sys/user/role/show',
        method: 'post',
		data: data
    });
}

