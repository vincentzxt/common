<template>
	<div>
		<Card :bordered="false" dis-hover class="ivu-mt list-index-card">
			<p slot="title">用户组</p>
			<table-list
				ref="table"
				:loading="loading"
				:columns="columns"
				:list="list"
				:pageSize="pageSize"
				:pageInfo="pageInfo"
				:currentPage="currentPage"
				:deleteShow="deleteShow"
				:enableShow="enableShow"
				@on-multi="handleMulti"
				@on-page-change="handleChangePage"
				@on-export="handleExport"
				@on-search="handleSearch"
				@on-refresh="handleRefresh"
			/>
		</Card>
	</div>
</template>
<script>
import tableForm from './table-form';
import tableList from './table-list';
import { getUserGroup } from '@/api/setting/userGroup';
export default {
	name: 'list-table-list',
	components: { tableForm, tableList },
	data() {
		return {
			columns: [
				{
					title: '选择',
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '组名',
					key: 'name',
					align: 'left',
					minWidth: 100,
					sortable: true
				},
				{
					title: '人数',
					key: 'user_count',
					align: 'left',
					minWidth: 140,
					sortable: true
				},
				{
					title: '创建日期',
					key: 'created_at',
					align: 'center',
					minWidth: 140,
					sortable: true
				},
				{
					title: '修改日期',
					key: 'created_at',
					align: 'center',
					minWidth: 140,
					sortable: true
				}
			],
			loading: false,
			list: [],
			pageInfo: {},
			searchData: {},
			currentPage: 1,
			pageSize: 10,
			searchStatus: false,
			deleteShow:false,
			enableShow:false,
		};
	},
	methods: {
		handleSearch(data) {
			this.currentPage = 1;
			this.searchData = data;
			this.loadData();
		},
		handleChangePage(val) {
			this.currentPage = val;
			this.loadData();
		},
		handleRefresh() {
			this.loadData();
		},
		loadData() {
			this.loading = true;
			const page = {
				page: this.currentPage,
				pagesize: this.pageSize
			};
			const senddata = Object.assign(page, this.searchData);
			getUserGroup(senddata)
				.then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.list = res.data.result;
						this.pageInfo = res.data.pageInfo;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
					// this.$Message.error(err.message);
				});
		},
		exportData() {
			const page = {
				page: 1,
				pagesize: -1
			};
			const senddata = page;

			getUser(senddata)
				.then(res => {
					if (res.code === 200) {
						this.$refs.table.$refs.tableMain.exportCsv({
							filename: `table-${new Date().valueOf()}.csv`,
							columns: this.columns,
							data: res.data.result
						});
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {});
		},
		handleExport(val) {
			if (val == 'exportCurrent') {
				this.$refs.table.$refs.tableMain.exportCsv({
					filename: `table-${new Date().valueOf()}.csv`,
					columns: this.columns,
					data: this.list
				});
			} else {
				this.exportData();
			}
		},
		handleMulti(val){
			console.log(val);
		}
		
	},
	mounted() {
		this.loadData();
	}
};
</script>
