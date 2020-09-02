<template>
	<div>
		<Card dis-hover class="ivu-mb-8 list-no-page-card">
			<div class="base-tools ivu-bb">
				<Row type="flex" justify="center" align="middle">
					<Col span="16">
						<div class="title" >合同模板</div>
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
			  <Icon type="ios-eye-outline" size="18"  @click="handlePreview(row.file_path)" class="ivu-mr-8" />
			  <Icon type="ios-trash-outline" size="18"  @click="handleRemove(row.id)" class="ivu-mr-8" />
		 </template>
		 </Table>
		<TableAdd v-if="loadAdd" v-model="addModalStatus" @add-closed="handleCloseAdd"></TableAdd>
		<TableView v-if="loadView" v-model="viewModalStatus" :templateData="templateData" @view-closed="handleCloseView" @on-edit="handleOpenEdit"></TableView>
		</Card>
	</div>
</template>
<script>
import TableAdd from './table-add';
import TableView from './table-view';
import Tools from '@/components/Tools';
import { listContractTemplate,delContractTemplate} from '@/api/setting/setting';
import Setting from '@/setting';
export default {
	components: { Tools, TableAdd, TableView },
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
					title: '模板名称',
					key: 'name',
				},
				{
					title: '添加时间',
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
			ossURL:'',
			docPrevURL:''
		};
	},
	methods:{
		loadData() {
			this.loading = true;
			const senddata = {type:1,page: 1,pagesize: -1};
			listContractTemplate(senddata).then(res => {
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
		handlePreview(val){
			if(val==''){
					this.$Message.error('附件不存在！');
				}else{
					const viewUlr = this.docPrevURL+this.ossURL+encodeURIComponent(val);
					window.open(viewUlr);
				}
		
		},
		removeTemplate(id) {
			this.loading = true;
			const senddata = {Ids:[id]};
			delContractTemplate(senddata).then(res => {
				this.loading = false;
				if (res.code === 200) {
					this.$Message.info("删除成功！")
					this.loadData();
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
		//删除模板
		handleRemove(val) {
		 this.$Modal.confirm({
		                    title: '操作确认框',
		                    content: '<p>是否删除该模版?</p>',
		                    onOk: () => {
		                        this.removeTemplate(val)
		                    },
		                    onCancel: () => {
		                        
		                    }
		                });
		},


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
		}
	},
	mounted() {
		this.ossURL = Setting.ossURL;
		this.docPrevURL = Setting.docPrevURL;
		this.loadData();
		
	},
	computed: {},
};
</script>
