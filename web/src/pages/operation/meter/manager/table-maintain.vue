<template>
	<div>
		<Modal v-model="showMaintainModal" title="渠道维护" :loading="loadingMaintain" :scrollable="true" :mask-closable="false" width="55%"  :styles="{top: '20px'}" @on-ok="handleSubmit" class="cutomer-modal-box-gay">
			<Form ref="form" :model="formData" label-position="top">
				<Card dis-hover class="ivu-mb-8">
					<Row :gutter="16">
						<Col span="12">
							<FormItem prop="c_username" label="维护人">
							   <Input v-model="formData.c_username" type="text" placeholder="请输入维护人" disabled />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem  label="维护类型" prop="maintain_type" :rules="{required: true, message: '请选择维护类型',pattern: /.+/,  trigger: 'blur'}">
								<Select v-model="formData.maintain_type" filterable clearable placeholder="请选择维护类型">
									<Option v-for="item in dictList.maintain_type" :value="item.value" :key="item.id">{{ item.value }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>	
					<Row :gutter="16">
						<Col span="12">
							<FormItem prop="maintain_date" label="维护日期"  :rules="{required: true, message: '请选择维护日期', trigger: 'blur'}">
								<DatePicker :value="formData.maintain_date" type="date" v-width="'100%'" placeholder="请选择维护日期" @on-change="formData.maintain_date=$event"/>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="maintain_user" label="联系人" :rules="{required: true, message: '请输入联系人',pattern: /.+/,  trigger: 'blur'}">
							   <Input v-model="formData.maintain_user" type="text" placeholder="请输入联系人" />
							</FormItem>
						</Col>
					</Row>
					<Row :gutter="16">
						<Col span="24">
							<FormItem prop="maintain_record" label="维护内容"  :rules="{required: true, message: '请输入维护内容', trigger: 'blur'}">
								<Input v-model="formData.maintain_record" type="textarea" :rows="4" placeholder="请输入维护内容" />
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
import { getCustomerById} from '@/api/merchants/customer';
import { addMaintain } from '@/api/merchants/maintain'
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
				parent_id:0,
				parent_type :1,
				maintain_type:'',
				maintain_date:'',
				maintain_record:'',
				maintain_user:''
			},
			contactList:[],
			dictList: {},
			showMaintainModal: false,
			loadingMaintain: true,
			spinShow:false,
		};
	},
	methods: {
		handleSubmit() {
			console.log(this.formData);
			this.$refs.form.validate(valid => {
				if (valid) {
					const senddata = this.formData;
					addMaintain(senddata)
						.then(res => {
							if (res.code === 200) {
								this.$Message.success("维护添加成功！");
								this.loadingMaintain = false;
								this.$nextTick(() => {
									this.loadingMaintain = true;
									this.$emit('follow-closed',1);
								});
							} else {
								this.$Message.error(res.message);
								this.loadingMaintain = false;
								this.$nextTick(() => {
									this.loadingMaintain = true;
								});
							}
						})
						.catch(err => {
							this.loadingMaintain = false;
							this.$nextTick(() => {
								this.loadingMaintain = true;
							});
							// 异常情况
						});
				} else {
					this.$Message.error('表单验证失败！');
					this.loadingMaintain = false; //改变loading状态
					this.$nextTick(() => {
						//在数据修改之后立即使用这个方法，使用此方法可以避免出现的问题
						this.loadingMaintain = true;
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
			this.showMaintainModal = this.value;
			if (this.showMaintainModal === false) {
				this.handleReset();
			}else{
			}
		},
		showMaintainModal(val) {
			if (!val) {
				this.$emit('maintain-closed',0);
			}
		}
	},
	mounted() {
		this.getDictList();
		this.formData.c_username = this.info.name
		this.formData.parent_id = this.templateData.id
	},
	computed: {
	    ...mapState('admin/user', [
	        'info'
	    ])
	}
};
</script>