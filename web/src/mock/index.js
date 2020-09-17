import Mock from 'mockjs';
import Setting from '@/setting';

import { loginData } from './account/loginData';

import { orgData } from './affairs_center/orgData';
import { orgPostData } from './affairs_center/orgPostData';
import { memberData } from './affairs_center/memberData';

import { democraticData } from './activity_center/democraticData';
import { threeMeetingListData } from './activity_center/threeMeetingListData';
import { lifeData } from './activity_center/lifeData';
import { partyDayActiveData, partyDayPlanData } from './activity_center/partyDayData';


const apiurl = Setting.apiBaseURL;

Mock.mock(apiurl + '/api/auth/login', 'post', loginData);

Mock.mock(apiurl + '/api/affairs_center/org/list', 'get', (data) => {
  return orgData;
});
Mock.mock(apiurl + '/api/affairs_center/org/post/list', 'get', (data) => {
  return orgPostData;
});
Mock.mock(apiurl + '/api/affairs_center/member/list', 'get', (data) => {
  return memberData;
});
Mock.mock(apiurl + '/api/affairs_center/member/listById', 'post', (data) => {
  let body = JSON.parse(data.body);
  let orgId = body.oid;
  let result =  memberData.data.result.filter((item)=>{
    return item.oid == orgId;
  })
  let sendData = JSON.parse(JSON.stringify(memberData));
  sendData['data']['result'] = result;
  return sendData;
});

Mock.mock(apiurl + '/api/activity_center/democratic/list', 'get', (data) => {
  return democraticData;
});
Mock.mock(apiurl + '/api/activity_center/threeMeeting/list', 'get', (data) => {
  return threeMeetingListData;
});
Mock.mock(apiurl + '/api/activity_center/life/list', 'get', (data) => {
  return lifeData;
});
Mock.mock(apiurl + '/api/activity_center/partyDay/active/list', 'get', (data) => {
  return partyDayActiveData;
});
Mock.mock(apiurl + '/api/activity_center/partyDay/plan/list', 'get', (data) => {
  return partyDayPlanData;
});

/*const getData = (post, data, keys) => {
  let body = JSON.parse(post.body);
  let result = [];
  let search = 0;
  for (let key of keys) {
    if (body[key]) {
      search = 1;
    }
  }
  for (let item of data['data']['result']) {
    if (search == 1) {
      for (let key of keys) {
        if (body[key] && item[key].indexOf(body[key]) !== -1) {
          result.push(item);
        }
      }
    } else {
      result.push(item);
    }
  }
  let sendData = JSON.parse(JSON.stringify(data));
  sendData['data']['result'] = result;
  return sendData;
}*/