<template>
	<div>
		<Modal v-model="showModal" title="新增模板" :loading="loadingAdd" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit"  class="cutomer-modal-box-gay modal-no-padding">
			<div class="modal_tool">
					<xwTag :items="menuItem" :currentIndex="currentMenu" @item-click="handleSelectTag"></xwTag>
			</div>
		<div class="modal-content" v-show="currentMenu==0">	
				<Card dis-hover class="ivu-mb-8" v-for="(item ,index) in parmList">
							<p slot="title">{{item.title }}</p>
				<Button v-for="(item2,index2) in item.list" class="ivu-mb-8 ivu-mr-8" @click="handleCopy(item2.parm_name)">{{item2.parm_name}}</Button>
				</Card>		
		</div>	
		<div class="modal-content" v-show="currentMenu==1">
			<Form ref="form" :model="formData"  label-position="top">
				<Card dis-hover :bordered="false" class="ivu-mb-8">
					<Row :gutter="16">
						<Col span="12">
						<FormItem prop="name" label="合同打印模版名称"  :rules="{required: true, pattern: /.+/, message: '请输入合同打印模版名称', trigger: 'blur'}">
							<Input type="text" v-model="formData.name"  placeholder="请输入合同打印模版名称" />
						</FormItem>
						</Col>
						<Col span="24">
							<FormItem prop="file_path" label="上传模版"  :rules="{required: true, pattern: /.+/, message: '请上传合同模版'}">
							<Upload
								:multiple="false"
								type="drag"
								:headers="headers"
								:accept="accept"
								:action="uploadUrl"
								:on-success="handleUploadSuccess"
								>
								<div style="padding: 20px 0">
									<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
									<p>将文档拖拽至虚线框内或点击上传文档只支持doc, docx格式</p>
								</div>
							</Upload>
							</FormItem>
						</Col>	
					</Row>
					</Card>
			</Form>
		</div>	
			
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Modal>
	</div>
</template>

<script>

import { parmContractTemplate,addContractTemplate } from '@/api/setting/setting';
import Setting from '@/setting';
import xwTag from '@/components/xw-tag';
import util from '@/libs/util'
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
	components: {xwTag},
	data() {
		return {
			ruleValidata: {
				name: { required: true, message: '合同打印模版名称', trigger: 'blur' },
			},
			formData: {
				file_path:'',
				type:1,
				name:''
			},
			headers:{},
			uploadUrl:'',
			accept:'.docx',
			currentMenu:0,
			parmList:[],
			menuItem:['基本信息','上传合同模板'],
			showModal: false,
			loadingAdd: true,
			spinShow: false
		};
	},
	methods: {
		handleCopy(val){
			this.$Copy({
				text: val
			});	
		},
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addContractTemplate(senddata).then(res => {
						if (res.code === 200) {
							this.$Message.success("新增合同模板成功！");
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
		loadParm() {
			this.spinShow = true;
			const senddata = {type:1,page: 1,pagesize: -1};
			parmContractTemplate(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.parmList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false;
			});
		},
		handleUploadSuccess(res, file){
			this.formData.file_path = res.data.path;
		},
		handleSelectTag(val){
		    this.currentMenu = val.currentIndex;
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
		this.loadParm();
		this.uploadUrl = Setting.apiBaseURL+'/api/common/upload/file';
		this.headers.Authorization = 'Bearer ' + util.cookies.get('token');
	}
};
</script>
