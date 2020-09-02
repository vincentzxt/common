<template>
	<div>
		<Modal v-model="showModal" title="发送消息" :loading="loadingAdd" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit">
					<Form ref="form" :model="formData"  label-position="left" :label-width="100">
						<Card dis-hover :bordered="false" class="ivu-mb-8">
							<Row :gutter="16">
								<Col>
								<FormItem prop="title" label="消息标题"  :rules="{required: true, pattern: /.+/, message: '请输入消息标题', trigger: 'blur'}">
									<Input type="text" v-model="formData.title"  placeholder="请输入消息标题" />
								</FormItem>
								</Col>
								<Col>
								<FormItem prop="send_type" label="接收人员"  :rules="{required: true, pattern: /.+/, message: '请选择接收人员', trigger: 'blur'}">
										<RadioGroup v-model="formData.send_type">
										        <Radio label="1">所有人</Radio>
										        <Radio label="2">按角色</Radio>
										</RadioGroup>
										<Select v-if="formData.send_type=='2'"  placeholder="请选择角色" v-model="formData.role_select" multiple >
										        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
										    </Select>
								</FormItem>
								</Col>
								<Col>
									<Card dis-hover>
										<i-quill v-model="formData.content" :min-height="400" />
									</Card>
								
								</Col>
							</Row>
						</Card>
					</form>				
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Modal>
	</div>
</template>

<script>
import iQuill from '@/components/quill';
import { sendMessage } from '@/api/setting/message';
import { getRole } from '@/api/common/global';
export default {
	name: 'table-add',
	components: { iQuill },
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
				title:'',
				content:'',
				role_select:[],
				send_type:''
			},
			roleList:[],
			currentMenu:0,
			showModal: false,
			loadingAdd: true,
			spinShow: false
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
				
					var role_id = "-1";
					if(this.formData.send_type == '2'){
						if(this.formData.role_select.length==0){
							this.$Message.error("请选择接收人员！");
							this.loadingAdd = false;
							this.$nextTick(() => {
								this.loadingAdd = true;
							});
							return;
						}
					role_id = this.formData.role_select.join(',');
					};
					
					if(this.formData.content===""){
						this.$Message.error("消息内空不能为空！");
						this.loadingAdd = false;
						this.$nextTick(() => {
							this.loadingAdd = true;
						});
						return;
					};
					const sendData = {
						title:this.formData.title,
						content:this.formData.content,
						type:1,
						role_id:role_id
					}
					sendMessage(sendData).then(res => {
						if (res.code === 200) {
							this.$Message.success("消息发送成功！");
							this.loadingAdd = false;
							this.$nextTick(() => {
								this.loadingAdd = true;
								this.$emit('add-closed',1);
							});
						} else {
							this.$Message.error(res.message);
							this.loadingAdd = false;
							this.$nextTick(() => {
								this.loadingAdd = true;
							});
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
		loadRole(){
			this.spinShow = true
			const senddata = {};
			getRole(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.roleList = res.data;
				}else{
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false
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
		this.loadRole();
	}
};
</script>
