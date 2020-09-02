<template>
	<div>
	<Modal v-model="showEditModal" title="编辑用户组" :loading="loadingEdit" :mask-closable="false"  width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit"   class="cutomer-modal-box-gay">
			<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top">
			<Card dis-hover class="ivu-mb-8">
					<p slot="title">用户组信息</p>
				<Row :gutter="16">
					<Col span="8">
						<FormItem prop="name" label="名称"><Input type="text" v-model="formData.name" placeholder="请输入用户组名称"  /></FormItem>
					</Col>	
					<Col span="16">
						<FormItem prop="remark" label="描述"><Input type="text"  v-model="formData.remark"  /></FormItem>
					</Col>	
				</Row>	
			</Card>
			<Card dis-hover style="min-height:350px">
			    <p slot="title">选择项目</p>
				 <Row :gutter="8">
					 <CheckboxGroup v-model="formData.project_limit">
				        <Col span="8" v-for="(item, index) in list" :key="index">
							<div class="project-box ivu-b">
							<div class="project-icon"><Icon type="logo-buffer" /></div>
							<div class="project-content">
								<span class="title">{{item.proj_name}}</span>
							</div>
							<Checkbox  :label="item.id" class="project-check"><span></span></Checkbox>
							</div>
						</Col>
					</CheckboxGroup>
				    </Row>
			</Card>
			</Form>	
		<Spin size="large" fix v-if="spinShow"></Spin>
	</Modal>
	
	</div>
</template>

<script>
import { editUserGroup, getUserGroupById } from '@/api/setting/userGroup';

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
				name: [{ required: true, message: '用户组名称不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '用户组名称长度不能超过32个字符', trigger: 'blur' }]
			},
			formData: {
				id:0,
				name: '',
				project_limit:[],
				remark: ''
			},
			list:[],
			showEditModal: false,
			loadingEdit: true,
			spinShow: true
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = this.templateData;
			getUserGroupById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
						if(this.formData.project_limit!==''){
						const project_limit =this.formData.project_limit.split(",");
						this.formData.project_limit =  project_limit.map(function(item,index){return parseInt(item)});
						}else{
							this.formData.project_limit=[];
						}
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					// 异常情况
				});
		},
		loadProjData() {
			const senddata = {};
		},
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					editUserGroup(senddata)
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
				this.loadProjData();
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