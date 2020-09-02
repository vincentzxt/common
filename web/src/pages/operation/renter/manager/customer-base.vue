<template>
	<div>
				<Form ref="form" label-position="top">
					<Card dis-hover class="ivu-mb-8">
								<p slot="title">基本信息</p>
								    <Row :gutter="16">
								        <Col span="6">
								         <FormItem label="客户名称"><span>{{formData.cus_name || '-'}}</span></FormItem>
								        </Col>
									    
										<Col span="6">
										 <FormItem label="单位性质"><span>{{formData.cus_nature || '-'}}</span></FormItem>
										</Col>
									    <Col span="6">
									     <FormItem label="行业"><span>{{formData.cus_industry || '-'}}</span></FormItem>
									    </Col>
										<Col span="6">
										 <FormItem label="来访项目"><span>{{formData.proj_name || '-'}}</span></FormItem>
										</Col>
									</Row>
									<Row :gutter="16">
										<Col span="6">
										 <FormItem label="首访日期"><span>{{formData.cus_visit_date || '-'}}</span></FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="跟进人"><span>{{formData.cus_belong_user || '-'}}</span></FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="客户等级"><span>{{formData.cus_level || '-'}}</span></FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="客户状态">
											 <span>{{formData.cus_state || '-'}}</span>
										 </FormItem>
										</Col>
									   <Col span="6">
									    <FormItem label="客户成交率"><span>{{formData.deal_rate || '-'}}%</span></FormItem>
									   </Col>
									</Row>
						</Card>
						<Card dis-hover class="ivu-mb-8">
								<p slot="title">渠道信息</p>
								    <Row :gutter="16">
								        <Col span="6">
								         <FormItem label="渠道名称">
											<span>{{formData.channel_name || '-'}}</span>
											</FormItem>
								        </Col>
										<Col span="6">
										 <FormItem label="渠道联系人">
											 <span>{{formData.channel_contact || '-'}}</span></FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="联系人电话">
											 <span>{{formData.channel_contact_phone || '-'}}</span>
											 </FormItem>
										</Col>
									</Row>
						</Card>
						<Card dis-hover class="ivu-mb-8">
								<p slot="title">联系人</p>
								<div class="i-table-no-border" v-if="formData.customer_contact.length>0">
								    <Row :gutter="16" v-for="(item,index) in formData.customer_contact">
								        <Col span="6">
								         <FormItem label="姓名">
											 <span>{{item.contact_name || '-'}}</span>
										 </FormItem>
								        </Col>
									    <Col span="6">
									       <FormItem label="电话">
											   <span>{{item.contact_phone || '-'}}</span>
										   </FormItem>
									    </Col>
									    <Col span="6">
									    <FormItem label="岗位">
											<span>{{item.contact_role || '-'}}</span>
										</FormItem>
									    </Col>
								</Row>
								</div>
						</Card>
						<Card dis-hover class="ivu-mb-8">
								<p slot="title">租赁需求</p>
								    <Row :gutter="16">
								        <Col span="6">
								         <FormItem label="需求面积">
											<span>{{formData.customer_extra.demand_area || '-'}}m²</span>
											</FormItem>
								        </Col>
										<Col span="6">
										 <FormItem label="预算价格(元)">
											 <span>{{formData.customer_extra.purpose_price || '-'}}元/m²·天</span></FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="办公人数">
											 <span>{{formData.cus_worker_num || '-'}}</span>
											 </FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="装修要求">
											 <span>{{formData.customer_extra.trim_state || '-'}}</span>
											 </FormItem>
										</Col>
									</Row>
									<Row :gutter="16">
									    <Col span="6">
									     <FormItem label="意向租期">
											<span>{{formData.customer_extra.purpose_term_lease || '-'}}年</span>
											</FormItem>
									    </Col>
									、
									</Row>
						</Card>
						<Card dis-hover class="ivu-mb-8">
						    <p slot="title">意向房源</p>
							<div class="empty-info" v-if="formData.customer_room.length==0">暂无房源信息</div>
								<div class="i-table-no-border" v-if="formData.customer_room.length>0">
								<Table :columns="roomColumns" disabled-hover :data="formData.customer_room"></Table>
								</div>
						</Card>
						
				
					
						<Card dis-hover class="ivu-mb-8">
								<p slot="title">客户现状</p>
								    <Row :gutter="16">
										<Col span="6">
										 <FormItem label="当前项目">
											 <span>{{formData.customer_extra.current_proj || '-'}}</span>
											 </FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="当前办公地址">
											 <span>{{formData.customer_extra.current_addr || '-'}}</span>
											 </FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="当前面积">
											 <span>{{formData.customer_extra.current_area || '-'}}m²</span>
											 </FormItem>
										</Col>
										<Col span="6">
										 <FormItem label="当前单价">
											 <span>{{formData.customer_extra.current_price || '-'}}元/m²·天</span>
											 </FormItem>
										</Col>
									</Row>
						</Card>
				</Form>
		<Spin size="large" fix v-if="spinShow"></Spin> 
		  
	</div>
</template>

<script>
import { getCustomerById} from '@/api/merchants/customer';
export default {
	name: 'customer-base',
	props: {
		viewid: {
			type:Number,
			default: 0
		},
		
	},
	data() {
		return {
			formData: {
				customer_contact: [
					{
						contact_name: '',
						contact_phone: '',
						contact_role: ''
					}
				],
				customer_room:[],
				customer_extra:{}
			},
			spinShow: true,
			roomColumns:[
				{
				 title: '楼宇',
				 key: 'build_no',
				 render: (h, params) => {
				 	return h('div', params.row.proj_name+'-'+params.row.build_no)
				 }
				},
				{
				 title: '楼层',
				 key: 'floor_no'
				},
				{
				 title: '房号',
				 key: 'room_no'
				},
				{
				 title: '面积',
				 key: 'room_area'
				}
			]
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid};
			getCustomerById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
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