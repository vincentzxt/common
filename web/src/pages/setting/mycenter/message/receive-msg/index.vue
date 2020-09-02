<template>
	<div>
			<Card :bordered="false" dis-hover :padding="8">
				<p slot="title">{{title}}</p>
				<div class="tool">
					<Button class="ivu-mr-8" :disabled="selectedData.length == 0" @click="handleDel">删除</Button>
					<Button class="ivu-mr-16" :disabled="selectedData.length == 0" @click="handleRead" v-if="isRead != '3'">标记为已读</Button>
					<!-- 	<ButtonGroup>
						<Button>通知</Button>
						<Button>待办</Button>
					</ButtonGroup> -->
				</div>
				<div class="ivu-b">
					<Table
						:columns="columns"
						@on-select="handleSelect"
						@on-select-cancel="handleSelectCancel"
						@on-select-all="handleSelectAll"
						@on-select-all-cancel="handleSelectAllCancel"
						@on-row-dblclick="handleOpenView"
						:loading="loading"
						:data="dataList"
					></Table>
				</div>
				<div class="ivu-mt ivu-text-center"><Page :total="pageInfo.totalNum" show-total :page-size="pageSize" @on-change="handleChangePage" /></div>
			</Card>
		<TableView v-if="loadView" v-model="viewModalStatus" :templateData="templateData" @view-closed="handleCloseView"></TableView>
	</div>
</template>
<script>
import { listReceiveMessage, setMessageRead, delMessage } from '@/api/setting/message';
import TableView from './table-view';
export default {
	name: 'message',
	props: {
		isRead: {
			type: String,
			default: '1'
		},
		title: {
			type: String,
			default: '全部消息'
		}
	},
	components: { TableView },
	data() {
		return {
			currentType: 'info', // info | safety | account | notification
			loadView: false,
			viewModalStatus: false,
			templateData: {},
			columns: [
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
				{ title: '消息标题', key: 'title', minWidth: 200,ellipsis: true },
				{ title: '接收时间', key: 'created_at', minWidth: 180 },
				{ title: '消息类型', key: 'proj_name', minWidth: 100,
					 render: (h, params) => {
						 if(params.row.type==1){
							 return h('div', '通知消息')
						 }else{
							 return h('div', '待办任务')
						 }
						
					 },
				 },
				{ title: '发件人', key: 'sender_username', minWidth: 100 }
			],
			loading: false,
			currentPage: 1,
			pageSize: 10,
			dataList: [],
			searchData: {},
			pageInfo: {},
			selectedData: []
		};
	},
	methods: {
		loadData() {
			this.loading = true;
			const page = {
				page: this.currentPage,
				pagesize: this.pageSize,
				is_read: this.isRead
			};
			const senddata = Object.assign(page, this.searchData);
			listReceiveMessage(senddata)
				.then(res => {
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
		handleRead() {
			const msg_ids = this.selectedData.map(item => item.id);
			const senddata = {
				msgIds: msg_ids
			};
			setMessageRead(senddata)
				.then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.currentPage = 1;
						this.dataList = [];
						this.loadData();
						this.selectedData=[];
						this.$emit('on-refresh',1);
						this.$Message.success('操作成功！');
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
		},
		handleDel() {
			this.loading = true;
			const msg_ids = this.selectedData.map(item => item.id);
			const senddata = {
				msgIds: msg_ids
			};

			delMessage(senddata)
				.then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.currentPage = 1;
						this.dataList = [];
						this.selectedData=[];
						this.loadData();
						this.$emit('on-refresh',1);
						this.$Message.success('操作成功！');
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
		},
		handleChangePage(val) {
			this.currentPage = val;
			this.loadData();
		},
		handleChangeCell(name) {
			this.isRead = name;
			this.currentPage = 1;
			this.dataList = [];
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
			this.selectedData = [];
		},
		//打开查看界面
		handleOpenView(row) {
			this.$set(this.templateData, 'id', row.id);
			this.$set(this.templateData, 'title', row.title);
			this.$set(this.templateData, 'created_at', row.created_at);
			this.$set(this.templateData, 'sender_username', row.sender_username);
			this.$set(this.templateData, 'content', row.content);
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
			if(val==1){
				if(this.isRead == '2'){
					this.loadData();
					this.$emit('on-refresh',1);
				}
			}
		}
	},
	watch:{
		isRead(){
			this.loadData();
		}
	},
	mounted() {
		this.loadData();
	}
};
</script>
<style lang="less">
.message-left {
	// float: left;
	margin-right: 10px;
	width: 240px;
	background-color: #ffffff;
	height: 100%;
	.ivu-card-head {
		padding: 10px 16px;
	}
	.ivu-cell {
		padding-left: 30px;
	}
	.ivu-cell-selected,
	.ivu-cell.ivu-cell-selected:hover {
		background: #ffffff;
	}
	.ivu-cell-selected,
	.ivu-cell-selected:hover {
		font-weight: 500;
	}
}
.message-right {
	width: 100%;
	// overflow: hidden;
	.ivu-card-head {
		padding: 10px 16px;
	}
	.tool {
		margin-bottom: 5px;
	}
	.ivu-table-cell {
		font-size: 12px !important;
	}
}
.message-box {
	display: flex;
	flex-direction: row;
}
</style>
