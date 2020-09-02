<template>
	<div>
		<Modal v-model="showEditModal" title="编辑账户" :loading="loadingEdit" :mask-closable="false" width="600px"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
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
	import { editBank,showBank} from '@/api/setting/bank-manager';
export default {
	name: 'table-edit',
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
			showEditModal: false,
			loadingEdit: true,
			spinShow: false,
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = this.templateData;
			showBank(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData = res.data;
				}else{
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false
			});
		},
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					editBank(senddata).then(res => {
						if (res.code === 200) {
							this.$Message.success("账户编辑成功！");
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
								this.$emit('edit-closed',1);
							});
						} else {
							this.$Message.error(res.message);
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
							});
						}
					
					}).catch(err => {
						this.loadingEdit = false;
						this.$nextTick(() => {
							this.loadingEdit = true;
						});
					});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingEdit = false; 
					this.$nextTick(() => {
						this.loadingEdit = true;
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
			this.showEditModal = this.value;
			if (this.showEditModal === false) {
				this.handleReset();
			}else{
				this.getRow();
			}
		},
		showEditModal(val) {
			if (!val) {
				this.$emit('edit-closed',0);
			}
		}
	},
	mounted() {
	}
};
</script>
<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

