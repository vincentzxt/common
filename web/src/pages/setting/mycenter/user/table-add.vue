<template>
	<div>
	<Modal v-model="showModal" title="修改密码" :loading="loading" :mask-closable="false" width="400" class="cutomer-modal-box" @on-ok="handleSubmit">
		<Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100" label-position="left">
			<Card dis-hover :bordered="false">
				<FormItem prop="oldpassword" label="原密码"><Input type="password" v-model="formData.oldpassword"  placeholder="请输入原密码"  /></FormItem>
				<FormItem prop="password" label="新密码"><Input type="password" v-model="formData.password" placeholder="请输入新密码"  /></FormItem>
				<FormItem prop="repassword" label="重复密码"><Input type="password" v-model="formData.repassword" placeholder="请输入重复密码"  /></FormItem>
		    </Card>
		</Form>
	</Modal>
	<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
import { editpwd} from '@/api/setting/account';
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
		 const pwdAgainCheck = async(rule, value, callback) => {
		      if (value.length < 1) {
		        this.changeAgainFlag = 2;
		        return callback(new Error('重复密码不能为空！'));
		      } else if(this.formData.password != this.formData.repassword){
		        this.changeAgainFlag = 2;
		        return callback(new Error('两次输入密码不一致！'));
		      }else{
		        this.changeAgainFlag = 1;
		        callback()
		      }
		    };
		return {
			ruleValidata: {
				oldpassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 12, message: '密码长度为6-12位', trigger: 'blur' }],
				password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 12, message: '密码长度为6-12位', trigger: 'blur' }],
				// repassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 12, message: '密码长度为6-12位', trigger: 'blur' }],
				repassword: [{required: true,trigger: 'blur',validator:pwdAgainCheck}]
			},
			formData: {
				oldpassword: '',
				password:'',
				repassword:''
			},
			showModal: false,
			loading: true,
			spinShow:false
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					editpwd(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("密码修改成功！");
								this.loading = false;
								this.$nextTick(() => {
									this.loading = true;
									this.$emit('add-closed',1);
								});
							} else {
								this.loading = false;
								this.$nextTick(() => {
									this.loading = true;
								});
								this.$Message.error(res.message);
							}
						})
						.catch(err => {
							this.loading = false;
							this.$nextTick(() => {
								this.loading = true;
							});
							// 异常情况
						});
				} else {
					this.$Message.error('表单验证失败！');
					this.loading = false; //改变loading状态
					this.$nextTick(() => {
						//在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
						this.loading = true;
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
