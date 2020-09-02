<template>
	<div>
		<Modal v-model="showFollowModal" title="客户跟进" :loading="loadingFollow" :scrollable="true" :mask-closable="false" width="55%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
			<Form ref="form" :model="formData" label-position="top">
				<Card dis-hover class="ivu-mb-8">
					<Row :gutter="16">
						<Col span="12">
						 <FormItem prop="follow_username" label="跟进人"><Input type="text" v-model="formData.follow_username" placeholder=""  disabled /></FormItem>
						</Col>
						<Col span="12">
							<FormItem  label="跟进方式" prop="cus_follow_type" :rules="{required: true, message: '请选择跟进方式',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.cus_follow_type" filterable clearable placeholder="请选择跟进方式">
									<Option v-for="item in dictList.follow_type" :value="item.id" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>	
					<Row :gutter="16">
						<Col span="12">
							<FormItem prop="cus_follow_time" label="跟进日期"  :rules="{required: true, message: '请择择跟进日期', trigger: 'blur'}">
								<DatePicker :value="formData.cus_follow_time" type="date" v-width="'100%'" placeholder="请选择日期" @on-change="formData.cus_follow_time=$event"/>
							</FormItem>
						</Col>
					<Col span="12">
						<FormItem prop="remind_date" label="下次跟进日期"  :rules="{required: true, message: '请选择下次跟进日期', trigger: 'blur'}">
							<DatePicker :value="formData.remind_date" type="date" v-width="'100%'" placeholder="请选择日期" @on-change="formData.remind_date=$event"/>
						</FormItem>
					</Col>
					</Row>
					<Row :gutter="16">
						<Col span="12">
							<FormItem prop="cus_state" label="客户状态" :rules="{required: true, message: '请选择客户状态',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.cus_state" filterable clearable placeholder="请选择状态">
									<Option v-for="item in dictList.cus_state" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="cus_contact_id" label="联系人" :rules="{required: true, message: '请选择客户联系人',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.cus_contact_id" filterable clearable placeholder="请选择状态"  @on-change="handleContact">
									<Option v-for="item in contactList" :value="item.id" :key="item.id">{{ item.contact_name }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row :gutter="16">
						<Col span="24">
							<FormItem prop="cus_follow_record" label="跟进内容"  :rules="{required: true, message: '请输入跟进内容', trigger: 'blur'}">
								<Input v-model="formData.cus_follow_record" type="textarea" :rows="4" placeholder="请输入跟进内容" />
							</FormItem>
						</Col>
					</Row>
					</Card>
			</Form>
			<Spin size="large" fix v-if="spinShow"></Spin>
			
		</Modal>
	</div>
</template>

<script>
import { getCustomerById,addCustomerFollow} from '@/api/merchants/customer';
import { getDictAll } from '@/api/common/global';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'table-follow',
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
				cus_id:0,
				follow_username:'',
				cus_follow_type:'',
				cus_state:'',
				cus_contact_id:0,
				cus_contact_user:'',
				cus_follow_time:'',
				remind_date:'',
				cus_follow_record:'',
			},
			contactList:[],
			dictList: {},
			showFollowModal: false,
			loadingFollow: true,
			spinShow:false,
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
						this.contactList = res.data.customer_contact;
						this.formData.cus_state= res.data.cus_state
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
			console.log(this.formData);
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addCustomerFollow(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("客户跟进添加成功！");
								this.loadingFollow = false;
								this.$nextTick(() => {
									this.loadingFollow = true;
									this.$emit('follow-closed',1);
								});
							} else {
								this.$Message.error(res.message);
								this.loadingFollow = false;
								this.$nextTick(() => {
									this.loadingFollow = true;
								});
							}
						})
						.catch(err => {
							this.loadingFollow = false;
							this.$nextTick(() => {
								this.loadingFollow = true;
							});
							// 异常情况
						});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingFollow = false; //改变loading状态
					this.$nextTick(() => {
						//在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
						this.loadingFollow = true;
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
		handleContact(val){
			const filter = this.contactList.filter(item=>item.id==val);
			if(filter.length>0){
				this.formData.cus_contact_user= filter[0].contact_name;
			}
		},
		handleReset() {
			this.$refs['form'].resetFields();
		}
	},
	watch: {
		value() {
			this.showFollowModal = this.value;
			if (this.showFollowModal === false) {
				this.handleReset();
			}else{
				this.getRow()
			}
		},
		showFollowModal(val) {
			if (!val) {
				this.$emit('follow-closed',0);
			}
		}
	},
	mounted() {
		this.getDictList();
		this.formData.follow_username = this.info.name
		this.formData.cus_id = this.templateData.id
	},
	computed: {
	    ...mapState('admin/user', [
	        'info'
	    ])
	}
};
</script>