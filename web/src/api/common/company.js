import request from '@/plugins/request';

//获取当前用户公司信息
export function showInfo (data) {
    return request({
        url: '/api/company/present',
        method: 'post',
		data:data
    });
}

//获取当前公司订购信息
export function getCompanyOrder () {
    return request({
        url: '/api/sys/order/list',
        method: 'get'
    });
}

//获取当前公司产品信息
export function getCompanyProject () {
    return request({
        url: '/api/sys/project/list',
        method: 'get'
    });
}

//获取当前公司银行账户
export function getCompanyBank (data) {
    return request({
        url: '/api/company/bankaccount/list',
        method: 'post',
		data:data
    });
}

//获取当前公司配置信息
export function showVariable(data) {
    return request({
        url: '/api/sys/company/variable/show',
        method: 'post',
		data:data
    });
}

//获取当前公司配置信息
export function editVariable(data) {
    return request({
        url: '/api/sys/company/variable/edit',
        method: 'post',
		data:data
    });
}

