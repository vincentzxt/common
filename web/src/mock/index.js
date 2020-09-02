import Mock from 'mockjs';
import Setting from '@/setting';

import { loginData } from './account/loginData';
import { orgPageData } from './party_affairs_center/orgData';
import { orgPage1Data } from './party_affairs_center/orgData';
import { orgPage2Data } from './party_affairs_center/orgData';

const apiurl = Setting.apiBaseURL;

Mock.mock(apiurl + '/api/auth/login', 'post', loginData);
Mock.mock(apiurl + '/api/party_affairs_center/org/list', 'post', (data) => {
  let pageInfo = JSON.parse(data.body);
  let page = pageInfo.page;
  let pageSize = pageInfo.pageSize;
  let name = pageInfo.name;
  let address = pageInfo.address;
  if (name !== '' || address !== '') {
    let data = [];
    for (let item of orgPageData.data.result) {
      if (name && item.name.indexOf(name) !== -1) {
        data.push(item);
      }
      if (address && item.address.indexOf(address) !== -1) {
        data.push(item);
      }
    }
    orgPageData.data.pageInfo.totalNum = data.length;
    orgPageData.data.pageInfo.pages = orgPageData.data.pageInfo.totalNum / 10;
    orgPageData.data.result = data;
    return orgPageData;
  } else {
    if ((page == 1 || page == 2) && pageSize == 20) {
      return orgPageData;
    } else if (page == 1 && pageSize == 10) {
      return orgPage1Data;
    } else if (page == 2 && pageSize == 10) {
      return orgPage2Data;
    }
  }
});