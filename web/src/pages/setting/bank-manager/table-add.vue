<template>
	<div>
		<Modal v-model="showModal" title="新增账户" :loading="loadingAdd" :mask-closable="false" width="600px"  :styles="{top: '20px'}" @on-ok="handleSubmit">
					<Form ref="form" :model="formData"  label-position="top">
						<Card dis-hover :bordered="false" class="ivu-mb-8">
							<Row :gutter="16">
								<Col span="24">
								<FormItem prop="account_name" label="账户名称"  :rules="{required: true, pattern: /.+/, message: '请输入账户名称', trigger: 'blur'}">
									<Input type="text" v-model="formData.account_name"  placeholder="请输入账户名称" />
								</FormItem>
								</Col>
								<Col span="24">
								<FormItem prop="bank_name" label="开户行"  :rules="{required: true, pattern: /.+/, message: '请输入开户行', trigger: 'blur'}">
									<Input type="text" v-model="formData.bank_name"  placeholder="请输入开户行" />
								</FormItem>
								</Col>
								<Col span="24">
								<FormItem prop="account_number" label="账号"  :rules="{required: true, pattern: /.+/, message: '请输入账号', trigger: 'blur'}">
									<Input type="text" v-model="formData.account_number"  placeholder="请输入账号" />
								</FormItem>
								</Col>
							</Row>
						</Card>
					</form>				
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Modal>
	</div>
</template>

<script>

import { addBank} from '@/api/setting/bank-manager';
export default {
	name: 'table-add',
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
		return {
			formData: {
				account_name:'',
				bank_name:'',
				account_number:''
			},
			currentMenu:0,
			showModal: false,
			loadingAdd: true,
			spinShow: false
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addBank(senddata).then(res => {
						if (res.code === 200) {
							this.$Message.success("账户新增成功！");
							this.loadingAdd = false;
							this.$nextTick(() => {
								this.loadingAdd = true;
								this.$emit('add-closed',1);
							});
						} else {
							this.$Message.error(res.message);
							this.loadingAdd = false;
							this.$nextTick(() => {
								this.loadingAdd = true;
							});
						}
					})
					.catch(err => {
						this.loadingAdd = false;
						this.$nextTick(() => {
							this.loadingAdd = true;
						});
						// 异常情况
					});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingAdd = false; //改变loading状态
					this.$nextTick(() => {
						//在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
						this.loadingAdd = true;
					});
				}
			});
		},
		handleReset() {
			this.$refs['form'].resetFields();
		}
	},
	watch: {
		value() {
			this.showModal = this.value;
			if (this.showModal === false) {
				this.handleReset();
			}
		},
		showModal(val) {
			if (!val) {
				this.$emit('add-closed',0);
			}
		}
	},
	mounted() {
	}
};
</script>
