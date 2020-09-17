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
			<Cascader slot="condition3" :data="formatOrgList" v-model="searchData.org" :render-format="orgFormat" placeholder="选择党支部" change-on-select transfer @on-change="handleOrgChange"></Cascader></Tables>
		</Card>
		<CAdd v-if="loadAdd" v-model="openAdd" :orgList="orgList" :memberList="memberList" @on-close="handleCloseAdd"></CAdd>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import { getOrgList } from '@/api/affairs_center/organization';
	import { getMemberList } from '@/api/affairs_center/member';
	import dayjs from 'dayjs';
	import { formatCascader, cloneObject } from '@/libs/tools';
	export default {
		name: 'threeMeetings-organizing',
		components: { Tables, CAdd },
		data() {
			return {
				pageTitle:"组织会议",
				columns: [
					{ type: 'selection', width: 60, align: 'center', export: 0 },
					{ title: '序号', width: 100, key: 'id', sortable: true, export: 1 },
					{ title: '党组织', key: 'title', align: 'center', sorttable: true, export: 1 },
					{ title: '支部大会', key: 'branch', align: 'center', export: 1 },
					{ title: '支委会议', key: 'committee', align: 'center', export: 1 },
					{ title: '党小组会', key: 'group', align: 'center', export: 1 },
					{ title: '党课', key: 'cours', align: 'center', export: 1 },
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
											this.handleGotoList(params.row)
										}
									}
								}, '详情')
							])
						}
					}
				],
				loading: false,
				loadAdd: false,
				openAdd: false,
				datas: [],
				pageInfo: {
					page: 1,
					pages: 1,
					pageSize: 20,
					totalNum: 0,
					pageSizeOpts: [20, 30]
				},
				searchData: {
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
				getOrgList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.orgList = res.data.result;
						this.datas = cloneObject(this.orgList);
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
					let orgid = this.orgList.filter((item)=>{
						return item.title == org
					})[0].id;
					this.datas = this.orgList.filter((item)=>{
						return item.fid == orgid;
					})
				} else {
					this.getData();
				}
			},
			handleGotoList(val) {
				this.$router.push(
					{
						name: 'activity_center-threeMeetings-list',
						params: { org: val.title }
					}
				)
			}
		},
		mounted () {
			this.getData();
			this.getMemberData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
