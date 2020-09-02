<template>
	<div>
		<Modal v-model="showEditModal" title="编辑客户" :loading="loadingEdit" :scrollable="true" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay modal-no-padding">
			<div class="modal_tool">
				<xwTag :items="menuItem" :currentIndex="currentMenu" @item-click="handleSelectTag"></xwTag>
			
			</div>
			<div class="modal-content" v-show="currentMenu==0">
			<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top">
				<Card dis-hover class="ivu-mb-8">
					<p slot="title">基本信息</p>
					<Row :gutter="16">
						<Col span="6">
							<FormItem prop="cus_name" label="客户名称"><Input type="text" v-model="formData.cus_name" placeholder="请输入客户名称" clearable /></FormItem>
						</Col>
						<Col span="6">
							<FormItem  label="行业">
								<Select v-model="formData.cus_industry" filterable clearable placeholder="请选择行业">
									<Option v-for="item in dictList.industry" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
						<FormItem  label="单位性质">
								<Select v-model="formData.cus_nature" filterable clearable placeholder="请选择单位性质">
									<Option v-for="item in dictList.cus_nature" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="proj_id" label="来访项目" :rules="{required: true, message: '请选择来访项目',pattern: /.+/,  type: 'number',trigger: 'change'}">
								<Select v-model="formData.proj_id" placeholder="请选择来访项目" filterable label-in-value @on-change="handleProjectChange">
									<Option v-for="item in projectList" :value="item.id" :key="item.id" :label="item.proj_name"></Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row :gutter="16">	
						<Col span="6">
							<FormItem prop="cus_visit_date" label="首访日期"  :rules="{required: true, message: '请输入首访日期', trigger: 'blur'}">
								<DatePicker :value="formData.cus_visit_date" type="date" v-width="'100%'" placeholder="请选择日期" @on-change="formData.cus_visit_date=$event"/>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_belong_uid"  label="跟进人" :rules="{required: true, message: '请选择跟进人',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.cus_belong_uid" filterable clearable placeholder="请选择跟进人"  @on-change="handleUserChange">
									<Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.realname }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_level" label="客户等级">
								<Select v-model="formData.cus_level" filterable clearable placeholder="请选择等级">
									<Option v-for="item in dictList.cus_level" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_state" label="客户状态">
								<Select v-model="formData.cus_state" filterable clearable placeholder="请选择状态">
									<Option v-for="item in dictList.cus_state" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem  label="客户成交率">
								<Slider v-model="formData.deal_rate"></Slider>
							</FormItem>
						</Col>
					</Row>
				</Card>
				<Card dis-hover class="ivu-mb-8">
					<p slot="title">渠道信息</p>
				    <Row :gutter="16">
							<Col span="8">
						 		<FormItem prop="channel_id"  label="渠道名称"  :rules="{required: true, message: '请选择渠道',pattern: /.+/, type: 'number',trigger: 'change'}">
									<Select v-model="formData.channel_id" filterable clearable placeholder="请选择渠道" @on-change="handleChannelChange">
						    		<Option v-for="item in channelList" :value="item.id" :key="item.id">{{ item.channel_name }}</Option>
									</Select>
								</FormItem>
							</Col>
							<Col span="8">
						 		<FormItem  label="渠道联系人">
									<Input type="text" v-model="formData.channel_contact" />
								</FormItem>
							</Col>
							<Col span="8">
						 		<FormItem  label="联系人电话">
									<Input type="text" v-model="formData.channel_contact_phone" />
								</FormItem>
							</Col>
						</Row>
				</Card>
				<Card dis-hover class="ivu-mb-8">
						<p slot="title">联系人</p>
						<a href="#" slot="extra" @click.prevent="handleContactAdd">
						  <Icon type="md-add"></Icon>增加</a>
						 <div v-for="(item,index) in formData.customer_contact" class="ivu-mb-16 add_box">
						<Icon type="ios-close" class='del_item' size="30" @click="handleContactRemove(index)"/>
						 <Row :gutter="16">
						 	<Col span="6">
						 	 <FormItem  :key="index"  :prop="'customer_contact.' + index + '.contact_name'" label="姓名" :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
								<Input type="text" v-model="item.contact_name"  placeholder="请输入姓名"></Input>
							 </FormItem>
						 	</Col>
							<Col span="6">
							 <FormItem  :key="index"  :prop="'customer_contact.' + index + '.contact_phone'" label="电话" :rules="{required: true, message: '电话不能为空',pattern: /.+/, trigger: 'blur'}">
								 <Input type="text" v-model="item.contact_phone"  placeholder="请输入电话"></Input>
							 </FormItem>
							</Col>
							<Col span="6">
							 <FormItem  :key="index"  label="岗位">
								 <Input type="text" v-model="item.contact_role"  placeholder="请输入岗位"></Input>
							</FormItem>
							</Col>
						 </Row>  
						  </div>
				</Card>
			
				<Card dis-hover class="ivu-mb-8">
			 		<p slot="title">租赁需求</p>
			 		<Row :gutter="16">
				 		<Col span="6">
				 			<FormItem label="需求面积">
								<Select v-model="formData.customer_extra.demand_area" filterable  placeholder="请选择面积">
									<Option v-for="item in dictList.demand_area" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
				 			</FormItem>
						</Col>
						<Col span="6">
						 <FormItem prop="customer_extra.purpose_price" label="预算价格" :rules="{type: 'string',pattern: /^([1-9]\d*)(\.\d+)?$/, message: '请输入最多两位小数的数字', trigger: 'blur'}">
									<Input type="text"  v-model="formData.customer_extra.purpose_price"  placeholder="请输入预算价格"><span slot="append">元/m²·天</span></Input></FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_worker_num" label="办公人数" :rules="{type:'number',pattern: /^[1-9]+[0-9]*$/, message: '请输入整数', trigger: 'blur'}">
								<Input type="text" v-model="formData.cus_worker_num" placeholder="请输入办公人数"  />
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_level" label="装修要求">
								<Select v-model="formData.customer_extra.trim_state" filterable  placeholder="请选择装修规格">
									<Option v-for="item in dictList.trim_state" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row :gutter="16">
						<Col span="6">
							<FormItem label="意向租期">
								<Input type="text" v-model="formData.customer_extra.purpose_term_lease" placeholder="请输入意向租期"><span slot="append">年</span></Input>
							</FormItem>
						</Col>
					</Row>
				</Card>
				<Card dis-hover class="ivu-mb-8">
				<p slot="title">意向房源</p>
					<a href="#" slot="extra" @click.prevent="handleOpenHouse">
						<Icon type="md-add"></Icon>
						选择房源
					</a>
					<div class="empty-info" v-if="formData.customer_room.length==0">暂无房源信息</div>
					<div class="i-table-no-border" v-if="formData.customer_room.length > 0">
						<Table :columns="roomColumns" :data="formData.customer_room"></Table>
					</div>
				</Card>

				 <Card dis-hover class="ivu-mb-8">
					<p slot="title">客户现状</p>
				    <Row :gutter="16">
							<Col span="6">
						 		<FormItem  label="当前项目">
									<Input type="text" v-model="formData.customer_extra.current_proj" placeholder="请输入项目"  />
								</FormItem>
							</Col>
							<Col span="6">
						 		<FormItem  label="当前办公地址">
									<Input type="text" v-model="formData.customer_extra.current_addr" placeholder="请输入办公地址" />
								</FormItem>
							</Col>
							<Col span="6">
						 		<FormItem label="当前面积" >
									<Input type="text" v-model="formData.customer_extra.current_area" placeholder="请输入面积" />
								</FormItem>
							</Col>
							<Col span="6">
						 		<FormItem label="当前单价">
									<Input type="text" v-model="formData.customer_extra.current_price" placeholder="请输入单价" />
								</FormItem>
							</Col>
						</Row>
				</Card>
			</Form>
			</div>
			<div class="modal-content" v-show="currentMenu==1">
				<Form ref="form2" :model="formData" :rules="ruleValidata"  label-position="top">
					<Card dis-hover class="ivu-mb-8">
						<p slot="title"></p>
						<a href="#" slot="extra" @click.prevent="handleBusiness">同步工商信息</a>
						<Row :gutter="16">
							<Col span="12">
								<FormItem label="注册公司名称"><Input type="text" v-model="formData.business_info.name" placeholder="请输入注册公司名称"  /></FormItem>
							</Col>
							<Col span="12">
								<FormItem label="信用代码"><Input type="text" v-model="formData.business_info.creditCode" placeholder="请输入信用代码"  /></FormItem>
							</Col>
						</Row>
					
						<Row :gutter="16">
							<Col span="12">
								<FormItem label="注册资本（万元）"><Input type="text" v-model="formData.business_info.regCapital" placeholder="请输入注册资本（万元）"  /></FormItem>
							</Col>
							<Col span="12">
								<FormItem label="行业"><Input type="text" v-model="formData.business_info.industry" placeholder="请输入行业"  /></FormItem>
							</Col>
						</Row>
						<Row :gutter="16">	
							<Col span="12">
								<FormItem label="法人"><Input type="text" v-model="formData.business_info.legalPersonName" placeholder="请输入法人"  /></FormItem>
							</Col>
							<Col span="12">
								<FormItem label="企业状态"><Input type="text" v-model="formData.business_info.regStatus" placeholder="企业状态"  /></FormItem>
							</Col>
						</Row>
						<Row :gutter="16">
							<Col span="12">
								<FormItem label="人员规模" p><Input type="text" v-model="formData.business_info.staffNumRange" placeholder="请输入人员规模"  /></FormItem>
							</Col>
							<Col span="12">
								<FormItem label="成立日期">
									<DatePicker :value="formData.business_info.estiblishTime" type="date" v-width="'100%'" placeholder="请选择日期" @on-change="formData.business_info.estiblishTime=$event"/>
								</FormItem>
							</Col>
						</Row>
						<Row :gutter="16">
							<Col span="24">
								<FormItem label="注册地址"><Input type="text" v-model="formData.business_info.regLocation" placeholder="请输入注册地址"  /></FormItem>
							</Col>
							
							<Col span="24">
								<FormItem  label="经营范围"><Input type="textarea" :rows="4" v-model="formData.business_info.businessScope" placeholder="请输入经营范围"  /></FormItem>
							</Col>
						</Row>
					</Card>
				</Form>	
			</div>
			<Spin size="large" fix v-if="spinShow"></Spin>
			<houseSelect v-if="loadHouse" v-model="houseModalStatus" @house-add="handleHouseAdd"  @house-closed="handleCloseHouse"></houseSelect>
		</Modal>
	</div>
</template>

<script>
import { getProjectAll,getChannelAll, getDictAll } from '@/api/common/global';
import { editCustomer,getCustomerById,getBaseInfo} from '@/api/merchants/customer';
import { getUser } from '@/api/setting/auth';
import  houseSelect from '@/components/house-select';
import { mapState, mapGetters } from 'vuex';
import xwTag from '@/components/xw-tag';
export default {
	name: 'table-edit',
	components: {
		houseSelect,
		xwTag
	},
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
				cus_name: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }, { min: 1, max:64, message: '客户名称长度不能超过64个字符', trigger: 'blur' }]
			},
			currentMenu:0,
			menuItem:['基本信息','工商信息'],
			formData: {
				cus_belong_uid:'',
				cus_name: '',
				cus_industry:'',
				cus_visit_date:'',
				cus_level:'',
				cus_type:1,
				cus_state:'',
				cus_nature:'',
				deal_rate: 50,
				customer_contact: [
					{
						contact_name: '',
						contact_phone: '',
						contact_role: ''
					}
				],
				customer_extra:{
					current_proj: '',
					current_addr: '',
					current_area: '',
					current_price: '',
					demand_area: '',
					purpose_price: '',
					trim_state: '',
					purpose_term_lease:''
				},
				business_info:{
					name:'',
					creditCode:'',
					regCapital:'',
					industry:'',
					legalPersonName:'',
					regStatus:'',
					taffNumRange:'',
					estiblishTime:'',
					regLocation:'',
					businessScope:''
				},
				channel_name: '',
				channel_contact: '',
				channel_contact_phone: '',
				customer_room:[]
			},
			dictList: {},
			index: 1,
			channelList: [],
			contactList: [],
			projectList: [],
			userList:[],
			contactDisable: true,
			roomColumns:[
				{
				 title: '楼宇',
				 key: 'build_no',
				 render: (h, params) => {
				 	return h('div', params.row.proj_name+'-'+params.row.build_no)
				 }
				},
				{
				 title: '楼层',
				 key: 'floor_no'
				},
				{
				 title: '房号',
				 key: 'room_no'
				},
				{
				 title: '面积',
				 key: 'room_area',
				 render: (h, params) => {
				 	return h('div', params.row.room_area+'m²')
				 }
				}
			],
			showEditModal: false,
			loadingEdit: true,
			spinShow:false,
			loadHouse:false,
			houseModalStatus:false,
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = this.templateData;
			getCustomerById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					// 异常情况
				});
		},
		handleSelectTag(val){
			this.currentMenu = val.currentIndex;
			// this.$refs.form.validate(valid => {
			// 	if (valid) {
			// 		this.currentMenu = val.currentIndex;
			// 	}else{
			// 		this.$Message.error('请先检查基本信息必填项是否填写完整！');
			// 	}
			// })	
		            
		},
		handleBusiness(){
			if(this.formData.cus_name==""){
				this.$Message.error('请先输入客户名称！');
				return;
			}
			this.spinShow = true;
			const senddata ={
				cus_name:this.formData.cus_name
			};
			getBaseInfo(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData.business_info = res.data;
				} else {
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
					editCustomer(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("客户编辑成功！");
								this.loadingEdit = false;
								this.$nextTick(() => {
									this.loadingAdd = true;
									this.$emit('edit-closed',1);
								});
							} else {
								this.$Message.error(res.message);
								this.loadingEdit = false;
								this.$nextTick(() => {
									this.loadingEdit = true;
								});
							}
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
		getDictList() {
			this.spinShow = true;
			const senddata ={
				page:1,
				pagesize:-1
			};
			getDictAll(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.dictList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false
			});
		},
		getChannelList() {
			this.spinShow = true;
			getChannelAll().then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.channelList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		getProjectList() {
			this.spinShow = true;
			const sendData={
				limit:1 
			};
			getProjectAll(sendData).then(res => {
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
		getUserList() {
			this.spinShow = true;
			const senddata ={
				page:1,
				pagesize:-1
			};
			getUser(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.userList = res.data.result;
				} else {
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false;
			})
		},
		handleChannelChange(val) {
			const filteChannel = this.channelList.filter(item=>item.id==val);
			if(filteChannel.length>0){
				this.formData.channel_name= filteChannel[0].channel_name;
				this.formData.channel_id= filteChannel[0].id;
				// this.formData.channel_contact = filteCustomer[0].channel_contact;
			}
		},
		handleUserChange(val) {
			const filteUser = this.userList.filter(item=>item.id==val);
			if(filteUser.length>0){
				this.formData.cus_belong_user= filteUser[0].realname;
			}
		},
		handleContactAdd () {
			   this.formData.customer_contact.push({
				  contact_name: '',
				  contact_phone: '',
				  contact_role: ''
			   });
		},
		handleContactRemove(index){
			this.formData.customer_contact.splice(index,1)
		},	
		handleDateChange (date) {
			this.formData.cus_visit_date = date
		},
		handleProjectChange(val) {
			this.formData.proj_name = val.label;
		},
		//打开房源选择界面
		handleOpenHouse(row) {
			this.loadHouse = true;
			this.$nextTick(() => {
				this.houseModalStatus = true;
			});
		},
		//房源选择关闭
		handleCloseHouse() {
			this.houseModalStatus = false;
			this.$nextTick(() => {
				this.loadHouse = false;
			});
			
		},
		//房源更新
		handleHouseAdd(val){
			this.formData.customer_room = val.roomselectedList;
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
		this.getDictList();
		this.getChannelList();
		this.getUserList();
		this.getProjectList();
	},
	computed: {
	    ...mapState('admin/user', [
	        'info'
	    ])
	}
};
</script>
<style lang="less">
	.add_box{
		position: relative;
		padding-top: 15px;
	}
	
</style>	