<template>
	<div>
		   <Drawer
            title="查看用户组"
            v-model="showViewModal"
            width="60%"
            :mask-closable="false"
			class="cutomer-drawer-box-gay">
				<Form ref="form" :model="formData" :label-width="50" label-position="left">
					<Card dis-hover class="ivu-mb-8">
						<p slot="title">用户组信息</p>
					<FormItem prop="name" label="名称">{{formData.name}}</FormItem>
					<FormItem prop="remark" label="描述"><Input type="textarea" :rows="2" v-model="formData.remark" disabled  /></FormItem>
				</Card>
				<Card dis-hover>
				    <p slot="title">项目权限</p>
					 <Row :gutter="8">
					        <Col span="8" v-for="(item, index) in list" :key="index" v-if="formData.project_limit.includes(item.id)">
								<div :class="[formData.project_limit.includes(item.id) ? 'project-box-check ivu-b':'project-box ivu-b']">
								<div class="project-icon"><Icon type="logo-buffer" /></div>
								<div class="project-content">
									<span class="title">{{item.proj_name}}</span>
								</div>
								<Icon type="ios-checkmark" class="project-checked" v-if="formData.project_limit.includes(item.id)" />
								</div>
							</Col>
					    </Row>
				  
				</Card>
				</Form>
		<Spin size="large" fix v-if="spinShow"></Spin>
		<div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="showViewModal = false">关闭</Button>
                <Button type="primary" @click="handleEdit">编辑</Button>
            </div>
	      </Drawer>    
	</div>
</template>

<script>
import { getUserGroupById } from '@/api/setting/userGroup';
import { getAllProject} from '@/api/merchants/project';
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
				name: '',
				remark: '',
				project_limit:[]
			},
			list:[],
			showViewModal: false,
			loadingView: true,
			spinShow: true
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid};
			getUserGroupById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
						if(this.formData.project_limit!==''){
						const project_limit =this.formData.project_limit.split(",");
						this.formData.project_limit =  project_limit.map(function(item,index){return parseInt(item)});
						}else{
							this.formData.project_limit=[];
						}
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.$Message.error(err.message);
					this.spinShow = false
					// 异常情况
				});
		},
		loadProjData() {
			const senddata = {};
			getAllProject(senddata).then(res => {
				if (res.code === 200) {
					this.list = res.data;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				
			});
		},
		handleEdit(){
			this.$emit("on-edit",this.formData);
		}
		
	},
	watch: {
		value() {
			this.showViewModal = this.value;
			if (this.showViewModal === false) {
			}else{
				this.getRow()
				this.loadProjData();
				
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
	.ivu-modal-header-inner{
		text-align: center;
	}
	.project-box {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
		font-size: 12px;
		color: #999999;
		position:relative;
		.project-icon {
			background-color: #F2F2F2;
			width: 35px;
			height: 35px;
			line-height: 35px;
			color: #666666;
			text-align: center;
		}
		.project-content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// justify-items: center;
			.title {
				color: #000000;
				font-weight: 600;
			}
		}
		.project-checked{
			position:absolute;
			right: 0;
			size: 24;
			color: #4c5aff !important;
			font-size: 32px;
		}
	}
	.project-box-check {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
		font-size: 12px;
		color: #999999;
		position:relative;
		.project-icon {
			background-color: #4c5aff;
			width: 35px;
			height: 35px;
			line-height: 35px;
			color: #FFFFFF;
			text-align: center;
		}
		.project-content {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// justify-items: center;
			.title {
				color: #000000;
				font-weight: 600;
			}
		}
		.project-checked{
			position:absolute;
			right: 0;
			size: 24;
			color: #4c5aff !important;
			font-size: 32px;
		}
	}
</style>