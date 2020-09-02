<template>
	<div>
	<Modal v-model="showEditModal" title="编辑用户" :loading="loadingEdit" :mask-closable="false" :width="650" @on-ok="handleSubmit">
		<Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100" label-position="right">
			<FormItem prop="name" label="用户名"><Input type="text" v-model="formData.name" placeholder="请输入用户名"  disabled/></FormItem>
			<FormItem prop="realname" label="姓名"><Input type="text" v-model="formData.realname" placeholder="请输入姓名"  /></FormItem>
			<FormItem prop="phone" label="手机号"><Input type="text" v-model="formData.phone" placeholder="请输入手机号"  /></FormItem>
			<FormItem prop="roleId" label="用户角色">
				<Select v-model="formData.roleId" clearable style="width:200px">
					<Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="remark" label="描述"><Input type="textarea" :rows="2" v-model="formData.remark" /></FormItem>
		</Form>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</Modal>
	
	</div>
</template>

<script>
import { editUser, getUserById } from '@/api/setting/auth';
import { getRole } from '@/api/common/global';

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
			ruleValidata: {
				name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '用户名长度不能超过32个字符', trigger: 'blur' }],
				realname: [{ required: true, message: '姓名不能为空', trigger: 'blur' }, { min: 1, max: 10, message: '姓名长度不能超过10个字符', trigger: 'blur' }],
				phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
				roleId: [{required: true, message: '用户角色不能为空'}],
				remark: { min: 1, max: 128, message: '长度不得超过128个字符', trigger: 'blur' }
			},
			formData: {
				id:0,
				name: '',
				realname: '',
				phone: '',
				password: '',
				// roleId: 0,
				remark: ''
			},
			roleList: [],
			showEditModal: false,
			loadingEdit: true,
			spinShow: true
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = this.templateData;
			getUserById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						res.data.roleId = res.data.role_id
						this.formData = res.data;
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					// 异常情况
				});
		},
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					console.log(senddata);
					editUser(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("用户编辑成功！");
								this.loadingEdit = false;
								this.$nextTick(() => {
									this.loadingEdit = true;
									this.$emit('edit-closed',1);
								});
							} else {
								this.$Message.error(res.message);
							}
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
							});
						})
						.catch(err => {
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
							});
							// 异常情况
						});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingEdit = false; //改变loading状态
					this.$nextTick(() => {
						//在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
						this.loadingEdit = true;
					});
				}
			});
		},
		loadRoleList() {
			const senddata = {};
			getRole(senddata).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.roleList = res.data;
				} else {
					this.$Message.error(res.message);
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
				this.loadRoleList();
				this.getRow()
				
			}
		},
		showEditModal(val) {
			if (!val) {
				this.$emit('edit-closed',0);
			}
		}
	},
	mounted() {
		this.formData = this.templateData;
	}
};
</script>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>