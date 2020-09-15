/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 克隆一个对象，去除它跟原对象的关联性
 * @param (Object) obj 原对象
*/
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
* @description 将不满两位数的字符串用0补满两位
* @param {*} s
*/
export function repair2Num(s) {
  return s < 10 ? '0' + s: s;
}

/**
* @description 将日期对象格式化成字符串
* @param (dateObj) 日期对象
*/
export function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + '-' + repair2Num(month) + '-' + repair2Num(day)
}

/**
* @description 获取当前日期范围
* @param (String) 'year' 'quarter' 'month' 'week' 'yesterday' 'day'
*/
export function getDateRang(str)  {
  let sDate = new Date();
  let eDate = new Date();
  let quarters = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12]
  }
  switch(str) {
    case 'year':
      sDate.setMonth(0)
      sDate.setDate(1)
      break
    case 'quarter':
      let m = sDate.getMonth() + 1;
      for (let q in quarters) {
        let ext = quarters[q].some((item) => {
          return item === m
        })
        if (ext) {
          sDate.setMonth(quarters[q][0]-1)
          sDate.setDate(1)
        }
      }
    case 'month': 
      sDate.setDate(1)
      break
    case 'week':
        let w = sDate.getDay()
        w = w == 0 ? 6 : w - 1
        sDate.setDate(sDate.getDate() - w)
        break
    case 'yesterday':
      sDate.setDate(sDate.getDate() - 1)
      eDate.setDate(eDate.getDate() - 1)
      break
  }
  return [ dateFormat(sDate), dateFormat(eDate) ]
}

/**
* @description 格式化树型菜单
* @param (Array) array
*/
export function formatTree(array) {

  var treeData = getData(array);
  return treeData;

  function getData(array) {
    var result = [];
    for (let item of array) {
      if (item.fid == 0) {
        var parent = {
          id: item.id,
          title: item.title,
          expand: true,
          selected: true
        }
        parent.children = getChilds(item.id, array);
        result.push(parent);
      }
    }
    return result;
  }

  function getChilds(id, array) {
    let childs = new Array();
    for (let item of array) {
      if (item.fid == id) {
        childs.push ({ id: item.id, title: item.title, expand: true, selected: false })
      }
    }
    for (let child of childs) {
      let tmp = getChilds(child.id, array);
      if (tmp.length > 0) {
        child.children = tmp;
      }
    }
    return childs;
  }
}

/**
* @description 格式化级联选择菜单
* @param (Array) array
*/
export function formatCascader(array) {

  var treeData = getData(array);
  return treeData;

  function getData(array) {
    var result = [];
    for (let item of array) {
      if (item.fid == 0) {
        var parent = {
          id: item.id,
          value: item.title,
          label: item.title
        }
        parent.children = getChilds(item.id, array);
        result.push(parent);
      }
    }
    return result;
  }

  function getChilds(id, array) {
    let childs = new Array();
    for (let item of array) {
      if (item.fid == id) {
        childs.push ({ id: item.id, value: item.title, label: item.title })
      }
    }
    for (let child of childs) {
      let tmp = getChilds(child.id, array);
      if (tmp.length > 0) {
        child.children = tmp;
      }
    }
    return childs;
  }
}