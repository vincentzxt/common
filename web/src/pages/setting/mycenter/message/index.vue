<template>
	<div class="full-height message-box">
		<div class="message-left">
			<Card title="我的消息" :bordered="false" dis-hover :padding="0">
				<CellGroup @on-click="handleChangeCell">
					<Cell title="全部消息" name="1" :selected="isRead === '1'" />
					<Cell :title="'未读消息'+ countData.unread_count" name="2" :selected="isRead === '2'" />
					<Cell title="已读消息" name="3" :selected="isRead === '3'" />
					<Cell title="已发送消息" name="4" :selected="isRead === '4'" />
				</CellGroup>
			</Card>
		</div>
		<div class="message-right">
			<receiveMsg :isRead="isRead" :title="title" @on-refresh="loadData" v-if="isRead!=='4'"/>
			<sendMsg :isRead="isRead" :title="title" v-if="isRead==='4'"/>
		</div>
	</div>
</template>
<script>
import receiveMsg from './receive-msg';
import sendMsg from './send-msg';
import { countMessage } from '@/api/setting/message';

export default {
	name: 'message',
	components: { receiveMsg,sendMsg },
	data() {
		return {
			isRead: '1',
			title: '全部消息',
			countData:{
				read_count: 0,
				total: 0,
				unread_count: ''
			}
		};
	},
	methods: {
		handleChangeCell(name) {
			this.isRead = name;
			switch(name){
				case '1':
					this.title='全部消息';
					break;
				case '2':
					this.title='未读消息';
					break;
				case '3':
					this.title='已读消息';
					break;
				case '4':
					this.title='已发送消息';
					break;
				default:
					this.title='全部消息';
					break;
			}
		},
		loadData(){
			this.loading = true;
			const senddata = {};
			countMessage(senddata)
				.then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.countData.unread_count = '('+res.data.unread_count+')';
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
		}
	},
	mounted() {
		this.loadData()
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
</style>
