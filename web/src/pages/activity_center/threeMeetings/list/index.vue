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
      showAdd
			@on-add='handleOpenAdd'
			@on-export="handleExport">
			<Input slot="condition1" class="br5" type="text" v-model="searchData.name" placeholder="请输入会议名称" clearable/>
			<Input slot="condition2" class="br5 ml10" type="text" v-model="searchData.date" placeholder="请输入开始时间" clearable/>
			<Cascader slot="condition3" class=" br5 ml10" style="width:100%;" :data="formatOrgList" v-model="searchData.org" :render-format="orgFormat" placeholder="选择党支部" change-on-select transfer @on-change="handleOrgChange"></Cascader></Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" :orgList="orgList" :memberList="memberList" @on-close="handleCloseAdd"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" :orgList="orgList" :memberList="memberList" :templateData="templateData" @on-close="handleCloseEdit"></CEdit>
		<CView v-if="loadView" v-model="openView" :memberList="memberList" :templateData="templateData" @on-close="handleCloseView"></CView>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import CEdit from './edit.vue';
	import CView from './view.vue';
	import { getThreeMeetingList } from '@/api/activity_center/threeMeeting';
	import { getOrgList } from '@/api/affairs_center/organization';
	import { getMemberList } from '@/api/affairs_center/member';
	import dayjs from 'dayjs';
	import { formatCascader, cloneObject } from '@/libs/tools';
	export default {
		name: 'threeMeetings-list',
		components: { Tables, CAdd, CEdit, CView },
		data() {
			return {
				pageTitle:"会议列表",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '会议编号', width: 120, key: 'id', sortable: true, export: 1 },
					{ title: '会议名称', key: 'name', sorttable: true, export: 1 },
					{ 
						title: '党组织',
						key: 'org',
						export: 1,
						render: (h, params) => {
							return h('span', params.row.org[params.row.org.length-1])
						}
					},
					{ title: '预计开始时间', key: 'date', export: 1 },
					{ title: '会议类型', key: 'type', export: 1 },
					{ 
						title: '状态',
						key: 'status',
						export: 1,
						render: (h, params) => {
							let status = '';
							let color = '';
							if (params.row.status == 1) {
								status = '未开始';
								color = '#19be6b';
							} else {
								status = '已结束';
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
												this.handleOpenEdit(params.row)
											}
										}
									}, '编辑'),
									h('a', {
										style: { 'margin-left': '10px'},
										on: {
											click: () => {
												this.handleStop(params.row)
											}
										}
									}, '结束')
								])
							} else {
								return h('div', [
									h('a', {
										on: {
											click: () => {
												this.handleOpenView(params.row)
											}
										}
									}, '详情')
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
				alldatas: [],
				datas: [],
				pageInfo: {
					page: 1,
					pages: 1,
					pageSize: 20,
					totalNum: 0,
					pageSizeOpts: [20, 30]
				},
				searchData: {
					name: '',
					date: '',
					org: []
				},
				templateData: {},
				orgList: [],
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
				getThreeMeetingList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.alldatas = res.data.result;
						this.datas = cloneObject(this.alldatas);
						if (Object.keys(this.$route.query).length !== 0) {
							this.datas = this.alldatas.filter((item)=>{
								return item.org == this.$route.query.org;
							})
    				}
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
			getOrgData() {
				this.loading = true;
				const page = {
					page: this.pageInfo.page,
					pageSize: this.pageInfo.pageSize
				};
				let sendData = Object.assign(page, this.searchData);
				getOrgList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.orgList = res.data.result;
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
			this.getOrgData();
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
