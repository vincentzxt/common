<template>
	<div>
	<Modal v-model="showEditModal" title="编辑角色" :loading="loadingEdit" :mask-closable="false"  width="70%"  :styles="{top: '20px'}" class="cutomer-modal-box" @on-ok="handleSubmit">
				<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top">
				<Card dis-hover :bordered="true"  class="ivu-mb-16">
					<p slot="title">基本信息</p>
					<Row :gutter="16">
							<Col span="8">
								<FormItem prop="name" label="角色名称">
									<Input type="text" v-model="formData.name" placeholder="请输入角色名称"  />
								</FormItem>
							</Col>
							<Col span="16">
								<FormItem prop="remark" label="描述">
									<Input type="text" v-model="formData.remark"  />
								</FormItem>
							</Col>
					</Row>			
				</Card>
				<Card dis-hover :bordered="true">
					<p slot="title">权限管理</p>
					<CheckboxGroup v-model="menuList">
						<div class="role-auth-box ivu-mb-16"  v-for="(item1,index1) in filterHeader" :key="index1">
							<div class="header-title">{{item1.title}}</div>
							<Card dis-hover :bordered="true">
								<div class="menu-item" v-for="(item2,index2) in menuSider.filter(item=>item.header==item1.name)" :key="index2"  v-if="!item2.is_public" >
									<div class="menu-title"><Icon type="md-arrow-dropdown" size="18" class="ivu-mr-8" /><Checkbox :label="item2.menu_id" class="check-box":disabled="item2.menu_uncheck">{{item2.title}}</Checkbox></div>
									<div class="menu-children"><Checkbox :label="item3.menu_id" class="check-box"  v-for="(item3,index3) in item2.children" :key="index3" v-if="!item3.is_public" :disabled="item3.menu_uncheck" >{{item3.title}}</Checkbox></div>
								</div>
							</Card>
						</div>
					</CheckboxGroup>
				</Card>
				</Form>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</Modal>
	
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { editRole, showRole } from '@/api/setting/role';
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
				name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '角色名称长度不能超过32个字符', trigger: 'blur' }],
			},
			viewid:0,
			formData: {
				id:0,
				name: '',
				menu_list:'',
				remark: ''
			},
			headerList:[],
			menuList:[],
			roleList: [],
			groupList: [],
			showEditModal: false,
			loadingEdit: true,
			spinShow: false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const sendData = {id:this.viewid};
			console.log(sendData);
			showRole(sendData)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData.id = res.data.id;
						this.formData.name = res.data.name;
						this.formData.remark = res.data.remark;
						this.formData.menu_list = res.data.menu_list.join(",");
						this.menuList =res.data.menu_list;
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
			if(this.menuList.length==0){
				this.$Message.error('权限配置列表为空！');
				return;
			}
			this.$refs.form.validate(valid => {
				if (valid) {
					this.formData.menu_list = this.menuList.join(",");
					const senddata = this.formData;	
					editRole(senddata)
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
		this.viewid = this.templateData.id;
	},
	computed: {
	    ...mapGetters('admin/menu', [
	        'filterHeader'
	    ]),
		...mapState('admin/menu', [
		    'menuSider'
		])
	}
};
</script>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>