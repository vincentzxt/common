<template>
	<div>
		<Modal v-model="showModal" title="新增场馆" :loading="loadingAdd" :mask-closable="false" width="70%" :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
				<Form ref="form" :model="formData" :rules="ruleValidata" label-position="top" style="background-color:#f6f7f9;">
					<Card dis-hover class="ivu-mb-8">
						<p slot="title">基本信息</p>
							<Row :gutter="24">
								<Col span="12">
									<FormItem prop="proj_id" label="项目名称" :rules="{required: true, message: '请选择项目名称', pattern: /.+/, type: 'number',trigger: 'change'}">
										<Select v-model="formData.proj_id" placeholder="请选择项目" filterable @on-change="handleProjChange">
											<Option v-for="item in projectList" :value="item.id" :key="item.id">{{item.proj_name}}</Option>
										</Select>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="venue_name" label="场馆名称">
										<Input type="text" v-model="formData.venue_name" placeholder="请输入场馆名称"  />
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="venue_area"  label="场馆面积">
										<Input type="text" v-model="formData.venue_area" placeholder="请输入场馆地址"  />
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="venue_capacity"  label="容纳人数">
										<Input type="text" v-model="formData.venue_capacity" placeholder="请输入容纳人数"  />
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="venue_price" label="参考单价(元/天)" :rules="{type: 'string',pattern: /^([1-9]\d*)(\.\d+)?$/, message: '请输入最多两位小数的数字', trigger: 'blur'}">
										<Input type="text" v-model="formData.venue_price" placeholder="请输入参考单价"  />
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="场馆地址">
										<Input type="text" v-model="formData.venue_addr" placeholder="请输入场馆地址"  />
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="场馆简介">
										<Input type="textarea" :rows=3 v-model="formData.venue_content" placeholder="请输入场馆简介"  />
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="场馆设施">
										<Input type="textarea" :rows=3 v-model="formData.venue_facility" placeholder="请输入场馆设施"  />
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="备注">
										<Input type="textarea" :rows=3 v-model="formData.remark" placeholder="请输入备注"  />
									</FormItem>
								</Col>
							</Row> 
							</Card>	
								<Card dis-hover class="ivu-mb-8">
									<p slot="title">场馆图片</p>
										<Row :gutter="24">
											<Col span="24">
												<cu-image-upload v-if="showUpload" :api="uploadApi" :baseUrl="baseUrl" @uploadImgs="handleUploadImgs"></cu-image-upload>
											</Col>
										</Row>
								</Card>
				</Form>	
		</Modal>
	</div>
</template>

<script>
import { addVenue } from '@/api/merchants/venue';
import { getProjectAll} from '@/api/common/global';
import CuImageUpload from '@/components/custom/cu-image-upload';
import Setting from '@/setting';
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
	components: {
		CuImageUpload
	},
	data() {
		const validateInteger = (rule, value, callback) => {
		      let regNum = /^[1-9]\d*$/;
					  if (value === '') {
							callback(new Error('请输入整数'));
					  } else if (!Number.isInteger(+value)) {
							callback(new Error('请输入整数'));
					  } else if (!regNum.test(value)) {
							callback(new Error('请输入整数'));
					  } else {
							callback();
					 }
			 };
		const validateMoney = (rule, value, callback) => {
		      let regNum = /^(([1-9]\d*)(\.\d{1,2})?)$|^(0\.0?([1-9]\d?))$/;
					  if (value === '') {
							callback(new Error('请输入最多两位小数的数字'));
					  } else if (!Number.isInteger(+value)) {
							callback(new Error('请输入最多两位小数的数字'));
					  } else if (!regNum.test(value)) {
							callback(new Error('请输入最多两位小数的数字'));
					  } else {
							callback();
					 }
			 };	
		return {
			ruleValidata: {
				venue_name: [{ required: true, message: '场馆名称不能为空', trigger: 'blur' }, { min: 1, max: 32, message: '场馆名称长度不能超过32个字符', trigger: 'blur' }],
				venue_area:[{required: true, validator: validateMoney, trigger: 'blur'}],
				venue_capacity:[{required: true, validator: validateInteger, trigger: 'blur'}],
			},
			formData: {
				proj_id:'',
				proj_name:'',
				venue_name:'',
				venue_addr:'',
				venue_area:'',
				venue_price:'',
				venue_capacity:'',
				venue_content:'',
				venue_facility:'',
				venue_pic:'',
				remark: ''
			},
			projectList:[],
			showModal: false,
			loadingAdd: true,
			spinShow: false,
			baseUrl: '',
			uploadApi: '',
			showUpload:false
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addVenue(senddata).then(res => {
						if (res.code === 200) {
							this.$Message.success("新增场馆成功！");
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
		getProjectList() {
			this.spinShow = true;
			getProjectAll().then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.projectList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		handleReset() {
			this.$refs['form'].resetFields();
		},
		handleProjChange(val){
			const filterItem = this.projectList.filter(item=>item.id==val);
			if(filterItem.length>0){
				this.formData.proj_name= filterItem[0].proj_name;
			}
		},
		handleUploadImgs(list) {
			this.venue_pic = '';
			let picList = [];
			for (let item of list) {
				picList.push(item.url);
			}
			this.formData.venue_pic = picList.join(',');
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
		this.showUpload=true;
		this.getProjectList();
		this.uploadApi = Setting.apiBaseURL+'/api/common/upload/img';
		this.baseUrl = Setting.ossURL;
		
	}
};
</script>
<style lang="less">
	.add_box{
		position: relative;
	}

</style>	