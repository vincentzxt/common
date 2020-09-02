<template>
	<div>
		<Tools @on-create="handleOpenAdd"  :columns="columns" @on-column-filter="handleColumnFilter" @on-search="handleSearchStatus"></Tools>
		<Table ref="table" :columns="columnsData" :data="list" :loading="loading" class="ivu-mt">
			<template slot-scope="{ row, index }" slot="date">
				{{ row.created_at }}
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<a @click="handleOpenEdit(row)">编辑</a>
				<Divider type="vertical" />
				<a>查看</a>
			</template>
		</Table>
		<div class="ivu-mt ivu-text-center"><Page :total="pageInfo.totalNum" :page-size="pageSize" @on-change="handleChangePage" /></div>
		<TableAdd v-if="loadAdd"  v-model="addModalStatus"  @add-closed="handleCloseAdd"></TableAdd>
		<TableEdit v-if="loadEdit"  v-model="editModalStatus" :templateData="templateData"  @edit-closed="handleCloseEdit"></TableEdit>
	</div>
</template>
<script>
import TableAdd from './table-add';
import TableEdit from './table-edit';
import Tools from '@/components/Tools';
export default {
	components: {Tools,TableAdd,TableEdit},
	props: {
	  columns: {
	    type: Array,
	    default() {
	      return []
	    }
	  },
	  list: {
	    type: Array,
	    default() {
	      return []
	    }
	  },
	  pageInfo: {
	  	type: Object,
	  	default: () => {}
	  },
	  pageSize: {
	    type: Number,
	    default:0
	  },
	loading: {
	  type: Boolean,
	  default:false
	},		
	},  
	data() {
		return {
			templateData:{},
			checkAllGroup:[],
			columnsData:[],
			loadAdd:false,
			addModalStatus:false,
			loadEdit:false,
			editModalStatus:false,
		};
	},
	mounted() {
		//this.limitData();
		this.columnsData = this.columns;
	},
	computed: {},
	methods: {	
		//切换页码
		handleChangePage(index) {
			this.$emit('on-page-change',index);
		},
		//显示和隐藏搜索区域
		handleSearchStatus() {
			this.$emit('on-search');
		},
		//列显示隐藏
		handleColumnFilter(val){
			this.columnsData = val;
			console.log(val);
		},
		//打开新增界面
		handleOpenAdd(){
			this.loadAdd = true;
			this.$nextTick(() => {
			  this.addModalStatus = true
			})
		},
		//新增界面关闭
		handleCloseAdd(val){
			this.$nextTick(() => {
			  this.addModalStatus = false
			})
			this.loadAdd = false
			if(val===1){
				this.limitData();
			}
		},
		//打开编辑界面
		handleOpenEdit(row){
			this.$set(this.templateData, 'id', row.id)
			// this.templateData = row;
			this.loadEdit = true;
			this.$nextTick(() => {
			  this.editModalStatus = true
			})
		},
		//编辑界面关闭
		handleCloseEdit(val){
			
			this.$nextTick(() => {
			  this.editModalStatus = false
			})
			this.loadAdd = false
		    if(val===1){
				this.limitData();
			}
		}
	}
};
</script>