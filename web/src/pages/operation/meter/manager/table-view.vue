<template>
	<div>
		<Drawer title="查看场馆信息" v-model="showViewModal" width="70%" class="cutomer-drawer-box-gay drawer-no-padding">
			<div class="drawer_tool">
							<div class="ivu-fl">
								<xwTag :items="menuItem" :currentIndex="currentMenu" @item-click="handleSelectTag"></xwTag>
							</div>
							<ul class="ivu-list-item-action ivu-fr">
								<li @click="handleEdit">
									<Icon type="ios-create-outline" size="18" />
									编辑
								</li>
							</ul>
			</div>
			<div class="drawer-content" v-if="currentMenu==0">
				<Form ref="form" :model="formData" label-position="top" class="form-view">
					<Card dis-hover class="ivu-mb-8">
							<p slot="title">基本信息</p>
							<Row :gutter="24">
								<Col span="12">
									<FormItem label="项目名称">{{formData.proj_name || '-'}}</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="场馆名称">{{formData.venue_name || '-'}}</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="场馆面积">{{formData.venue_area || '-'}}</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="容纳人数">{{formData.venue_capacity || '-'}}</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="参考单价(元/天)">{{formData.venue_price || '-'}}</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="场馆地址">{{formData.venue_addr || '-'}}</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="场馆简介">{{formData.venue_content || '-'}}</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="场馆设施">{{formData.venue_facility || '-'}}</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="备注">{{formData.remark || '-'}}</FormItem>
								</Col>
							</Row>
					</Card>
					<Card dis-hover class="ivu-mb-8">
					<p slot="title">场馆图片</p>
						<Row :gutter="24">
							<Col v-if="defaultImage.length==0"><div class="empty-info">暂无图片信息</div></Col>
							<Col v-if="defaultImage.length>0">
								<img  v-for="(item, index) in defaultImage" :key="index"  class="ivu-mr-16 ivu-b"  :src="baseUrl + item" style="width:120px;height:120px;">
							</Col>
						</Row>
					</Card>	
				</Form>
			</div>	
			<div class="drawer-content"  v-if="currentMenu==1">
				
			</div>
			<div class="drawer-content"  v-if="currentMenu==2">
				
			</div>	
			<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>    
	</div>
</template>

<script>

import { showVenue } from '@/api/merchants/venue';
import xwTag from '@/components/xw-tag';
import Setting from '@/setting';
export default {
	name: 'table-view',
	components: {xwTag},
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
				proj_id:'',
				proj_name:'',
				venue_name:'',
				venue_addr:'',
				venue_area:'',
				venue_price:'',
				venue_capacity:'',
				venue_content:'',
				venue_facility:'',
				remark: ''
			},
			baseUrl: '',
			currentMenu:0,
			defaultImage: [],
			menuItem:['基本信息','客户信息','租赁列表'],
			loadMaintain: false,
			maintainModalStatus:false,
			showViewModal: false,
			loadingView: true,
			spinShow: false
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid};
			showVenue(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
						this.defaultImage = res.data.venue_pic.split(",");
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
		handleSelectTag(val){
		    this.currentMenu = val.currentIndex;
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
		this.baseUrl = Setting.ossURL;
	}
};
</script>