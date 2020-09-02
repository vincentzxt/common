<template>
	<div>
	<Modal v-model="showEditModal" title="编辑用户" :loading="loadingEdit" :mask-closable="false"  width="60%"  :styles="{top: '20px'}" class="cutomer-modal-box" @on-ok="handleSubmit">
		<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top">
			<Card dis-hover :bordered="false" :padding="5">
			<Row :gutter="16">
				<Col span="12">
					<FormItem prop="name" label="用户名"><Input type="text" v-model="formData.name" placeholder="请输入用户名"  /></FormItem>
				</Col>
				<Col span="12">
					<FormItem prop="realname" label="姓名"><Input type="text" v-model="formData.realname" placeholder="请输入姓名"  /></FormItem>
				</Col>
			</Row>
			<Row :gutter="16">
				<Col span="12">	
				    <FormItem prop="phone" label="手机号"><Input type="text" v-model="formData.phone" placeholder="请输入手机号"  /></FormItem>
				</Col>
				<Col span="12">
					<FormItem prop="password" label="密码"><Input type="password" v-model="formData.password" placeholder="请输入密码"  /></FormItem>
				</Col>
			</Row>
			<Row :gutter="16">	
				<Col span="12">	
					<FormItem prop="role_id" label="用户角色">
						<Select v-model="formData.role_id" clearable>
							<Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">	
					<FormItem prop="group_id" label="用户组">
						<Select v-model="formData.group_id" clearable>
							<Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row :gutter="16">
				<Col span="24">	
					<FormItem prop="remark" label="描述"><Input type="textarea" :rows="4" v-model="formData.remark"  /></FormItem>
				</Col>
			</Row>
		  </Card>	
		</Form>	
		<Spin size="large" fix v-if="spinShow"></Spin>
	</Modal>
	
	</div>
</template>

<script>
import { editUser, getUserById } from '@/api/setting/auth';
import { getRole } from '@/api/common/global';
import { getUserGroup } from '@/api/setting/userGroup';
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
				role_id: [{required: true, message: '用户角色不能为空', trigger: 'blur' }],
				group_id: [{required: true, message: '用户组不能为空', trigger: 'blur' }],
				remark: { min: 1, max: 128, message: '长度不得超过128个字符', trigger: 'blur' }
			},
			formData: {
				id:0,
				name: '',
				realname: '',
				phone: '',
				password: '',
				role_id: '',
				group_id: '',
				remark: ''
			},
			roleList: [],
			groupList: [],
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
						this.formData = res.data;
						//this.formData.roleId = res.data.role_id
						//this.formData.groupId = res.data.group_id
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
		loadUserGroupList() {
			const senddata = {page:1,pagesize:20};
			getUserGroup(senddata).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.groupList = res.data.result;
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
				this.loadUserGroupList();
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