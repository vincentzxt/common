<template>
	<div style="width: 90%;margin: auto;"><Form ref="form" label-position="left" :label-width="80" class="form-view">
	<div class="empty-info" v-if="dataList.length==0">暂无数据</div>
			<Timeline>
			        <TimelineItem v-for="(item,index) in dataList" >
						<p class="time">{{item.maintain_type}} {{item.created_at}}</p>
						<Card dis-hover class="content ivu-mb-8">
										<Row :gutter="16">
											<Col span="12">
											 <FormItem label="维护人">
												 <span>{{item.c_username}}</span>
											 </FormItem>
											</Col>
											<Col span="12">
											 <FormItem  label="维护日期" >
												 <span>{{item.maintain_date}}</span>
											 </FormItem>
											</Col>		
										</Row>	
										  <Row :gutter="16">
										  	<Col span="12">
										  	 <FormItem label="联系人">
										  		 <span>{{item.maintain_user}}</span>
										  	 </FormItem>
										  	</Col>	
										  </Row>
										<Row :gutter="16">
											<Col span="24">
											 <FormItem label="维护内容">
												 <span>{{item.maintain_record}}</span>
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
import { listMaintain } from '@/api/merchants/maintain'
export default {
	name: 'view-maintain',
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
			const senddata = { 
				parent_id : this.viewid,
				page: 1,
				pagesize: -1,
				parent_type:1
				};
			listMaintain(senddata)
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
		this.getRow()
	},
	watch: {
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