<template>
	<div>
		<Card dis-hover class="list-no-page-card">				
		<div class="base-tools ivu-bb">
			<Row type="flex" justify="center" align="middle">
				<Col span="16">
					<div v-if="selectedData.length === 0" class="title" >用户设置</div>
					<div v-if="selectedData.length !== 0">
						已选择 <strong v-color="'#2d8cf0'">{{ selectedData.length }}</strong> 项 <a href="#"  @click.prevent="handleClearSelect" class="ivu-ml-16 ivu-mr-16">清除选择</a> 
					<Button class="ivu-mr-8 ivu-ml-16"   @click="handleEnable(0)">启用</Button><Button  @click="handleEnable(1)">禁用</Button></div>
				</Col>
				<Col span="8">
					<div class="ivu-text-right"><Button type="default" icon="md-add" @click="handleOpenAdd">增加</Button></div>
				</Col>
			</Row>	
		</div>		
		<Table 
		ref="tableMain"
		 :columns="columnsData" 
		 @on-select="handleSelect"
		 @on-select-cancel="handleSelectCancel"
		 @on-select-all="handleSelectAll"
		 @on-select-all-cancel="handleSelectAllCancel"
		 :data="dataList"
		 :loading="loading" 
		 >
		 <template slot-scope="{ row, index }" slot="action">
			  <Icon type="ios-create-outline" size="18"  @click="handleOpenEdit(row)" class="ivu-mr-8" />
		 </template>
		 </Table>
		 <div class="ivu-mt ivu-mb ivu-text-center"><Page :total="pageInfo.totalNum" show-total :page-size="pageSize" @on-change="handleChangePage" /></div>
		<TableAdd v-if="loadAdd" v-model="addModalStatus" @add-closed="handleCloseAdd"></TableAdd>
		<TableEdit v-if="loadEdit" v-model="editModalStatus" :templateData="templateData" @edit-closed="handleCloseEdit"></TableEdit>
		</Card>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>
<script>
import TableAdd from './table-add';
import TableEdit from './table-edit';
import { getUser,enableUser } from '@/api/setting/auth';
export default {
	components: {TableAdd, TableEdit},
	data() {
		return {
			templateData: {},
			columnsData: [
				{
					title: '选择',
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
				      title: '序号',
					  type: 'index',
				      width: 60,
				      align: 'center',
				      indexMethod: (row) => {
				      return (row._index + 1) + (this.pageSize * this.currentPage) - this.pageSize;
				    }
				 },
				{
					title: '用户名',
					key: 'name',
					align: 'left',
					minWidth: 100,
				},
				{
					title: '姓名',
					key: 'realname',
					align: 'left',
					minWidth: 80,
					sortable: true
				},
				{
					title: '手机号码',
					key: 'phone',
					align: 'left',
					minWidth: 120
				},
				{
					title: '角色',
					key: 'role.name',
					align: 'left',
					minWidth: 100,
					render: (h, params) => {
					  return h('div', [h('span', params.row.role.name)])
					}
				},
				{
					title: '用户组',
					key: 'group.name',
					align: 'left',
					minWidth: 120,
					render: (h, params) => {
					  return h('div', [h('span', params.row.group.name)])
					}
				},
				{
					title: '状态',
					key: 'is_vaild',
					align: 'center',
					minWidth:100,
					render: (h, params) => {
						if (params.row.is_vaild == 0) {
							return h(
								'span','已启用'
							);
						} else {
							return h(
								'span','已禁用'
							);
						}
					}
				},
				{
					title: '创建日期',
					key: 'created_at',
					align: 'center',
					minWidth: 160,
					sortable: true
				},
				{
					title: '操作',
					slot: 'action',
					width:100,
				}
			],
			pageSize:15,
			currentPage: 1,
			pageInfo: {},
			loading:false,
			dataList:[],
			selectedData: [],
			loadAdd: false,
			spinShow:false,
			addModalStatus: false,
			loadEdit: false,
			editModalStatus: false,
			loadView: false,
			viewModalStatus: false,
		};
	},
	methods:{
		loadData() {
			this.loading = true;
			const sendData = {
				page: this.currentPage,
				pagesize: this.pageSize
			};
			getUser(sendData).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.dataList = res.data.result;
					this.pageInfo = res.data.pageInfo;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.loading = false;
			});
		},
		handleEnable(val){
			const Ids = this.selectedData.map(item=>item.id)
			const sendData={
				Ids:Ids,
				is_vaild:val
			}
			this.spinShow = true;
			enableUser(sendData).then(res => {
				this.spinShow = false;
				if (res.code === 200) {
					this.$Message.error("操作成功");
					this.loadData();
					this.selectedData = [];
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.spinShow = false;
			});
		},
		handleChangePage(val) {
			this.currentPage = val;
			this.loadData();
		},
		// 选中一项，将数据添加至已选项中
		handleSelect(selection, row) {
			this.selectedData.push(row);
		},
		// 取消选中一项，将取消的数据从已选项中删除
		handleSelectCancel(selection, row) {
			const index = this.selectedData.findIndex(item => item.id === row.id);
			this.selectedData.splice(index, 1);
		},
		// 当前页全选时，判断已选数据是否存在，不存在则添加
		handleSelectAll(selection) {
			selection.forEach(item => {
				if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
					this.selectedData.push(item);
				}
			});
		},
		// 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
		handleSelectAllCancel() {
			
			this.selectedData = [];
			
		},
		// 清空所有已选项
		handleClearSelect() {
			this.$refs.tableMain.selectAll(false)
			this.selectedData = [];
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
				this.loadData();
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
			this.editModalStatus = false;
			this.$nextTick(() => {
				this.loadEdit = false;
			});
			if (val === 1) {
				this.loadData();
			}
		},
	},
	mounted() {
		this.loadData();
	},
	computed: {},
};
</script>
