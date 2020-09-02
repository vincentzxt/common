<template>
	<div>
		<div class="list-total">
			<div class="list-item" v-for="(item,index) in stat" :key="index">
				<div class="title">{{item.lable}}</div>
				<div class="content">{{item.value}}</div>
			</div>
		</div>
		<Card :bordered="false" dis-hover class="ivu-mt list-index-card">
			<table-form @on-submit="handleSearch" @on-reset="handleSearch" :searchStatus="searchStatus" />
			<table-list
				ref="table"
				:loading="loading"
				:columns="columns"
				:list="list"
				:pageSize="pageSize"
				:pageInfo="pageInfo"
				:currentPage="currentPage"
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
import { getCustomerFollow } from '@/api/merchants/customer';
export default {
	name: 'followList-manager-list',
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
					title: '客户名称',
					key: 'cus_name',
					align: 'left',
					minWidth: 200,
					sortable: true,
					render: (h, params) => {
						return h(
							'span',params.row.customer.cus_name
						);
					}
				},
				{ title: '客户状态', key: 'cus_state', sortable: true ,minWidth: 80},
				{ title: '客户联系人', key: 'cus_contact_user',minWidth: 80,},
				{ title: '跟进时间', key: 'cus_follow_time',minWidth: 140, sortable: true },
				{ title: '跟进人', key: 'follow_username', sortable: true ,minWidth: 80},
				{
					title: '跟进内容',
					key: 'cus_follow_record',
					align: 'left',
					minWidth: 200,
					ellipsis: true
				}
			],
			loading: false,
			list: [],
			stat:[],
			pageInfo: {},
			searchData: {},
			currentPage: 1,
			pageSize: 10,
			searchStatus: false
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
			getCustomerFollow(senddata).then(res => {
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
			});
		},
		exportData() {
			const page = {
				page: 1,
				pagesize: -1
			};
			const senddata = page;
			getChannel(senddata).then(res => {
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
		}
	},
	mounted() {
		this.loadData();
	}
};
</script>
