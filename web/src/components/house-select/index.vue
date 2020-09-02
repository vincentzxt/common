<template>
	<div>
		<Modal placement="left" title="房源选择" :loading="loadingHouse" :closable="false" v-model="showHouseModal" width="50%"  class="cutomer-modal-box-gay" @on-ok="handleSubmit">
			<div class="ivu-mb-16 ivu-mt-8">当前项目: {{project_info.proj_name}}</div>
			<Row :gutter="10">
			<Col span="9">
				<Card :bordered="false" dis-hover class="house-select-box">
            <p slot="title">楼宇列表</p>
			<CellGroup @on-click="handleChangeBuild" class="house-content">
				<Cell v-for="(item, index) in buildList" :key="index" :name="index" :selected="build_index === index">
				                    <span slot="label">{{project_info.proj_name}}  {{item.build_no}}</span>
				 </Cell>
			</CellGroup>
        </Card></Col>
		   <Col span="6"><Card :bordered="false" dis-hover class="house-select-box">
            <p slot="title">楼层列表</p>
			<CellGroup @on-click="handleChangeFloor" class="house-content">
				<Cell v-for="(item, index) in floorList" :key="index" :name="index" :selected="floor_id === item.id">
				               <span slot="label">{{item.floor_no}}({{item.floor_room_count}})</span>
				 </Cell>
			</CellGroup>
			</Card></Col>
			<Col span="9"><Card :bordered="false" dis-hover class="house-select-box">
			 <p slot="title">房间列表</p>
				<CheckboxGroup v-model="roomSelected" @on-change="handleChangeRoom">
						<CellGroup class="house-content">
							<Cell v-for="(item, index) in roomAllList" :key="index" :name="index" v-if="item.floor_id==floor_id">
							   <div class="room-list"><span class="ivu-block"><Checkbox :label="item.id"><span></span></Checkbox></span>
							   <span class="ivu-block">{{item.room_no}}</span>
							   <span class="ivu-block">{{item.room_area}}m²</span></div>
							 </Cell>
						</CellGroup>
				</CheckboxGroup>
						</Card></Col>
		</Row>
		<Card :bordered="false" dis-hover class="ivu-mt-8">
		    <p slot="title">已选房源</p>
			<p slot="extra">房源数：<span class="link-font-color">{{roomselectedList.length}}</span>&nbsp;&nbsp;&nbsp;&nbsp;面积：<span  class="link-font-color">{{roomSelectArea}}m²</span></p>
		<Row :gutter="16">
			<Col span="12" v-for="(item, index) in roomselectedList" :key="index" >
				<div class="room-box-checked ivu-b">
					<div><Icon type="logo-buffer" /><span class="title" style="margin-left: 5px;">{{item.proj_name}}&nbsp;&nbsp;{{item.build_no}}</span></div>
					<div class="title">{{item.room_no}}</div>
					<div class="title">{{item.room_area}}m²</div>
					<Icon type="ios-close" size="20" @click="handleRomoveRoom(index)" style="cursor: pointer;"/>
				</div>
			</Col>
		</Row>	
		</Card>
		<Spin size="large" fix v-if="spinShow"></Spin>
		</Modal>
	</div>
</template>
<script>
import { getSpace,getRoomAll} from '@api/common/global';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'house-select',
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
			list:[],
			initBuilds:[],
			build_index:-1,
			floor_id:-1,
			room_index:-1,
			spaceList:[],
			buildList:[],
			floorList:[],
			roomList:[],
			roomAllList:[],
			roomSelected:[],
			roomselectedList:[],
			roomSelectArea:0.00,
			showHouseModal:false,
			spinShow:false,
			room_status:false,
			loadingHouse:true
		};
	},
	mounted() {
		this.loadData();
	},
	computed: {
		...mapState('admin/user', [
		    'project_info'
		]),
	},
	methods: {
		loadData(){
			this.spinShow = true;
			const senddata = {
				room_type:1,
				room_state:1,
				proj_id: this.project_info.id
			};
			getSpace(senddata).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.spaceList = res.data;
					this.buildList = res.data;
					var floorAllList = []
					for(var build of res.data){
						 const floors = build.floors;
						  for(var floor of floors){
							  if(floor.rooms.length>0)
							  this.roomAllList=this.roomAllList.concat(floor.rooms);  
						  }
					}
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false;
			});
		},
		handleChangeBuild(val){
			this.floorList=[];
			this.build_index=val
			this.floorList = this.buildList[val].floors;
		},
		handleChangeFloor(val){
			this.floor_id= this.floorList[val].id;
		},
		handleChangeRoom(val){
			this.roomselectedList = this.roomAllList.filter(item =>{
			    return this.roomSelected.indexOf(item.id) >= 0;
			});
			this.handleCal();
		},
		handleRomoveRoom(val){
			const room_id = this.roomselectedList[val].id;
			var index = this.roomSelected.indexOf(room_id);
			this.roomSelected.splice(index, 1);
			this.roomselectedList.splice(val, 1);
			this.handleCal()
		},
		handleCal(){
			var initArea = 0.00;
			for(var item of this.roomselectedList){
				 initArea = initArea+parseFloat(item.room_area)
			}
			this.roomSelectArea = initArea.toFixed(2);
		},
		handleSubmit() {
			const val = {roomselectedList:this.roomselectedList,roomSelectArea:this.roomSelectArea}
			this.$emit('house-add',val);
			this.loadingHouse = false;
			this.$emit('house-closed');
		}
	},
	watch: {
		value() {
			this.showHouseModal = this.value;
			if (this.showHouseModal === false) {
				
			}
		},
		showHouseModal(val) {
			if (!val) {
				this.$emit('house-closed');
			}
		}
	},
};
</script>
<style lang="less">
.house-select-box{
	.house-content{
		height: 220px;
		overflow: auto;
		.ivu-cell-label{
			font-size: 14px;
			color:#333333;
		}
		.ivu-cell-main{
			display: block;
		}
		.room-list{
			width: 200px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
	.ivu-card-body{
		padding: 8px !important;
	}
}
.room-box-checked {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 15px;
	font-size: 13px;
	position:relative;
	padding: 5px 10px;
	.project-content{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.pro-icon {
		background-color: #4c5aff;
		width: 35px;
		height: 35px;
		line-height: 35px;
		color: #FFFFFF;
		text-align: center;
	}
	
}
</style>
