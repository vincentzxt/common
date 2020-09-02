<template>
	<div>
	<Modal v-model="showModal" title="修改手机号" :loading="loading" :mask-closable="false" width="500" class="cutomer-modal-box" @on-ok="handleSubmit">
		<Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100" label-position="left">
			<Card dis-hover :bordered="false">
				<FormItem prop="oldPhone" label="原手机号码"><Input type="text" v-model="formData.oldPhone"  placeholder="请输入原手机号码" disabled /></FormItem>
				<FormItem prop="phone" label="手机号码"><Input type="text" v-model="formData.phone" placeholder="请输入新手机号码"  /></FormItem>
		    </Card>
		</Form>
	</Modal>
	<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
import { editpwd,userinfo} from '@/api/setting/account';

export default {
	name: 'phone',
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
		 const validatePhone = (rule, value, callback) => {
		             if (!value) {
		                 return callback(new Error('手机号不能为空'));
		             } else if (!/^1[34578]\d{9}$/.test(value)) {
		                 callback('手机号格式不正确');
		             } else {
		                 callback();
		             }   
		         };
		return {
			ruleValidata: {
				phone: [{required: true,trigger: 'blur',validator:validatePhone}]
			},
			formData: {
				oldPhone: '',
				phone:''
			},
			showModal: false,
			loading: true,
			spinShow:false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {};
			userinfo(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData.oldPhone = res.data.phone;
					
				}else{
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false
			});
		},
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
				this.$emit('safety-closed',0);
			}
		}
	},
	mounted() {
		this.getRow();
	}
};
</script>
