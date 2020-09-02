<template>
	<div>
		<Card dis-hover class="list-no-page-card">
			<div class="base-tools ivu-bb">
				<Row type="flex" justify="center" align="middle">
					<Col span="16">
						<div class="title" >角色设置</div>
					</Col>
					<Col span="8">
						<div class="ivu-text-right"><Button type="default" icon="md-add" @click="handleOpenAdd">增加</Button></div>
					</Col>
				</Row>	
			</div>		
		<Table 
		ref="tableMain"
		 :columns="columnsData" 
		 :data="dataList"
		 :loading="loading" 
		 >
		 <template slot-scope="{ row, index }" slot="action">
			  <Icon type="ios-create-outline" size="18"  @click="handleOpenEdit(row)" class="ivu-mr-8" />
		 </template>
		 </Table>
		<TableAdd v-if="loadAdd" v-model="addModalStatus" @add-closed="handleCloseAdd"></TableAdd>
		<TableEdit v-if="loadEdit" v-model="editModalStatus" :templateData="templateData" @edit-closed="handleCloseEdit"></TableEdit>
		
		</Card>
	</div>
</template>
<script>
import TableAdd from './table-add';
import TableEdit from './table-edit';
import { listRole} from '@/api/setting/role';
export default {
	components: {TableAdd, TableEdit},
	data() {
		return {
			templateData: {},
			columnsData: [
				{
					title: '序号',
					type: 'index',
					width: 60,
					align: 'center'	
				},
				{
					title: '角色名称',
					key: 'name',
				},
				{
					title: '时间',
					key: 'created_at',
				},
				{
					title: '操作',
					slot: 'action',
					maxWidth:100,
				}
			],
			loading:false,
			dataList:[],
			loadAdd: false,
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
			const sendData = {page: 1,pagesize: -1};
			listRole(sendData).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.dataList = res.data.result;
				} else {
					this.$Message.error(res.message);
				}
			})
			.catch(err => {
				this.loading = false;
			});
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
