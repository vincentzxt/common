<template>
	<div>
				<Form ref="form" label-position="left" :label-width="100" class="form-view">
					<Card dis-hover class="ivu-mb-8">
								    <Row :gutter="16">
								        <Col span="12">
								         <FormItem label="公司名称"><span>{{formData.business_info.name || '-'}}</span></FormItem>
								        </Col>
									    <Col span="12">
									     <FormItem label="信用代码"><span>{{formData.business_info.creditCode || '-'}}</span></FormItem>
									    </Col>
									</Row>
									<Row :gutter="16">
									    <Col span="12">
									     <FormItem label="注册资本"><span>{{formData.business_info.regCapital || '-' }}</span></FormItem>
									    </Col>
										<Col span="12">
										 <FormItem label="行业"><span>{{formData.business_info.industry || '-'}}</span></FormItem>
										</Col>
									</Row>
									<Row :gutter="16">
										<Col span="12">
										 <FormItem label="法人"><span>{{formData.business_info.legalPersonName || '-'}}</span></FormItem>
										</Col>
										<Col span="12">
										 <FormItem label="企业状态"><span>{{formData.business_info.regStatus || '-'}}</span></FormItem>
										</Col>
									</Row>
									<Row :gutter="16">
										<Col span="12">
										 <FormItem label="人员规模">
											 <span>{{formData.business_info.staffNumRange || '-'}}</span>
										 </FormItem>
										</Col>
									   <Col span="12">
									    <FormItem label="成立日期"><span>{{formData.business_info.estiblishTime || '-'}}</span></FormItem>
									   </Col>
									</Row>
									<Row :gutter="16">
										<Col span="12">
										 <FormItem label="注册地址"><span>{{formData.business_info.regLocation || '-'}}</span></FormItem>
										</Col>
										<Col span="12">
										 <FormItem label="查看更多"><div v-if="Object.keys(formData.business_info).length>0"><span v-if="formData.business_info.skyeye_id>0"><a :href="'https://www.tianyancha.com/company/'+formData.business_info.skyeye_id" target="_blank">详情</a></span><span v-else><a :href="'https://www.tianyancha.com/search?key='+formData.business_info.cus_name" target="_blank">详情</a></span></div></FormItem>
										</Col>
									</Row>
									<Row :gutter="16">
										<Col span="24">
										 <FormItem label="经营范围"><span>{{formData.business_info.businessScope || '-'}}</span></FormItem>
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
	name: 'customer-business',
	props: {
		viewid: {
			type:Number,
			default: 0
		},

	},
	data() {
		return {
			formData: {
				business_info:{
					name:'',
					creditCode:'',
					regCapital:'',
					industry:'',
					legalPersonName:'',
					regStatus:'',
					taffNumRange:'',
					estiblishTime:'',
					regLocation:'',
					skyeye_id:0,
					businessScope:''
				},
			},
			spinShow: false,
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