<template>
	<div>
		<Card dis-hover class="list-no-page-card">
			<div class="base-tools ivu-bb">
				<Row type="flex" justify="center" align="middle">
					<Col span="16">
						<div class="title" >账户设置</div>
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
import Tools from '@/components/Tools';
import { listBank} from '@/api/setting/bank-manager';
export default {
	components: { Tools, TableAdd, TableEdit},
	props: {
		
	},
	data() {
		return {
			templateData: {},
			columnsData: [
				{
				      title: '序号', 
					  type: 'index',
				      width: 60,
				},	  
				{
					title: '账户名称',
					key: 'account_name',
					render: (h, params) => {
						if(params.row.is_vaild==1){
							return h('div', params.row.account_name+'【禁用】')
						}else{
							return h('div', params.row.account_name)
						}
						
					}
				},
				{
					title: '开户行',
					key: 'bank_name',
				},
				{
					title: '账号',
					key: 'account_number',
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
			const senddata = {type:1,page: 1,pagesize: -1};
			listBank(senddata).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.dataList = res.data;
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
