<template>
	<div>
		<Modal v-model="showAddModal" title="新增租客" :loading="loadingAdd" :scrollable="true" :mask-closable="false" width="70%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay modal-no-padding">
			<div class="modal_tool">
			  <xwTag :items="menuItem" :currentIndex="currentMenu" @item-click="handleSelectTag"></xwTag>						
			</div>
			<div class="modal-content" v-show="currentMenu==0">
			<Form ref="form" :model="formData" :rules="ruleValidata"  label-position="top">
				<Card dis-hover class="ivu-mb-8">
					<p slot="title">基本信息</p>
					<Row :gutter="16">
						<Col span="6">
							<FormItem prop="cus_name" label="租客名称" :rules="{required: true, message: '请输入客户名称', trigger: 'blur'}"><Input type="text" v-model="formData.cus_name" placeholder="请输入客户名称" /></FormItem>
						</Col>
						<Col span="6">
							<FormItem  label="行业">
								<Select v-model="formData.cus_industry" filterable clearable placeholder="请选择行业">
									<Option v-for="item in dictList.industry" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem prop="cus_belong_uid"  label="跟进人" :rules="{required: true, message: '请选择跟进人',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.cus_belong_uid" filterable clearable placeholder="请选择跟进人"  @on-change="handleUserChange">
									<Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.realname }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
				</Card>
				<Card dis-hover class="ivu-mb-8">
						<p slot="title">联系人</p>
						<a href="#" slot="extra" @click.prevent="handleContactAdd">
						  <Icon type="md-add"></Icon>增加</a>
						 <div v-for="(item,index) in formData.customer_contact" :key="index" class="ivu-mb-16 add_box">
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
			 		<p slot="title">开票信息</p>
			 		<Row :gutter="16">
						<Col span="6">
							<FormItem label="开户银行">
								<Input type="text" v-model="formData.cus_worker_num" placeholder="请输入开户银行"  />
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem label="账号">
								<Input type="text" v-model="formData.cus_worker_num" placeholder="请输入账号"  />
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem label="电话">
								<Input type="text" v-model="formData.cus_worker_num" placeholder="请输入电话"  />
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem label="纳税人识别号">
								<Input type="text" v-model="formData.cus_worker_num" placeholder="请输入纳税人识别号"  />
							</FormItem>
						</Col>	
		 			</Row>
					<Row :gutter="16">
						<Col span="6">
							<FormItem label="默认发票类型">
								<Select v-model="formData.cus_industry" filterable clearable placeholder="请选择默认发票类型">
									<Option v-for="item in dictList.industry" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="开票地址">
								<Input type="text" v-model="formData.customer_extra.purpose_term_lease" placeholder="请输入开票地址" />
							</FormItem>
						</Col>
					</Row>
		 		</Card>
				<Card dis-hover class="ivu-mb-8">
		    	<p slot="title">客户标签</p>
					<TagSelect v-model="formData.customer_tag" hide-check-all>
				    <TagSelectOption v-for="item in dictList.cus_tags" :key="item.id" :name="item.id" >{{ item.value }}</TagSelectOption>
					</TagSelect>
				</Card>
			</Form>
			</div>
			<div class="modal-content" v-show="currentMenu==1">
				<Form ref="form2" :model="formData" :rules="ruleValidata"  label-position="top">
					<Card dis-hover class="ivu-mb-8" :bordered="true" :padding="24">
						<div class="ivu-text-right ivu-mr-16 ivu-mb-16"><a href="#" slot="extra" @click.prevent="handleBusiness">同步工商信息</a></div>
						<Row :gutter="16">
							<Col span="12">
								<FormItem label="注册公司名称"><Input type="text" v-model="formData.business_info.name" placeholder="请输入注册公司名称" /></FormItem>
							</Col>
							<Col span="12">
								<FormItem label="信用代码"><Input type="text" v-model="formData.business_info.creditCode" placeholder="请输入信用代码" /></FormItem>
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
import { addCustomer,getBaseInfo} from '@/api/merchants/customer';
import { getUser } from '@/api/setting/auth';
import  houseSelect from '@/components/house-select';
import { mapState, mapGetters } from 'vuex';
import xwTag from '@/components/xw-tag';
export default {
	name: 'table-add',
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
			},
			currentMenu:0,
			menuItem:['基本信息','工商信息'],
			formData: {
				cus_belong_uid:'',
				cus_name: '',
				customer_tag:[],
				proj_id:'',
				proj_name:'',
				cus_industry:'',
				cus_visit_date:'',
				cus_level:'',
				cus_follow_type:'',
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
			userList:[],
			projectList: [],
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
			
			showAddModal: false,
			loadingAdd: true,
			spinShow:false,
			loadHouse:false,
			houseModalStatus:false,
			current:1,
		};
	},
	methods: {
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addCustomer(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("客户添加成功！");
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
		handleSelectTag(val){
			this.currentMenu = val.currentIndex;        
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
			}
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
		handleProjectChange(val) {
			this.formData.proj_name = val.label;
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
			this.showAddModal = this.value;
			if (this.showAddModal === false) {
				this.handleReset();
			}
		},
		showAddModal(val) {
			if (!val) {
				this.$emit('add-closed',0);
			}
		}
	},
	mounted() {
		this.getDictList();
		this.getChannelList();
		this.getUserList();
		this.getProjectList();
		this.formData.cus_belong_uid = this.info.uid;
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