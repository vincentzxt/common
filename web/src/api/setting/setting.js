import request from '@/plugins/request';

//合同模板list
export function listContractTemplate(data) {
    return request({
        url: '/api/sysconfig/template/list',
        method: 'post',
		data
    });
}

//新增合同模板
export function addContractTemplate (data) {
    return request({
        url: '/api/sysconfig/template/add',
        method: 'post',
		data
    });
}

//编辑合同模板
export function editContractTemplate (data) {
    return request({
        url: '/api/sysconfig/template/edit',
        method: 'post',
		data
    });
}

//查看合同模板
export function showContractTemplate (data) {
    return request({
        url: '/api/sysconfig/template/show',
        method: 'post',
		data
    });
}

//删除合同模板
export function delContractTemplate (data) {
    return request({
        url: '/api/sysconfig/template/del',
        method: 'post',
		data
    });
}

//删除合同模板
export function parmContractTemplate (data) {
    return request({
        url: '/api/sysconfig/template/parm',
        method: 'post',
		data
    });
}