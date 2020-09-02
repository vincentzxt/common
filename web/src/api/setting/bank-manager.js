import request from '@/plugins/request';

//账户list
export function listBank(data) {
    return request({
        url: '/api/company/bankaccount/list',
        method: 'post',
		data
    });
}

//新增合同模板
export function addBank (data) {
    return request({
        url: '/api/company/bankaccount/add',
        method: 'post',
		data
    });
}

//编辑合同模板
export function editBank (data) {
    return request({
        url: '/api/company/bankaccount/edit',
        method: 'post',
		data
    });
}

//查看合同模板
export function showBank (data) {
    return request({
        url: '/api/company/bankaccount/show',
        method: 'post',
		data
    });
}

