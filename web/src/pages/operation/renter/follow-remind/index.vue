<template>
	<div>
		<Card :bordered="false" dis-hover class="ivu-mt">
			<Calendar type="month" v-model="date" @on-change="handleChange">
				<template slot-scope="{ date, data }" slot="month">
					<div class="cal-wrap">
						<Badge status="warning" v-for="(item, index) in Filterlist(data.day)" :key="index" v-if="index < 3" :text="item.remind_info.time + ' ' + item.remind_info.company"/>
					</div>
				</template>
			</Calendar>
		</Card>
		<Modal v-model="showModal" :title="cuDate" :footer-hide="true">
			<div class="modal-wrap" v-for="(item, index) in Filterlist(cuDate)" :key="index" :style="{'border-bottom': index !== Filterlist(cuDate).length-1 ? '1px solid #e8eaec' : ''}">
				<div class="left">
					<Icon custom="iconfont icon-yuan" size=10 color="#ff9900"></Icon>
				</div>
				<div class="right">
					<div class="header">
						<span style="margin-right:20px;">{{ item.remind_info.time}}</span>
						<span style="margin-right:20px;">{{ item.remind_info.company}}</span>
						<span>{{ item.remind_info.name}}</span>
					</div>
					<div class="content">
						<span>{{ item.remind_info.content}}</span>
					</div>
				</div>
			</div>
		</Modal>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>
<script>
import dayjs from 'dayjs';
import { getCustomerRemind } from '@/api/merchants/customer'
export default {
	name: 'remind-index',
	data() {
		return {
			spinShow: false,
			list: [],
			date: '',
			startDate: '',
			endDate: '',
			showModal: false,
		};
	},
	computed: {
		cuDate () {
			return dayjs(this.date).format('YYYY-MM-DD')
		}
	},
	methods: {
		loadData () {
			this.spinShow = true;
			let senddata = {
				start_date: this.startDate,
				end_date: this.endDate
			}
			getCustomerRemind(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					if (res.data.length > 0) {
						for (let item of res.data) {
							for (let child of item.remind_info.split(',')) {
								let childArr = child.split('-');
								this.list.push (
									{ 
										remind_date: item.remind_date,
										remind_info: {
											company: childArr[1],
											time: childArr[2],
											content: childArr[3],
											name: childArr[4]
										}
									}
								)
							}
						}
					}
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false;
			});
		},
		handleChange () {
			this.showModal = true
		},
		Filterlist (date) {
			return this.list.filter((item)=>{
				return item.remind_date == date
			})
		}
	},
	mounted() {
		this.startDate = dayjs().startOf('month').format("YYYY-MM-DD");
		this.endDate = dayjs().endOf('month').format("YYYY-MM-DD");
		this.loadData();
	}
};
</script>

<style lang="less" scoped>
.cal-wrap {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space:nowrap;
}
.modal-wrap {
	display: flex;
	flex-wrap: wrap;
	padding:5px 0;
	.left {
		display: flex;
		justify-content: center;
		padding: 10px 5px;
	}
	.right {
		display: flex;
		flex-direction: column;
		.header {
			padding:5px;
		}
		.content {
			padding:5px;
		}
	}
}
</style>
