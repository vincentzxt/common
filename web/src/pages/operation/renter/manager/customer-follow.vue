<template>
	<div style="width: 80%;margin: auto;"><Form ref="form" label-position="left" :label-width="100" class="form-view">
	<div class="empty-info" v-if="dataList.length==0">暂无数据</div>
			<Timeline>
			        <TimelineItem v-for="(item,index) in dataList" >
						<p class="time"><Icon :custom="typeIcon[item.cus_follow_type].name" :size="typeIcon[item.cus_follow_type].size" :color="typeIcon[item.cus_follow_type].color" style="margin-right: 10px;"></Icon>{{item.created_at}}</p>
						<Card dis-hover class="content ivu-mb-8">
										<Row :gutter="16">
											<Col span="12">
											 <FormItem label="跟进人">
												 <span>{{item.follow_username}}</span>
											 </FormItem>
											</Col>
											<Col span="12">
											 <FormItem  label="跟进日期" >
												 <span>{{item.cus_follow_time}}</span>
											 </FormItem>
											</Col>		
										</Row>	
										  <Row :gutter="16">
										  	<Col span="12">
										  	 <FormItem label="客户联系人">
										  		 <span>{{item.cus_contact_user}}</span>
										  	 </FormItem>
										  	</Col>
										  	<Col span="12">
										  	 <FormItem  label="意向等级" >
										  		 <span>{{item.cus_state}}</span>
										  	 </FormItem>
										  	</Col>		
										  </Row>
										<Row :gutter="16">
											<Col span="24">
											 <FormItem label="跟进内容">
												 <span>{{item.cus_follow_record}}</span>
											 </FormItem>
											</Col>	
										</Row>	  
							</Card>
					</TimelineItem>
			</Timeline>	
			</Form>
		<Spin size="large" fix v-if="spinShow"></Spin> 
		  
	</div>
</template>

<script>
import { getCustomerFollow } from '@/api/merchants/customer'
export default {
	name: 'customer-follow',
	props: {
		viewid: {
			type:Number,
			default: 0
		},
		
	},
	data() {
		return {
			dataList:[],
			spinShow: true,
			typeIcon: {
			  1: { name: 'iconfont icon-goutong', size: '18', color: '#2db7f5' },
			  2: { name: 'iconfont icon-dianhua', size: '18', color: '#19be6b' },
			  3: { name: 'iconfont icon-weixin', size: '18', color: '#19be6b' },
			  4: { name: 'iconfont icon-qq', size: '18', color: '#2db7f5' },
			  5: { name: 'iconfont icon-qita', size: '18', color: '#2db7f5' }
			}
		};
		
	},
	methods: {
		getRow(){
			this.spinShow = true;
			const senddata = { cus_id: this.viewid};
			getCustomerFollow(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.dataList = res.data.result;
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					// 异常情况
				});
		}
		
	},
	mounted() {
		
	},
	watch: {
		viewid() {
			if (this.viewid != 0) {
				this.getRow()
			}
		}
	},
};
</script>
<style lang="less">
    .time{
        font-size: 14px;
        font-weight: bold;
		margin-bottom:10px;
    }
</style>