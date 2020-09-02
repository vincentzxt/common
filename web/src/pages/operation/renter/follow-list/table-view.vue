<template>
	<div>
		<Drawer v-model="showViewModal"  title="查看跟进记录" width="50%" :mask-closable="true" class="drawer-no-padding">
			<div class="drawer-content">
				<Form ref="form" :model="formData" label-position="left" :label-width="80"  class="form-view">
					<Card dis-hover class="ivu-mb-8" :bordered="false">
							<Row :gutter="24">
								<Col span="12">
									<FormItem label="公司名称">
										{{ formData.cus_name }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="客户状态">
										{{ formData.cus_state }}
									</FormItem>
								</Col>
								
								<Col span="12">
									<FormItem label="跟进方式">
										{{ formData.follow_type}}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="跟进日期">
										{{ formData.cus_follow_time }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="跟进人">
										{{ formData.follow_username}}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="联系人">
										{{ formData.cus_contact_user }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="创建时间">
										{{ formData.created_at }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="跟进次数">
										第{{ formData.times }}次跟进
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="跟进记录">
										{{ formData.cus_follow_record }}
									</FormItem>
								</Col>
							</Row>
						</Card>
				</Form>
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>   
	</div>
</template>

<script>
import { showCustomerFollow } from '@/api/merchants/customer';

export default {
	name: 'channel-visit-view',
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
			viewid:0,
			formData: {
				cus_name:'',
				parent_id: '',
				parent_type: 1,
				maintain_user: '',
				maintain_type: '',
				maintain_date: '',
				maintain_record: '',
				create_user:{}
			},
			showViewModal: false,
			spinShow: false,
		};
	},
	methods: {
		getRow(){
			const sendData = {
				id : this.viewid,
			};
			//this.spinShow = true;
			showCustomerFollow(sendData).then(res => {
					this.spinShow = false;
					if (res.code === 200) {
						this.formData = res.data;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.spinShow = false
					this.$Message.error(err.message);
					// 异常情况
				});
		}
	},
	watch: {
		value() {
			this.showViewModal = this.value;
			if (this.showViewModal === false) {
			}else{
				this.getRow();
			}
		},
		showViewModal(val) {
			if (!val) {
				this.$emit('view-closed',0);
			}
		}
	},
	mounted() {
		this.viewid = this.templateData.id;
	}
};
</script>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>