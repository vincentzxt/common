<template>
	<div class="tool-content">
		
		<!-- <Button icon="md-list" class="ivu-ml-8" v-show="selectedData.length">批量操作</Button> -->
		<Dropdown class="ivu-ml-8" v-show="selectedData.length"  @on-click="handleMulti">
		    <Button>
		        批量操作
		        <Icon type="ios-arrow-down" />
		    </Button>
		    <DropdownMenu slot="list">
		        <DropdownItem name="1" v-show="enableShow">启用</DropdownItem>
		        <DropdownItem name="0" v-show="enableShow">禁用</DropdownItem>
				<DropdownItem name="-1" v-show="deleteShow">删除</DropdownItem>
		    </DropdownMenu>
		</Dropdown>
		<Button type="primary" icon="md-add" @click="handleOpenCreate" class="ivu-fr" v-if="createShow">新建</Button>
		

		<Dropdown  trigger="click" class="ivu-fr ivu-mr-8" v-if="searchShow">
			<Button icon="md-apps">列显示</Button>
			<DropdownMenu slot="list">
				<CheckboxGroup v-model="checkAllGroup" @on-change="handleColumnFilter">
				<Row v-for="(item, index) in columns" :key="index" style="padding:0px 5px 5px 8px;">
					<Checkbox :label="item.title"><span style="color: #aaaaaa;">{{ item.title }}</span></Checkbox>
				</Row>
				</CheckboxGroup>
			</DropdownMenu>
		</Dropdown>
		<Dropdown style="margin-left: 20px" trigger="click" class="ivu-fr ivu-mr-8" v-if="exportShow" @on-click="handleExport">
			<Button icon="md-download">数据导出</Button>
			<DropdownMenu slot="list">
			            <DropdownItem name="exportCurrent">
			                <span>导出当前</span>
			            </DropdownItem>
			        
			            <DropdownItem name="exportAll">
			                <span>导出所有</span>
			            </DropdownItem>
			    </DropdownMenu>
			</Dropdown>
		</Dropdown>
	</div>
</template>
<script>
export default {
	name: 'Tools',
	props: {
	  columns: {
	    type: Array,
	    default() {
	      return []
	    }
	  },
	  selectedData: {
	    type: Array,
	    default() {
	      return []
	    }
	  },
	  createShow: {
	      type: Boolean,
	      default: true
	  },
	  filterShow: {
	      type: Boolean,
	      default: true
	  },
	  searchShow: {
	      type: Boolean,
	      default: true
	  },
	  exportShow: {
	      type: Boolean,
	      default: true
	  },
	  enableShow: {
	      type: Boolean,
	      default: true
	  },
	  deleteShow: {
	      type: Boolean,
	      default: false
	  }
	},
	data() {
		return {
			checkAllGroup:[],
		};
	},
	mounted() {
		this.checkAllGroup = this.columns.map(item=>item.title);
		
	},
	computed: {},
	methods: {
		//显示和隐藏搜索区域
		handleSearch() {
			this.$emit('on-search');
		},
		handleOpenCreate(){
			this.$emit('on-create');
		},
		handleColumnFilter(){
			let currentColumns = this.columns.filter(item =>{
			    return this.checkAllGroup.indexOf(item.title) >= 0;
			});
			this.$emit('on-column-filter',currentColumns);
		},
		handleExport(val){
			this.$emit('on-export',val);
		},
		handleMulti(val){
			this.$emit('on-multi',val);
		}
	}
};
</script>
<style>
.tool-content {
	display: block;
	width: 100%;
	height: 30px;
}
</style>
