<template>
	<div>
		<div class="i-table-no-border"><Table :columns="columns" :data="dataList"></Table></div>
		<div class="ivu-mt ivu-text-center">
			<Page :total="pageInfo.totalNum" show-total :page-size="pageSize" @on-change="handleChangePage" />
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>


<script>
import { channelCustomer } from '@/api/merchants/channel';
export default {
	name: 'view-customer',
	props: {
		viewid: {
			type: Number,
			default: 0
		},
		templateData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			columns: [
				{
					title: '客户名称',
					key: 'cus_name',
					align: 'left',
					minWidth: 250
				},
				{
					title: '来访日期',
					key: 'cus_visit_date',
					align: 'left',
					minWidth: 120
				},
				{
					title: '需求面积',
					key: 'customer_extra',
					align: 'left',
					minWidth: 120,
					render: (h, params) => {
						return h('div', params.row.customer_extra.demand_area)
					}
				},
				{
					title: '佣金金额',
					key: 'brokerage_amount',
					align: 'left',
					minWidth: 120
				}
			],
			dataList: [],
			pageInfo:{},
			pageSize:10,
			currentPage: 1,
			spinShow: false
		};
	},
	methods: {
		getRow() {
			this.spinShow = true;
			const senddata = { 
				channel_id: this.viewid,
				page: this.currentPage,
				pagesize: this.pageSize,
			};
			console.log("test");
			channelCustomer(senddata)
				.then(res => {
					this.spinShow = false;
					if (res.code === 200) {
						this.dataList = res.data.result;
						this.pageInfo = res.data.pageInfo;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false;
					// 异常情况
				});
		},
		handleChangePage(val){
			this.currentPage = val
		}
	},
	mounted() {
		this.getRow();
	},
	watch: {
	}
};
</script>
