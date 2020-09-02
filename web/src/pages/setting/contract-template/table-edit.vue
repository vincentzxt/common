<template>
	<div>
		<Modal v-model="showEditModal" title="编辑项目" :loading="loadingEdit" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
			<Form ref="form" :model="formData" :rules="ruleValidata" label-position="top">
			<Card dis-hover class="ivu-mb-8">
				<p slot="title">基本信息</p>
						<Row :gutter="24">
							<Col span="12">
								<FormItem prop="proj_name" label="项目名称">
									<Input type="text" v-model="formData.proj_name" placeholder="请输入项目名称"  />
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem prop="proj_type" label="项目类型">
									<Select v-model="formData.proj_type" placeholder="选择项目类型" filterable>
										<Option v-for="item in typeList" :value="item.dict_value" :key="item.id">{{ item.dict_value }}</Option>
									</Select>
								</FormItem>
							</Col>
							<Col span="12" style="display:flex;">
								<FormItem prop="proj_province_id" label="项目省份">
									<Select v-model="formData.proj_province_id" placeholder="选择省份" filterable @on-change="handleProvinceChange">
										<Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
									</Select>
								</FormItem>
								<FormItem prop="proj_city_id" label="项目城市">
									<Select v-model="formData.proj_city_id" placeholder="选择城市" filterable :disabled="cityDisable" @on-change="handleCityChange">
										<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
									</Select>
								</FormItem>
								<FormItem prop="proj_district_id" label="项目区域">
									<Select v-model="formData.proj_district_id" placeholder="选择区域" filterable :disabled="districtDisable">
										<Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
									</Select>
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="项目地址">
									<Input type="text" v-model="formData.proj_addr" placeholder="项目地址"  />
								</FormItem>
							</Col>
						</Row>
				</Card>
				<Card dis-hover class="ivu-mb-8">
					<p slot="title">项目建筑信息</p>
						<Row :gutter="24">
							<Col span="12">
								<FormItem label="管理面积(m2)">
									<Input type="text" v-model="formData.proj_occupy" placeholder="请输入管理面积"  />
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="建筑面积(m2)">
									<Input type="text" v-model="formData.proj_buildarea" placeholder="请输入建筑面积"  />
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="使用面积(m2)">
									<Input type="text" v-model="formData.proj_usablearea" placeholder="请输入使用面积"  />
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="容积率">
									<Input type="text" v-model="formData.proj_far" placeholder="请输入容积率"  />
								</FormItem>
							</Col>
						</Row>
					</Card>
				
				<Card dis-hover class="ivu-mb-8">
					<p slot="title">项目图片</p>
						<Row :gutter="24">
							<Col span="24">
								<cu-image-upload :api="uploadApi" :baseUrl="baseUrl" :defaultImage="defaultImage" @uploadImgs="handleUploadImgs"></cu-image-upload>
							</Col>
						</Row>
				</Card>
			</Form>
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Modal>
	</div>
</template>

<script>
import { getProvince, getCity, getDistrict } from '@/api/common/global';
import { getDictByType } from '@/api/setting/dict';
import { editProject, getProjectById } from '@/api/merchants/project';
import CuImageUpload from '@/components/custom/cu-image-upload';
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
	components: {
		CuImageUpload
	},
	data() {
		return {
		ruleValidata: {
				proj_name: { required: true, message: '项目名称不能为空', trigger: 'blur' },
			},
			formData: {
				id: '',
				proj_name: '',
				proj_type: '',
				proj_province_id: '',
				proj_city_id: '',
				proj_district_id: '',
				proj_addr: '',
				proj_occupy: '',
				proj_buildarea: '',
				proj_usablearea: '',
				proj_far: '',
				proj_pic: '',
				is_valid: 1
			},
			provinceList: [],
			cityList: [],
			districtList: [],
			typeList: [],
			showEditModal: false,
			loadingEdit: true,
			spinShow: false,
			cityDisable: false,
			districtDisable: false,
			baseUrl: 'http://wuye-oss.oss-cn-beijing.aliyuncs.com/',
			uploadApi: '//wy.zy.com/api/common/upload/img',
			defaultImage: [],
			imageLoading: false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = this.templateData;
			getProjectById(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData = res.data;
					this.getCityList(this.formData.proj_province_id);
					this.getDistrictList(this.formData.proj_city_id);
					if (this.formData.proj_pic) {
						for (let item of this.formData.proj_pic.split(',')) {
							this.defaultImage.push(
								{
									response: { data: { path: item } }
								}
							)
						}
					}
					this.imageLoading = true;
				}else{
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false
			});
		},
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					editProject(senddata).then(res => {
						if (res.code === 200) {
							this.$Message.success("项目编辑成功！");
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
								this.$emit('edit-closed',1);
							});
						} else {
							this.$Message.error(res.message);
							this.loadingEdit = false;
							this.$nextTick(() => {
								this.loadingEdit = true;
							});
						}
					
					}).catch(err => {
						this.loadingEdit = false;
						this.$nextTick(() => {
							this.loadingEdit = true;
						});
					});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingEdit = false; 
					this.$nextTick(() => {
						this.loadingEdit = true;
					});
				}
			});
		},
		getProvinceList() {
			this.spinShow = true;
			getProvince().then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.provinceList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		getCityList(id) {
			this.spinShow = true;
			let senddata = {
				id: id
			}
			getCity(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.cityList = res.data;
					this.cityDisable = false;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		getDistrictList(id) {
			this.spinShow = true;
			let senddata = {
				id: id
			}
			getDistrict(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.districtList = res.data;
					this.districtDisable = false;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		getTypeDict() {
			this.spinShow = true;
			const sendData = {
				dict_key: 'proj_type',
				pagesize: -1
			};
			getDictByType(sendData).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.typeList = res.data.result;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		handleUploadImgs(list) {
			this.proj_pic = '';
			let picList = [];
			for (let item of list) {
				picList.push(item.response.data.path);
			}
			this.formData.proj_pic = picList.join(',');
		},
		handleProvinceChange (id) {
			console.log("#####");
			console.log(id);
			if(id){
				this.getCityList(id);
			}
		},
		handleCityChange (id) {
			if(id){
				this.getDistrictList(id);
			}	
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
				this.getRow();
				this.getProvinceList();
				this.getTypeDict();
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

