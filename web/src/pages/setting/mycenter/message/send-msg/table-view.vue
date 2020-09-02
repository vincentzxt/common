<template>
	<div>
		<Drawer v-model="showViewModal"  :title="formData.title" width="60%" :mask-closable="true" class="drawer-no-padding">
			<div class="drawer-content view-message-box">
				<div style="text-align: right;" v-if="formData.is_revoke==1"><a href="#" slot="extra" @click.prevent="handleRevoke" style="font-weight: 500;">
									消息撤回
								</a></div>
				<Form ref="form" :model="formData" label-position="left" :label-width="65" class="form-view">
					<Card dis-hover class="ivu-mb-8" :padding="8" :bordered="false">
							<Row :gutter="24">
								<Col span="24">
									<FormItem label="接收人员:">
									<!--	<Tag v-for="item in formData.receiveList">{{item}}</Tag> -->
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="已阅人员:">
									<!--	<Tag v-for="item in formData.readList">{{item}}</Tag> -->
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="消息内容:">
										<div v-html="formData.content"></div> 
											当需要动态维护 FormItem 时，也可以直接给 FormItem 设置属性 rules 来单独为该域做验证。
动态设置 FormItem 的 prop 属性时，会依据上层的 Form 组件的 model 来获取，查看示例代码。FormItem 还可以独立设置 required、error 等属性，详见 API。
									</FormItem>
								</Col>
							</Row>
						</Card>
				</Form>
				<!-- <Card dis-hover class="ivu-mb-8" :bordered="false">
						<div class="content">{{ formData.content }}</div>
						<!-- <div class="tip">发送人：{{ formData.sender_username }} {{ formData.created_at }}</div> -->
				<!-- </Card> -->
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>    
	</div>
</template>

<script>
import { showMessage ,revokeMessage} from '@/api/setting/message';

export default {
	name: 'table-view',
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
				sender_username:'',
				receiveList:[],
				readList:[],
				created_at:'',
				title:'',
				content:'',
				is_revoke:0
			},
			showViewModal: false,
			loadingView: true,
			spinShow: false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid,show_type:1};
			showMessage(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData = res.data;
					if(res.data.read_user!==""){
						this.formData.readList = res.data.read_user.split(',');
					}
					if(res.data.receive_user!==""){
						this.formData.receiveList = res.data.receive_user.split(',');
					}
				}else{
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false
			});
		},
		handleRevoke(){
			 this.$Modal.confirm({
			                    title: '是否撤回消息',
			                    content: '消息发送半小时内可以撤回，超过半小时后无法撤回，是否继续撤回？',
			                    onOk: () => {
			                        this.spinShow = true
			                        const senddata = {id:this.viewid,show_type:1};
			                        revokeMessage(senddata).then(res => {
			                        	this.spinShow = false
			                        	if (res.code === 200) {
			                        		this.$Message.success('消息撤回操作成功！');
			                        	}else{
			                        		this.$Message.error(res.message);
			                        	}
			                        }).catch(err => {
			                        	this.spinShow = false
			                        });
			                    },
			                    onCancel: () => {
			                    }
			                });
		}
		
	},
	watch: {
		value() {
			this.showViewModal = this.value;
			if (this.showViewModal === false) {
			}else{
				this.getRow()
			}
		},
		showViewModal(val) {
			if (!val) {
				this.$emit('view-closed',1);
			}
		}
	},
	mounted() {
	//	this.viewid = this.templateData.id;
	}
};
</script>
<style lang="less">
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
	.view-message-box{
		.tip{
				margin-top: 50px;
				text-align: right;
				color: #777777;
		}
		.ivu-form-item-label{
			color: #555555 !important;
			font-size: 12px !important;
		}
		.ivu-form-item-content{
			// color: #555555 !important;
			font-size: 12px !important;
		}
	}
</style>