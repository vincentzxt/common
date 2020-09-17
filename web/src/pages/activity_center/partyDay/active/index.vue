<template>
	<div>
		<Card :bordered="false" dis-hover class="ivu-mt list-index-card">
			<Tables
				ref="table"
				:datas="datas"
				:columns="columns"
				:pageInfo="pageInfo"
				@on-page-change='handlePageChange'
				@on-page-size-change='handlePageSizeChange'
				showAdd showDel
				@on-add='handleOpenAdd'
				@on-batch="handleBatch"
				@on-export="handleExport">
				<Input slot="condition1" class="br5" type="text" v-model="searchData.title" placeholder="请输入计划标题" clearable/>
				<DatePicker slot="condition2" class="ml10" type="date" v-model="searchData.date" placeholder="选择日期" format="yyyy-MM-dd" style="width:100%;" transfer></DatePicker>
			</Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" :memberList="memberList" @on-close="handleCloseAdd"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" :memberList="memberList" :templateData="templateData" @on-close="handleCloseEdit"></CEdit>
		<CView v-if="loadView" v-model="openView" :memberList="memberList" :templateData="templateData" @on-close="handleCloseView"></CView>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import CEdit from './edit.vue';
	import CView from './view.vue';
	import { getPlanList } from '@/api/activity_center/partyDay';
	import { getMemberList } from '@/api/affairs_center/member';
	import dayjs from 'dayjs';
	import { formatCascader, cloneObject } from '@/libs/tools';
	export default {
		name: 'partyDay-active',
		components: { Tables, CAdd, CEdit, CView },
		data() {
			return {
				pageTitle:"党日活动",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '序号', width: 120, align: 'center', key: 'id', sortable: true, export: 1 },
					{ title: '标题', key: 'title', align: 'center', sortable: true, export: 1 },
					{ title: '活动时间', key: 'date', align: 'center', sortable: true, export: 1 },
					{ 
						title: '状态',
						key: 'status',
						align: 'center',
						sortable: true,
						export: 1,
						render: (h, params) => {
							let status = '';
							let color = '';
							if (params.row.status == 1) {
								status = '审核通过';
								color = '#19be6b';
							} else {
								status = '待审核';
								color = '#ed4014';
							}
							return h('span', {
								style: {
									'color': color
								}
							}, status)
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 120,
						align: 'center',
						export: 0,
						render: (h, params) => {
							if (params.row.status == 1) {
								return h('div', [
									h('a', {
										on: {
											click: () => {
												this.handleOpenView(params.row)
											}
										}
									}, '详情')
								])
							} else {
								return h('div', [
									h('a', {
										on: {
											click: () => {
												this.handleOpenView(params.row)
											}
										}
									}, '详情'),
									h('a', {
										style: { 'margin-left': '10px' },
										on: {
											click: () => {
												this.handleOpenEdit(params.row)
											}
										}
									}, '编辑')
								])
							}
						}
					}
				],
				loading: false,
				loadAdd: false,
				openAdd: false,
				loadEdit: false,
				openEdit: false,
				loadView: false,
				openView: false,
				datas: [],
				pageInfo: {
					page: 1,
					pages: 1,
					pageSize: 20,
					totalNum: 0,
					pageSizeOpts: [20, 30]
				},
				searchData: {
					title: '',
					date: ''
				},
				templateData: {},
				memberList: []
			};
		},
		computed: {
      formatOrgList() {
        return formatCascader(this.orgList);
      }
    },
		methods: {
			getData() {
				this.loading = true;
				const page = {
					page: this.pageInfo.page,
					pageSize: this.pageInfo.pageSize
				};
				let sendData = Object.assign(page, this.searchData);
				getPlanList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.datas = res.data.result;
						this.pageInfo.page = res.data.pageInfo.currentPage;
						this.pageInfo.pages = res.data.pageInfo.pages;
						this.pageInfo.totalNum = res.data.pageInfo.totalNum;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			getMemberData() {
				this.loading = true;
				getMemberList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.memberList = res.data.result;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			handleOpenAdd() {
				this.loadAdd = true;
				this.$nextTick(() => {
					this.openAdd = true;
				})
			},
			handleCloseAdd() {
				this.loadAdd = false;
				this.openAdd = false;
				this.getData();
			},
			handleOpenEdit(row) {
				this.templateData = row;
				this.loadEdit = true;
				this.$nextTick(() => {
					this.openEdit = true;
				})
			},
			handleCloseEdit() {
				this.loadEdit = false;
				this.openEdit = false;
				this.getData();
			},
			handleOpenView(row) {
				this.templateData = row;
				this.loadView = true;
				this.$nextTick(() => {
					this.openView = true;
				})
			},
			handleCloseView() {
				this.loadView = false;
				this.openView = false;
			},
			handleBatch(val) {
				if (val.name == 'delete') {
					this.handleDelete(val.data);
				} else if (val.name == 'enable') {
					this.handleEnable(val.data);
				} else if (val.name == 'disable') {
					this.handleDisable(val.data);
				}
			},
			handleDelete(data) {
				if (data.length > 0) {
					//调用删除接口
					this.$Notice.success({ title: logMessage.deleteSuccess });
				} else {
					this.$Notice.warning({ title: logMessage.selInfo });
				}
			},
			handlePageChange(val) {
				this.pageInfo.page = val;
				this.getData();
			},
			handlePageSizeChange(val) {
				this.pageInfo.page = 1;
				this.pageInfo.pageSize = val;
				this.getData();
			},
			handleExport() {
				let exportColumns = this.columns.filter((item) => {
					return item.export == 1
				})
				this.$refs.table.$refs.tableMain.exportCsv({
					filename: `${this.pageTitle}-${dayjs().format('YYYYMMDDHHmmss')}.csv`,
					columns: exportColumns,
					data: this.datas
				});
			},
			orgFormat(labels, selectedData) {
        let index = labels.length - 1;
        let data = selectedData[index] || false;
        if (data && data.code) {
          return labels[index] + ' - ' + data.code;
        }
        return labels[index];
			},
			handleOrgChange(val) {
				if (val.length > 0) {
					let org = val[val.length-1];
					this.datas = this.alldatas.filter((item)=>{
						return item.org == org;
					})
				} else {
					this.getData();
				}
			},
			handleStop(val) {
				for (let item of this.datas) {
					if (item.id == val.id) {
						item.status == 0;
					}
				}
			}
		},
		mounted () {
			this.getMemberData();
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
