<template>
	<div>
		<Card v-if="loadHome" :bordered="false" dis-hover class="ivu-mt list-index-card">
			<Tables
				ref="table"
				:datas="datas"
				:columns="columns"
				:pageInfo="pageInfo"
				@on-page-change='handlePageChange'
				@on-page-size-change='handlePageSizeChange'>
				<Input slot="condition1" class="br5" type="text" v-model="searchData.title" placeholder="请输入计划标题" clearable/>
				<DatePicker slot="condition2" class="ml10" type="date" v-model="searchData.date" placeholder="选择日期" format="yyyy-MM-dd" style="width:100%;" transfer></DatePicker>
			</Tables>
		</Card>
		<CList v-if="loadList" :data="childrenData" @on-close="handleListClose"></CList>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import { getActiveList } from '@/api/activity_center/partyDay';
	import { getMemberList } from '@/api/affairs_center/member';
	import dayjs from 'dayjs';
	import { formatCascader, cloneObject } from '@/libs/tools';
	import CList from './list';
	export default {
		name: 'partyDay-plan',
		components: { Tables, CList },
		data() {
			return {
				pageTitle:"活动计划",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '序号', width: 120, align: 'center', key: 'id', sortable: true, export: 1 },
					{ title: '标题', key: 'title', align: 'center', sortable: true, export: 1 },
					{ title: '活动时间', key: 'date', align: 'center', sortable: true, export: 1 },
					{ title: '审核人', key: 'auditor', align: 'center', export: 1 },
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
											this.handleGotoList(params.row,)
										}
									}
								}, '填写计划')
							])
						}
					}
				],
				loading: false,
				loadHome: true,
				loadList: false,
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
				childrenData: {}
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
				getActiveList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.datas = res.data.result.filter((item) => {
							return item.status == 1;
						});
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
			handlePageChange(val) {
				this.pageInfo.page = val;
				this.getData();
			},
			handlePageSizeChange(val) {
				this.pageInfo.page = 1;
				this.pageInfo.pageSize = val;
				this.getData();
			},
			handleGotoList(val) {
				this.childrenData = val;
				this.loadHome = false;
				this.loadList = true;
			},
			handleListClose() {
				this.childrenData = {};
				this.loadList = false;
				this.loadHome = true;
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
