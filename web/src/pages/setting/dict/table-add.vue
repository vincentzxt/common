<template>
	<div>
	<Modal v-model="showModal" title="新增用户" :loading="loadingAdd" :mask-closable="false" :width="650" @on-ok="handleSubmit">
		<Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100" label-position="right">
			<FormItem prop="name" label="用户名"><Input type="text" v-model="formData.name" placeholder="请输入用户名"  /></FormItem>
			<FormItem prop="realname" label="姓名"><Input type="text" v-model="formData.realname" placeholder="请输入姓名"  /></FormItem>
			<FormItem prop="phone" label="手机号"><Input type="text" v-model="formData.phone" placeholder="请输入手机号"  /></FormItem>
			<FormItem prop="password" label="密码"><Input type="text" v-model="formData.password" placeholder="请输入密码"  /></FormItem>
			<FormItem prop="roleId" label="用户角色">
				<Select v-model="formData.roleId" clearable style="width:200px">
					<Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="remark" label="描述"><Input type="textarea" :rows="1" v-model="formData.remark"  /></FormItem>
		</Form>
	</Modal>
	</div>
</template>

<script>
import { addUser} from '@/api/setting/auth';
import { getRole } from '@/api/common/global';
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
			ruleValidata: {
				name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '用户名长度不能超过32个字符', trigger: 'blur' }],
				realname: [{ required: true, message: '姓名不能为空', trigger: 'blur' }, { min: 1, max: 10, message: '姓名长度不能超过10个字符', trigger: 'blur' }],
				phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
				password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 12, message: '密码长度为6-12痊', trigger: 'blur' }],
				roleId: [{required: true, message: '用户角色不能为空'}],
				remark: { min: 1, max: 128, message: '长度不得超过128个字符', trigger: 'blur' }
			},
			formData: {
				name: '',
				realname: '',
				phone: '',
				password: '',
				roleId: '',
				remark: ''
			},
			roleList: [],
			showModal: false,
			loadingAdd: true
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addUser(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("用户编辑成功！");
								this.loadingAdd = false;
								this.$nextTick(() => {
									this.loadingAdd = true;
									this.$emit('add-closed',1);
								});
							} else {
								this.$Message.error(res.message);
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
		this.loadRoleList();
	}
};
</script>
