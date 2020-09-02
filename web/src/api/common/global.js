import request from '@/plugins/request';

//保存联系人
export function saveContact (data) {
    return request({
        url: '/api/common/contact/save',
        method: 'post',
        data: data
    });
}


//通过id删除联系人
export function delContactById (data) {
    return request({
        url: '/api/common/contact/del',
        method: 'post',
        data: data
    });
}

//获取维护列表
export function getMaintain (data) {
    return request({
        url: '/api/common/maintain/list',
        method: 'post',
        data: data
    });
}


//保存维护记录
export function saveMaintain (data) {
    return request({
        url: '/api/common/maintain/save',
        method: 'post',
        data: data
    });
}

//删除维护记录
export function delMaintain (data) {
    return request({
        url: '/api/common/maintain/del',
        method: 'post',
        data: data
    });
}

//通过全部字典
export function getDictAll (data) {
    return request({
        url: '/api/pub/dict/getAll',
        method: 'post',
        data: data
    });
}


//全部客户
export function getCustomerAll (data) {
    return request({
        url: '/api/pub/customer/getAll',
        method: 'post',
        data: data
    });
}

//全部项目
export function getProjectAll (data) {
    return request({
        url: '/api/pub/proj/getAll',
        method: 'post',
        data: data
    });
}

//当前权限项目
export function getProjectLimitAll (data) {
    return request({
        url: '/api/pub/proj/getAll',
        method: 'post',
        data: data
    });
}
//全部项目
export function getPolicyAll (data) {
    return request({
        url: '/api/pub/channel/getPolicyAll',
        method: 'post',
        data: data
    });
}
//全部场馆
export function getVenueAll (data) {
    return request({
        url: '/api/pub/venue/getAll',
        method: 'post',
        data: data
    });
}
//通过全部楼宇
export function getBuildingAll (data) {
    return request({
        url: '/api/pub/building/getAll',
        method: 'post',
        data: data
    });
}

//通过全部房间
export function getRoomAll (data) {
    return request({
        url: '/api/pub/room/getAll',
        method: 'post',
        data: data
    });
}

//获取空间
export function getSpace (data) {
    return request({
        url: 'api/pub/select/space',
        method: 'post',
        data: data
    });
}

//获取空间
export function getRoom (data) {
    return request({
        url: 'api/pub/select/room',
        method: 'post',
        data: data
    });
}

//通过全部渠道
export function getChannelAll (data) {
    return request({
        url: '/api/pub/channel/getAll',
        method: 'post',
        data: data
    });
}

//获取省份列表
export function getProvince () {
    return request({
        url: '/api/common/province',
        method: 'post'
    });
}

//获取城市列表
export function getCity (data) {
    return request({
        url: '/api/common/city',
        method: 'post',
        data: data
    });
}

//获取区域列表
export function getDistrict (data) {
    return request({
        url: '/api/common/district',
        method: 'post',
        data: data
    });
}

//获取产品列表
export function getProduct () {
    return request({
        url: '/api/common/product',
        method: 'get'
    });
}

//获取角色列表
export function getRole (data) {
    return request({
        url: '/api/common/role/list',
        method: 'post',
    });
	
}

//上传图片
export function upLoadImg (data) {
    return request({
        url: '/api/common/upload/img',
        method: 'post'
    });
}

//上传文件
export function upLoadFile (data) {
    return request({
        url: '/api/common/upload/file',
        method: 'post'
    });
}
