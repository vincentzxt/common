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
      showAdd showDel showExport
			@on-add='handleOpenAdd'
			@on-batch="handleBatch"
			@on-export="handleExport"
			@on-search="handleSearch">
			<Input slot="condition1" class="cu-table-input" type="text" v-model="searchData.name" placeholder="请输入组织名称" clearable/>
			<Input slot="condition1" class="cu-table-input ml10" type="text" v-model="searchData.address" placeholder="请输入组织地址" clearable/>
			</Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" @on-close="handleCloseAdd"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" :templateData="templateData" @on-close="handleCloseEdit"></CEdit>
		<CView v-if="loadView" v-model="openView" :templateData="templateData" @on-close="handleCloseView"></CView>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import CEdit from './edit.vue';
	import CView from './view.vue';
	import { getOrgList } from '@/api/party_affairs_center/organization';
	import dayjs from 'dayjs';
	export default {
		name: 'organization-list',
		components: { Tables, CAdd, CEdit, CView },
		data() {
			return {
				pageTitle:"党组织列表",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '组织名称', key: 'name', sortable: true, export: 1},
					{ title: '组织地址', key: 'address', export: 1 },
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
								}, '编辑'),
								h('a', {
									style: {"margin-left": "10px"},
									on: {
										click: () => {
											this.handleOpenView(params.row)
										}
									}
								}, '查看')
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
				pageInfo: {
					page: 1,
					pages: 1,
					pageSize: 10,
					totalNum: 0,
					pageSizeOpts: [10, 20]
				},
				searchData: {
					name: '',
					address: ''
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
				getOrgList(sendData).then(res => {
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
					if (val.data.length > 0) {
						//调用删除接口
						this.$Notice.success({ title: logMessage.deleteSuccess });
					} else {
						this.$Notice.warning({ title: logMessage.deleteInfo });
					}
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

<style lang="less">
	@import './index.less';
</style>
