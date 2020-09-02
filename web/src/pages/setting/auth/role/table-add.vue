<template>
	<div>
	<Modal v-model="showModal" title="新增角色" :loading="loadingAdd" :mask-closable="false" width="70%"  :styles="{top: '20px'}"  class="cutomer-modal-box-gay" @on-ok="handleSubmit">
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
import { addRole } from '@/api/setting/role';
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
				name: [{ required: true, message: '角色不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '用户名长度不能超过32个字符', trigger: 'blur' }],
			},
			formData: {
				name: '',
				menu_list:'',
				remark: ''
			},
			headerList:[],
			menuList:[],
			showModal: false,
			loadingAdd: true,
			spinShow:false
		};
	},
	methods: {
		handleSubmit() {
			if(this.menuList.length==0){
				this.$Message.error('权限配置列表为空！');
				return;
			}
			this.$refs.form.validate(valid => {
				if (valid) {
					this.formData.menu_list = this.menuList.join(",");
					const senddata = this.formData;
					addRole(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("角色添加成功！");
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
		console.log(this.menuSider);
		console.log(this.filterHeader);
	},
	computed: {
	    ...mapGetters('admin/menu', [
	        'filterHeader'
	    ]),
		...mapState('admin/menu', [
		    'menuSider'
		])
	},
};
</script>

<style lang="less">
.role-auth-box{
	.ivu-checkbox-wrapper{
		font-size: 14px;
	}
	font-size: 14px;
	.header-title{
		font-size:14px;
		margin-bottom:10px;
	}


	.menu-item{
		margin-bottom: 10px;
		.check-box{
			margin-right: 18px;
			margin-bottom: 5px;
			color: #333333;
		}
		.menu-title{
			margin-bottom: 8px;
		}
		.menu-children{
			margin-left: 45px;
		}
	}
	
}
</style>
