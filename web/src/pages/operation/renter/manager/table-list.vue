<template>
	<div class="list-index-table">
		<Card class="search_box ivu-mt-8" :bordered="false" dis-hover>
			<Row type="flex" justify="center" align="middle">
				<Col span="16">
					<table-form @on-submit="handleSearch" :searchStatus="searchStatus" />
				</Col>
			    <Col span="8">
				<Tools
					@on-create="handleOpenAdd"
					@on-export="handleExport"
					:columns="columns"
					:selectedData="selectedData"
					@on-multi="handleMulti"
					:deleteShow="deleteShow"
					:enableShow="enableShow"
					@on-column-filter="handleColumnFilter"
				></Tools>
				</Col>
		</Row>
		</Card>
		<Card dis-hover class="list-card">
			<p slot="title" v-if="menuTitle!=''">{{menuTitle}}</p>
		<Table 
		ref="tableMain"
		 :columns="columnsData" 
		 @on-select="handleSelect"
		 @on-select-cancel="handleSelectCancel"
		 @on-select-all="handleSelectAll"
		 @on-select-all-cancel="handleSelectAllCancel"
		 :data="list" 
		 :loading="loading" 
		 @on-row-dblclick="handleOpenView"></Table>
		 
		<div class="ivu-mt ivu-text-center"><Page :total="pageInfo.totalNum" show-total :page-size="pageSize" @on-change="handleChangePage" /></div>
		</Card>
		<TableAdd v-if="loadAdd" v-model="addModalStatus" @add-closed="handleCloseAdd"></TableAdd>
		<TableEdit v-if="loadEdit" v-model="editModalStatus" :templateData="templateData" @edit-closed="handleCloseEdit"></TableEdit>
		<TableView ref="tableView" v-if="loadView" v-model="viewModalStatus" :templateData="templateData" @view-closed="handleCloseView" @on-edit="handleOpenEdit"></TableView>
	</div>
</template>
<script>
import tableForm from './table-form';
import TableAdd from './table-add';
import TableEdit from './table-edit';
import TableView from './table-view';
import Tools from '@/components/Tools';
export default {
	components: { Tools, TableAdd,tableForm,TableEdit, TableView },
	props: {
		columns: {
			type: Array,
			default() {
				return [];
			}
		},
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		menuTitle: {
			type: String,
			default: ''
		},
		pageInfo: {
			type: Object,
			default: () => {}
		},
		pageSize: {
			type: Number,
			default: 0
		},
		loading: {
			type: Boolean,
			default: false
		},
		enableShow: {
		    type: Boolean,
		    default: false
		},
		deleteShow: {
		    type: Boolean,
		    default: false
		}
	},
	data() {
		return {
			templateData: {},
			checkAllGroup: [],
			columnsData: [],
			loadAdd: false,
			addModalStatus: false,
			loadEdit: false,
			editModalStatus: false,
			loadView: false,
			viewModalStatus: false,
			searchStatus:true,
			selectedData: []
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
			this.$emit('on-page-change', index);
		},
		//搜索
		handleSearch(val){
			this.$emit('on-search',val);
		},
	
		//列显示隐藏
		handleColumnFilter(val) {
			this.columnsData = val;
		},
		//打开新增界面
		handleOpenAdd() {
			this.loadAdd = true;
			this.$nextTick(() => {
				this.addModalStatus = true;
			});
		},
		//新增界面关闭
		handleCloseAdd(val) {
			this.$nextTick(() => {
				this.addModalStatus = false;
			});
			this.loadAdd = false;
			if (val === 1) {
				this.$emit('on-refresh');
			}
		},
		//打开编辑界面
		handleOpenEdit(row) {
			this.$set(this.templateData, 'id', row.id);
			// this.templateData = row;
			this.loadEdit = true;
			this.$nextTick(() => {
				this.editModalStatus = true;
			});
		},
		//编辑界面关闭
		handleCloseEdit(val) {
			this.$nextTick(() => {
				this.editModalStatus = false;
			});
			this.loadEdit = false;
			if (val === 1) {
				this.$refs.tableView.getRow();
				this.$emit('on-refresh');
			}
		},
		// HandleRowDbClick(val){
		// 	console.log(val);
		// },
		//打开查看界面
		handleOpenView(row) {
			this.$set(this.templateData, 'id', row.id);
			// this.templateData = row;
			this.loadView = true;
			this.$nextTick(() => {
				this.viewModalStatus = true;
			});
		},
		//关闭查看界面
		handleCloseView(val) {
			this.$nextTick(() => {
				this.viewModalStatus = false;
			});
			this.loadView = false;
			if (val === 1) {
				this.$emit('on-refresh');
			}
		},
		//数据导出
		handleExport(val) {
			this.$emit('on-export', val);
		},
		// 选中一项，将数据添加至已选项中
		handleSelect (selection, row) {
		    this.selectedData.push(row);
		},
		// 取消选中一项，将取消的数据从已选项中删除
		handleSelectCancel (selection, row) {
		    const index = this.selectedData.findIndex(item => item.name === row.name);
		    this.selectedData.splice(index, 1);
		},
		// 当前页全选时，判断已选数据是否存在，不存在则添加
		handleSelectAll (selection) {
		    selection.forEach(item => {
		        if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
		            this.selectedData.push(item);
		        }
		    });
		},
		// 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
		handleSelectAllCancel () {
		 this.selectedData = [];
		},
		// 清空所有已选项
		handleClearSelect () {
		    this.selectedData = [];
		},
		//批量操作
		handleMulti(val) {
			const enableData = {
				type:val,
				data:this.selectedData.map(item=>item.id)
			};
			this.$emit('on-multi', enableData);
		}
	}
};
</script>
