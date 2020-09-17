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
				showReturn showAdd showDel
				@on-add='handleOpenAdd'
				@on-batch="handleBatch"
				@on-export="handleExport"
				@on-return="handleReturn">
				<Cascader slot="condition1" :data="formatOrgList" v-model="searchData.org" :render-format="orgFormat" placeholder="选择党组织" change-on-select transfer @on-change="handleOrgChange"></Cascader>
			</Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" :memberList="memberList" :orgList="orgList" @on-close="handleCloseAdd"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" :memberList="memberList" :orgList="orgList" :templateData="templateData" @on-close="handleCloseEdit"></CEdit>
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
	import { getOrgList } from '@/api/affairs_center/organization';
	import { getMemberList } from '@/api/affairs_center/member';
	import dayjs from 'dayjs';
	import { formatCascader, cloneObject } from '@/libs/tools';
	export default {
		name: 'partyDay-plan-list',
		components: { Tables, CAdd, CEdit, CView },
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				pageTitle:"活动计划列表",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '序号', width: 120, align: 'center', key: 'id', sortable: true, export: 1 },
					{ 
						title: '党组织',
						key: 'org',
						align: 'center',
						sortable: true,
						export: 1,
						render: (h, params) => {
							return h('span', params.row.org[params.row.org.length-1]);
						}},
					{ title: '计划标题', key: 'title', align: 'center', sortable: true, export: 1 },
					{ title: '添加时间', key: 'date', align: 'center', sortable: true, export: 1 },
					{
						title: '操作',
						key: 'action',
						width: 120,
						align: 'center',
						export: 0,
						render: (h, params) => {
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
				],
				loading: false,
				loadAdd: false,
				openAdd: false,
				loadEdit: false,
				openEdit: false,
				loadView: false,
				openView: false,
				datas: [],
				alldatas: [],
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
				getPlanList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.alldatas = res.data.result;
						this.datas = cloneObject(this.alldatas);
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
			handleReturn() {
				this.$emit('on-close');
			}
		},
		mounted () {
			this.getOrgData();
			this.getMemberData();
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
