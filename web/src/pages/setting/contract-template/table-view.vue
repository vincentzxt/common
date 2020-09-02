<template>
	<div>
		<Drawer v-model="showViewModal"  title="查看项目" width="70%" :mask-closable="true" class="cutomer-drawer-box-gay drawer-no-padding">
			<div class="drawer-content">
				<Form ref="form" :model="formData" label-position="left"  class="form-view">
					<Card dis-hover class="ivu-mb-8">
						<p slot="title">基本信息</p>
							<Row :gutter="24">
								<Col span="12">
									<FormItem label="项目名称">
										{{ formData.proj_name }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="项目类型">
										{{ formData.proj_type }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="项目地址">
										{{ formData.proj_province }}{{ formData.proj_city }}{{ formData.proj_district }}{{ formData.proj_addr }}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="管理面积">
										<span v-if="formData.manager_area!=0">{{ formData.manager_area }}</span><span v-else>-</span>m²
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="建筑面积">
										<span v-if="formData.proj_buildarea!=0">{{ formData.proj_buildarea }}</span><span v-else>-</span>m²
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="使用面积">
										<span v-if="formData.proj_usablearea!=0">{{ formData.proj_usablearea }}</span><span v-else>-</span>m²
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="容积率">
										{{ formData.proj_far }}
									</FormItem>
								</Col>
							</Row>
						</Card>
						<Card dis-hover class="ivu-mb-8">
						<p slot="title">项目图片信息</p>
							<Row :gutter="24">
								<Col v-if="formData.proj_pic===''"><div class="empty-info">暂无图片信息</div></Col>
								<Col v-if="formData.proj_pic!==''" v-for="(item, index) in formData.proj_pic.split(',')" :key="index" :xl="6" :lg="6" :md="6" :sm="12" :xs="12" class="ivu-mb">
									<img :src="baseUrl + item" style="width:120px;height:80px;">
								</Col>
							</Row>
						</Card>	
						<Card dis-hover class="ivu-mb-8">
							<p slot="title">楼宇信息</p>
							<div class="empty-info" v-if="formData.building.length==0">暂无楼宇信息</div>
								<div class="i-table-no-border" v-if="formData.building.length>0">
								<Table :columns="columns" :data="formData.building"></Table>
								</div>
						</Card>
						
				</Form>
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
			<div class="drawer-footer-tool">
				<Button style="margin-right: 8px" @click="showViewModal = false">关闭</Button>
				<Button type="primary" @click="handleEdit">编辑</Button>
			</div>
		</Drawer>    
	</div>
</template>

<script>
import { getProjectById } from '@/api/merchants/project';

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
				proj_name: '',
				proj_type: '',
				proj_province: '',
				proj_city: '',
				proj_district: '',
				proj_addr: '',
				proj_occupy: '',
				proj_buildarea: '',
				proj_usablearea: '',
				proj_far: '',
				proj_pic: '',
				is_valid: 1,
				building:[],
				province: {
					id: '',
					name: ''
				},
				city: {
					id: '',
					name: ''
				},
				district: {
					id: '',
					name: ''
				}
			},
			roleList: [],
			showViewModal: false,
			loadingView: true,
			spinShow: false,
			baseUrl: 'http://wuye-oss.oss-cn-beijing.aliyuncs.com/',
			columns: [
				{ title: '楼号', key: 'build_no',minWidth:80 },
				{ title: '楼宇性质', key: 'build_type',minWidth:80 },
				{ title: '建筑面积', key: 'build_area',minWidth:100},
				{ title: '用途',key: 'build_usage',minWidth:100},
				{ title: '楼宇高度',key: 'floor_height',minWidth:100},
			],
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid};
			getProjectById(senddata).then(res => {
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