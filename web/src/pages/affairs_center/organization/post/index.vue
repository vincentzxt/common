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
      showAdd showDel showEnable showDisable
			@on-add='handleOpenAdd'
			@on-batch="handleBatch"
			@on-export="handleExport"
			@on-search="handleSearch">
			<Input slot="condition1" class="cu-table-input" type="text" v-model="searchData.name" placeholder="请输入职务名称" clearable/>
			</Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" @on-close="handleCloseAdd"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" :templateData="templateData" @on-close="handleCloseEdit"></CEdit>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import CEdit from './edit.vue';
	import { getOrgPostList } from '@/api/affairs_center/organization';
	import dayjs from 'dayjs';
	export default {
		name: 'organization-list',
		components: { Tables, CAdd, CEdit },
		data() {
			return {
				pageTitle:"党组织列表",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '职务编号', key: 'id', sortable: true, export: 0},
					{ title: '职务名称', key: 'name', sorttable: true, export: 0 },
					{ 
						title: '状态',
						key: 'status',
						export: 0,
						render: (h, params) => {
							let status = '';
							let color = '';
							if (params.row.status == 1) {
								status = '启用';
								color = '#19be6b';
							} else {
								status = '停用';
								color = '#ed4014';
							}
							return h('div', {
								style: { color: color }
							}, status);
						}
				 	},
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
				datas: [],
				pageInfo: {
					page: 1,
					pages: 1,
					pageSize: 10,
					totalNum: 0,
					pageSizeOpts: [10, 20]
				},
				searchData: {
					name: ''
				},
				templateData: {}
			};
		},
		methods: {
			getData() {
				this.loading = true;
				const page = {
					page: this.pageInfo.page,
					pageSize: this.pageInfo.pageSize
				};
				let sendData = Object.assign(page, this.searchData);
				getOrgPostList(sendData).then(res => {
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
			handleEnable(data) {
				if (data.length > 0) {
						//调用启用接口
						this.$Notice.success({ title: logMessage.enableSuccess });
					} else {
						this.$Notice.warning({ title: logMessage.selInfo });
					}
			},
			handleDisable(data) {
				if (data.length > 0) {
						//调用停用接口
						this.$Notice.success({ title: logMessage.disableSuccess });
					} else {
						this.$Notice.warning({ title: logMessage.selInfo });
					}
			},
			handleSearch() {
				this.getData();
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
			}
		},
		mounted () {
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
