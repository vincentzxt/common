<template>
	<div>
	<Modal v-model="showModal" title="新增用户组" :loading="loadingAdd" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
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
import { addUserGroup} from '@/api/setting/userGroup';
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
				name: [{ required: true, message: '用户组名称不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '用户组名称长度不能超过32个字符', trigger: 'blur' }]
			},
			formData: {
				name: '',
				remark: '',
				project_limit:[]
			},
			list: [],
			showModal: false,
			loadingAdd: true,
			spinShow:false
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addUserGroup(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("用户组添加成功！");
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
		loadData() {
			this.spinShow = true;
			const senddata ={};
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
		this.loadData();
	}
};
</script>
<style lang="less">
	.project-box {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
		font-size: 12px;
		color: #999999;
		position:relative;
		.project-icon {
			background-color: #F2F2F2;
			width: 35px;
			height: 35px;
			line-height: 35px;
			color: #666666;
			text-align: center;
		}
		.project-content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// justify-items: center;
			.title {
				color: #000000;
				font-weight: 600;
			}
		}
		.project-check{
			position:absolute;
			right: 0;
			top:8px	
		}
	}
</style>	