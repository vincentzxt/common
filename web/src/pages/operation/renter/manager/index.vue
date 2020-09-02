<template>
	<div>
		<div class="list-total">
			<div class="list-item" v-for="(item,index) in stat" :key="index">
				<div class="title">{{item.cus_state}}</div>
				<div class="content">{{item.count}}</div>
			</div>
		</div>
		<Card :bordered="false" dis-hover class="ivu-mt list-index-card">
			<!-- <p slot="title">租客管理</p> -->
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
import { getCustomer } from '@/api/merchants/customer';
export default {
	name: 'list-table-list',
	components: { tableForm, tableList },
	data() {
		return {
			columns: [
				{
				      title: '序号', 
					  type: 'index',
				      width: 60,
				      align: 'center',
				      indexMethod: (row) => {
				      return (row._index + 1) + (this.pageSize * this.currentPage) - this.pageSize;
				    }
				 },
				{
					title: '租客名称',
					key: 'cus_name',
					align: 'left',
					minWidth: 250,
					sortable: true
				},
				{
					title: '行业',
					key: 'cus_industry',
					align: 'left',
					minWidth: 120,
					sortable: true
				},
				{
					title: '法人',
					key: 'lll',
					align: 'left',
					minWidth: 140,
					sortable: true
				},
				{
					title: '注册资本(万)',
					key: 'lll',
					align: 'left',
					minWidth: 140,
					sortable: true
				},
				{
					title: '创建日期',
					key: 'created_at',
					align: 'center',
					minWidth: 200,
					sortable: true
				}
			],
			loading: false,
			list: [],
			stat:[],
			pageInfo: {},
			searchData: {},
			currentPage: 1,
			pageSize: 10,
			searchStatus: false,
			deleteShow: false,
			enableShow: false
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
				pagesize: this.pageSize,
				cus_type:1,
				list_type:1,
			};
			const senddata = Object.assign(page, this.searchData);
			getCustomer(senddata)
				.then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.list = res.data.result;
						this.stat = res.data.stat;
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
				pagesize: -1,
				cus_type:1,
				list_type:1
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
		handleMulti(val) {
			console.log(val);
		}
	},
	mounted() {
		this.loadData();
	}
};
</script>
