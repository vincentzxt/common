<template>
	<div>
<!-- 		<div class="list-total">
			<div class="list-item" v-for="(item,index) in stat" :key="index">
				<div class="title">{{item.channel_type}}</div>
				<div class="content">{{item.count}}</div>
			</div>
		</div> -->
		<Card :bordered="false" dis-hover class="list-index-card">
			<p slot="title">场馆管理</p>
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
				@on-multi="handleEnable"
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
	import { listVenue} from '@/api/merchants/venue';
	export default {
		name: 'index-list',
		components: { tableForm, tableList },
		data () {
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
					{ title: '场馆名称', key: 'venue_name', sortable: true ,minWidth: 100},
					{ title: '项目名称', key: 'proj_name' },
					{ title: '面积(m²)', key: 'venue_area' },
					{ title: '参考价格(天)', key: 'venue_price' },
					{ title: '容纳人数', key: 'venue_capacity' },
					{ title: '预订次数(次)', key: 'venue_book_count' },
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
			handleSearch (data) {
				this.currentPage = 1;
				this.searchData = data;
				this.loadData();
			},
			handleChangePage (val) {
				this.currentPage = val;
				this.loadData();
			},
			handleRefresh () {
				this.loadData();
			},
			handleEnable (val) {
				this.loading = true;
				let senddata = {
					Ids: val.data,
					is_vaild: val.type
				}
				enableChannel(senddata).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.$refs.table.handleClearSelect();
						this.loadData();
					} else {
						this.$Message.error(res.message);
					}
					this.$refs.table.handleClearSelect();
				}).catch(() => {
					this.loading = false;
				});
			},
			loadData () {
				this.loading = true;
				const page = {
					page: this.currentPage,
					pagesize: this.pageSize
				};
				const senddata = Object.assign(page, this.searchData);
				listVenue(senddata).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.list = res.data.result;
						this.stat = res.data.stat;
						this.pageInfo = res.data.pageInfo;
					} else {
						this.$Message.error(res.message);
					}
				}).catch(() => {
					this.loading = false;
				})
			},
			exportData () {
				const page = {
					page: 1,
					pagesize: -1
				};
				const senddata = page;
				listVenue(senddata).then(res => {
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
			},
			handleExport (val) {
				if (val === 'exportCurrent') {
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
		mounted () {
			this.loadData();
		}
	}
</script>

