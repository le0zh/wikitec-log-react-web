/**
 * 整个app的state树对象
 */

//日志列表的state
const logs = {
	isFetching: false,
	page: 1,
	subSystem: 'all',
	pagedResult: {
		list: [],
		pageCount: 0,
		pageIndex: 1,
		pageSize: 10,
		totalCount: 100,
		todayCount: 1
	}
};

//日志详情
const logDetail = {
	id: 'logid',
	isFetching: false,
	log: {}
}

//APP state
const state = {
	logDetail: logDetail,
	logs: logs
};