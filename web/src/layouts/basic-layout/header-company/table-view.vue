<template>
	<div>
		<Drawer v-model="showViewModal"  title="企业系统设置" width="400" :mask-closable="true" class="drawer-no-padding">
			<div class="drawer-content">
				<div class="company-title">{{ company_name }}</div>
				<div class="company-expire">到期时间：{{ expire_date }}</div>
				<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top" class="ivu-m-16">
					<Row :gutter="24">
						<Col span="24">
							<FormItem prop="contract_prefix"  label="合同编号前缀"  :rules="{required: true, message: '请输入合同编号前缀',pattern: /.+/,trigger: 'blur'}">
								<Input type="text" v-model="formData.contract_prefix" placeholder="请输入合同编号前缀"  />
							</FormItem>
						</Col>
						<Col span="24">
							<FormItem prop="cus_prefix"  label="客户编号前缀"  :rules="{required: true, message: '请输入客户编号前缀',pattern: /.+/,trigger: 'blur'}">
								<Input type="text" v-model="formData.cus_prefix" placeholder="请输入客户编号前缀"  />
							</FormItem>
						</Col>
						<Col span="24">
								<FormItem prop="msg_revoke_time" label="消息撤回时长(分钟)">
								<Input type="text" v-model="formData.msg_revoke_time" placeholder="请输入消息撤回时长"  />
								</FormItem>
						</Col>
						<Col span="24">
							<FormItem prop="contract_due_remind"  label="合同到期提醒天数">
								<Input type="text" v-model="formData.contract_due_remind" placeholder="请输入合同到期提醒天数"  />
							</FormItem>
						</Col>
						<Col span="24">
							<Button type="primary"  @click="handleSubmit" style="font-size: 14px; width: 100%;">更新设置信息</Button>
						</Col>
					</Row>
				</Form>
				<div class="ivu-text-center"></div>
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>   
	</div>
</template>

<script>
import { showVariable,editVariable } from '@/api/common/company';
import { mapState, mapActions } from 'vuex';
export default {
	name: 'channel-visit-view',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		templateData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		const validateInteger = (rule, value, callback) => {
		      let regNum = /^[1-9]\d*$/;
					  if (value === '') {
							callback(new Error('请输入数字'));
					  } else if (!Number.isInteger(+value)) {
							callback(new Error('请输入数字'));
					  } else if (!regNum.test(value)) {
							callback(new Error('请输入数字'));
					  } else {
							callback();
					 }
			 };
		return {
			ruleValidata: {
				msg_revoke_time:[{required: true, validator: validateInteger, trigger: 'blur'}],
				contract_due_remind:[{required: true, validator: validateInteger, trigger: 'blur'}],
			},
			viewid:0,
			formData: {
				company_id: 0,
				contract_due_remind: "",
				contract_prefix: "",
				msg_revoke_time: "",
				cus_prefix: ""
			},
			company_name: "",
			expire_date:"",
			showViewModal: false,
			spinShow: false,
			loading: false,
		};
	},
	methods: {
		getRow(){
			const sendData = {};
			this.spinShow = true;
			showVariable(sendData).then(res => {
					this.spinShow = false;
					if (res.code === 200) {
						this.formData.contract_due_remind = res.data.contract_due_remind;
						this.formData.contract_prefix = res.data.contract_prefix;
						this.formData.cus_prefix = res.data.cus_prefix;
						this.formData.msg_revoke_time = res.data.msg_revoke_time;
						this.formData.company_id = res.data.company_id;
						this.company_name = res.data.company_name;
						this.expire_date = res.data.expire_date;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					//this.$Message.error(err.message);
					// 异常情况
				});
		},
		handleSubmit(){
			const sendData = this.formData
			this.spinShow = true;
			this.$refs.form.validate(valid => {
			if (valid) {
			editVariable(sendData).then(res => {
					this.spinShow = false;
					if (res.code === 200) {
						this.$Message.success("公司设置保存成功！");
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					this.$Message.error(err.message);
					// 异常情况
				});
			}
			});
		}		
	},
	computed: {
	    ...mapState('admin/user', [
	        'info'
	    ]),
	},
	watch: {
		value() {
			this.showViewModal = this.value;
			if (this.showViewModal === false) {
			}else{
				this.getRow();
			}
		},
		showViewModal(val) {
			if (!val) {
				this.$emit('view-closed',0);
			}
		}
	},
	mounted() {
		
	}
};
</script>
<style>
  .company-title{
	 font-size: 16px;
	 color:#333333;
	 font-weight: 500;
	 text-align: center;
	 margin-bottom: 12px;
	 margin-top: 12px;
  }
  .company-expire{
  	 font-size: 12px;
  	 color:#777777;
  	 font-weight: 500;
	 text-align: center;
	 margin-bottom: 24px;
  }
</style>