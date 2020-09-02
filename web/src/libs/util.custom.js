/**
 * @description 克隆一个对象，去除它跟原对象的关联性
 * @param (Object) obj 原对象
 */
function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj))
}

/**
 * @param {*} s
 * @description 将不满两位数的字符串用0补满两位
 */
function repair2Num(s) {
	return s < 10 ? '0' + s : s;
}

/**
 * @description 将日期格式化成标准格式
 * @param (String) date 日期字符串
 */

function dataFormat(date) {
	let fmtDate = new Date(date)
	let year = fmtDate.getFullYear()
	let month = fmtDate.getMonth() + 1
	let day = fmtDate.getDate()
	let hour = fmtDate.getHours()
	let minute = fmtDate.getMinutes()
	let second = fmtDate.getSeconds()
	return year + '-' + repair2Num(month) + '-' + repair2Num(day) + " " + repair2Num(hour) + ":" + repair2Num(minute) +
		":" + repair2Num(second)
}

function dateAddMonth(nowdate,addMonth) {
	var  nowdate = new Date(nowdate)
	var y = nowdate.getFullYear();
	var m = nowdate.getMonth();
	var nextY = y;
	var nextM = m;
	//如果当前月+要加上的月>11 这里之所以用11是因为 js的月份从0开始
	if ((m + addMonth) > 11) {
		nextY = y + 1;
		nextM = parseInt(m + addMonth) - 12;
	} else {
		nextM = nowdate.getMonth() + addMonth
	}
	var daysInNextMonth = daysInMonth(nextY, nextM);
	var day = nowdate.getDate()-1;
	if (day > daysInNextMonth) {
		day = daysInNextMonth;
	}
	return new Date(nextY, nextM, day);
};

function daysInMonth(year, month) {
	if (month == 1) {
		if (year % 4 == 0 && year % 100 != 0)
			return 29;
		else
			return 28;
	} else if ((month <= 6 && month % 2 == 0) || (month = 6 && month % 2 == 1))
		return 31;
	else
		return 30;
};



function dateFormat(date) {
	let fmtDate = new Date(date)
	let year = fmtDate.getFullYear()
	let month = fmtDate.getMonth() + 1
	let day = fmtDate.getDate()
	return year + '-' + repair2Num(month) + '-' + repair2Num(day)
}

export { dateFormat,dateAddMonth };
