<template>
	<div>
		<Drawer placement="left" :closable="false" v-model="showProjModal" width="300px"  class="cutomer-drawer-box-gay project-select">
			<div slot="header" class="header">
				<div class="build-icon"><Icon type="logo-buffer" /></div>
				<div class="header-content">
					<span class="title">项目选择</span>
					<span>共计 {{list.length}}</span>
				</div>
			</div>
			<Row :gutter="10" style="height: 100%;">
			<Col span="24" style="height: 100%;"><Card :bordered="false" dis-hover style="height: 100%;">
            <p slot="title">项目列表</p>
			<div :class="[item.id == projSelected ? 'pro-box-checked':'pro-box']" v-for="(item, index) in list" :key="index" @click="handleProjCheck(index)">
            <div class="pro-icon"><Icon type="logo-buffer" /></div>
            <div class="pro-content">
            	<span class="title">{{item.proj_name}}</span>
            	<div><Icon type="md-cube" /> {{item.builds.length}}</div>
            </div>
			<Icon type="ios-checkmark" class="proj-checked" v-show="item.id == projSelected" />
			</div>
        </Card></Col>
		<!--   <Col span="12" style="height: 100%;"><Card :bordered="false" dis-hover style="height: 100%;">
            <p slot="title">楼宇列表</p>
            <div class="build-box"  v-for="(item, index) in allBuilds" :key="index">
            <div class="build-icon"><Icon type="logo-buffer" /></div>
            <div class="build-content">
            	<span class="title">{{item.build_no}}</span>
            </div>
			<Checkbox  value="2" class="build-check"><span></span></Checkbox>
            </div>
        </Card></Col> -->
		</Row>
		<Spin size="large" fix v-if="spinShow"></Spin>
		</Drawer>
	</div>
</template>
<script>
import { getProjectWithBuild} from '@/api/merchants/project';
export default {
	name: 'project-select',
	props: {
		name: {
			type: String,
			default: ''
		},
		value: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			modal7: true,
			list:[],
			initBuilds:[],
			allBuilds:[],
			projSelected:0,
			showProjModal:false,
			spinShow:false
		};
	},
	mounted() {
		this.loadData();
	},
	methods: {
		loadData() {
			this.spinShow = true;
			const page = {
				page: 1,
				pagesize: 20
			};
			const senddata = page;
			getProjectWithBuild(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.list = res.data;
					this.initBuilds = this.list.map(item=>item.builds);
					this.allBuilds =res.data[0].builds;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false;
			});
		},
		handleProjCheck(val){
			this.projSelected = this.list[val].id;
			this.allBuilds = this.list[val].builds;
			this.$emit('on-proj-select',this.list[val])
		}
	},
	watch: {
		value() {
			this.showProjModal = this.value;
			if (this.showProjModal === false) {
				// this.handleReset();
			}
		},
		showProjModal(val) {
			if (!val) {
				this.$emit('add-closed',0);
			}
		}
	},
};
</script>
<style lang="less">
.project-select{
.ivu-drawer-left {
	left: 240px !important;
}
.ivu-drawer-mask {
	left: 260px !important;
}
.ivu-drawer-header {
    border-bottom: 1px solid #e8eaec;
    padding: 10px 16px !important;
    line-height: 1;
}

.header {
	display: flex;
	flex-direction: row;
	background-color: #FFFFFF;
	.build-icon {
		background-color: #8c0776;
		width: 35px;
		height: 35px;
		line-height: 35px;
		color: #ffffff;
		text-align: center;
	}
	.header-content {
		margin-left: 10px;
		font-size: 13px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			color: #000000;
			font-weight: 400;
		}
	}
}
.ivu-card-head{
	padding: 10px 16px !important;
}
.ivu-card-head p{
	font-size: 14px !important;
}
.pro-box {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
	font-size: 12px;
	position:relative;
	color: #999999;
	.pro-icon {
		background-color: #F2F2F2;
		width: 35px;
		height: 35px;
		line-height: 35px;
		color: #666666;
		text-align: center;
	}
	.pro-content {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			color: #333333;
			font-weight: 500;
		}
	}	
}
.pro-box-checked {
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
	font-size: 12px;
	color: #999999;
	position:relative;
	.pro-icon {
		background-color: #4c5aff;
		width: 35px;
		height: 35px;
		line-height: 35px;
		color: #FFFFFF;
		text-align: center;
	}
	.pro-content {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			color: #333333;
			font-weight: 500;
		}
	}
	.proj-checked{
		position:absolute;
		right: 0;
		size: 24;
		color: #4c5aff !important;
		font-size: 32px;
	}
	
}
.build-box {
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
	font-size: 12px;
	color: #999999;
	position:relative;
	.build-icon {
		background-color: #F2F2F2;
		width: 35px;
		height: 35px;
		line-height: 35px;
		color: #666666;
		text-align: center;
	}
	.build-content {
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
	.build-check{
		position:absolute;
		right: 0;
		top:10px	
	}
}
}
</style>
