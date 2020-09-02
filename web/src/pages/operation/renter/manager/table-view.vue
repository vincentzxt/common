<template>
	<div>
		<Drawer title="查看客户" v-model="showViewModal" width="75%" :mask-closable="false" class="cutomer-drawer-box-gay drawer-no-padding">
			<div class="drawer_tool">
							<div class="ivu-fl">
								   <xwTag :items="menuItem" :currentIndex="currentMenu" @item-click="handleSelectTag"></xwTag>								
							</div>
							<ul class="ivu-list-item-action ivu-fr">
								<li @click="handleEdit">
									<Icon type="ios-create-outline" size="18" />
									编辑
								</li>
								<li @click="handleOpenFollow">
									<Icon type="ios-add"  size="18" />
									跟进
								</li>								
							</ul>
			</div>
			<div class="drawer-content" v-show="currentMenu==0">
				<customerBase :viewid="viewid" ref="customerBaseView" />
			</div>
			<div class="drawer-content"  v-show="currentMenu==1">
				<customerBusiness :viewid="viewid" ref="customerBusinessView" />
			</div>
			<div class="drawer-content"  v-show="currentMenu==2">
				<customerFollow :viewid="viewid"  ref="customerFollowView" />
			</div> 
			
			<TableFollow  v-if="loadFollow" v-model="followModalStatus" :templateData="templateData" @follow-closed="handleCloseFollow"></TableFollow>
		</Drawer>
		
	</div>
</template>

<script>
	
import TableFollow from './table-follow';	
import customerBase from './customer-base';
import customerFollow from './customer-follow';
import customerBusiness from './customer-business';
import { getCustomer } from '@/api/merchants/customer';
import { getCompanyBank } from '@/api/common/company';
import { getCustomerById } from '@/api/merchants/customer';
import xwTag from '@/components/xw-tag';
export default {
	components: { customerBase,customerFollow,customerBusiness,TableFollow,xwTag},
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
			viewid: 0,
			showViewModal: false,
			loadFollow: false,
			followModalStatus:false,
			currentMenu:0,
			menuItem:['基本信息','工商信息','跟进记录'],
		};
	},
	methods: {
		handleSelectTag(val){
		   this.currentMenu = val.currentIndex;
		},
		handleEdit() {
			this.$emit('on-edit', { id: this.viewid });
		},
		//打开查看界面
		handleOpenFollow() {
			this.$set(this.templateData, 'id', this.viewid);
			this.loadFollow = true;
			this.$nextTick(() => {
				this.followModalStatus = true;
			});
		},
		//关闭查看界面
		handleCloseFollow(val) {
			this.followModalStatus = false;
			this.$nextTick(() => {
				this.loadFollow = false;
			});
			if (val === 1) {
				this.$refs.customerFollowView.getRow();
				// this.$refs.customerBaseView.getRow();
				this.$emit('on-refresh');
			}
		}
	},
	watch: {
		value() {
			this.showViewModal = this.value;
		},
		showViewModal(val) {
			if (!val) {
				this.$emit('view-closed', 0);
			}
		}
	},
	mounted() {
		this.viewid = this.templateData.id;
	}
};
</script>
<style lang="less">
.demo-spin-icon-load {
	animation: ani-demo-spin 1s linear infinite;
}
.ivu-drawer-header-inner {
	text-align: center !important;
}
</style>
