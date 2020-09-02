<template>
	<div>
		<Drawer v-model="showViewModal"  :title="formData.title" width="60%" :mask-closable="true" class="drawer-no-padding">
			<div class="drawer-content view-message-box">
				<Form ref="form" :model="formData" label-position="left" :label-width="65" class="form-view">
					<Card dis-hover class="ivu-mb-8" :padding="8" :bordered="false">
							<Row :gutter="24">
								<Col span="24">
									<FormItem label="发送人员:">
										<Tag>{{formData.sender_username}}</Tag>
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="接收时间:">
										{{formData.created_at}}</Tag>
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
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>    
	</div>
</template>

<script>
import { showMessage } from '@/api/setting/message';

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
			},
			showViewModal: false,
			loadingView: true,
			spinShow: false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid,show_type:2};
			showMessage(senddata).then(res => {
				this.spinShow = false
				if (res.code === 200) {
					this.formData = res.data;
					
				}else{
					this.$Message.error(res.message);
				}
			}).catch(err => {
				this.spinShow = false
			});
		},
		
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
		this.viewid = this.templateData.id;
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