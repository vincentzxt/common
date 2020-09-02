<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in">
        <Dropdown trigger="click" class="ivu-notifications">
            <Icon custom="i-icon i-icon-notification" />
            <DropdownMenu slot="list" class="ivu-notifications-list">
                <Tabs value="notice" class="ivu-notifications-tabs">
                    <TabPane label="通知" name="notice">
                        <List>
                            <div v-if="messageList.length === 0" class="ivu-notifications-tab-empty">
                                <img class="ivu-notifications-tab-empty-img" :src="noMessage"/>
                                <div class="ivu-notifications-tab-empty-text">目前没有通知</div>
                            </div>
                            <div v-else>
                                <ListItem class="ivu-notifications-item" v-for="(item, index) in messageList" :key="index">
                                    <ListItemMeta :avatar="qq" :title="item.title" :description="'1小时前'"/>
                                </ListItem>
                            </div>
                            <span slot="footer" style="color:#2d8cf0">加载更多</span>
                        </List>
                    </TabPane>
                    <TabPane label="待办" name="pending">
                        <List>
                            <div v-if="todoList.length === 0" class="ivu-notifications-tab-empty">
                                <img class="ivu-notifications-tab-empty-img" :src="noMessage"/>
                                <div class="ivu-notifications-tab-empty-text">目前没有通知</div>
                            </div>
                            <div v-else>
                                <ListItem class="ivu-notifications-item" v-for="(item, index) in todoList" :key="index">
                                    <ListItemMeta :avatar="qq" :title="item.title"/>
                                </ListItem>
                            </div>
                            <span slot="footer" style="color:#2d8cf0">加载更多</span>
                        </List>
                    </TabPane>
                </Tabs>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
    import { mapState } from 'vuex';
    import { listReceiveMessage, setMessageRead} from '@/api/setting/message';
    import iconNoMessage from '@/assets/svg/icon-no-message.svg';
    import iconQQ from '@/assets/svg/icon-social-qq.svg';
    export default {
        name: 'iHeaderNotice',
        data () {
            return {
                badgeProps: {
                    offset: [20, 0]
                },
                messageList: [],
                todoList: [],
                messageLoading: false,
                followLoading: false,
                todoLoading: false,
				currentPage:0,
                noMessage: iconNoMessage,
                qq: iconQQ
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ]),
          /*  unreadMessage () {
                let unread = 0;
                this.messageList.forEach(item => {
                    if (!item.read) unread++;
                });
                return unread;
            },
            unreadTodo () {
                let unread = 0;
                this.todoList.forEach(item => {
                    if (!item.read) unread++;
                });
                return unread;
            }*/
        },
        methods: {
			loadData(){
				const sendData = {
					page: this.currentPage +1,
					pagesize: this.pageSize,
					is_read:2
				};
				listReceiveMessage(sendData)
					.then(res => {
					if (res.code === 200) {
						if(res.data.result.length > 0){
						    const messageList = res.data.result.filter(item=>item.type==1);
							const todoList = res.data.result.filter(item=>item.type==2);
						    this.messageList = this.messageList.concat(messageList);
                            this.todoList = this.todoList.concat(todoList);
						    this.currentPage = this.currentPage +1
						}
						this.pageInfo = res.data.pageInfo;
					} else {
						this.$Message.error(res.message);
					}
				}).catch(() => {
					
				})
			},
			
            handleLoadMore () {
                this.loadData();
				
            },
            handleClear (tab) {
                this.clearUnread(tab.name);
            },
            clearUnread (type) {
               const msgIds=this.messageList.map(item=>item.id)
			   const senddata={msgIds:msgIds}
               setMessageRead(senddata).then(res => {
               	if (res.code === 200) {
					this.currentPage=0;
					this.messageList=[];
               		this.loadData()
               	} else {
               		this.$Message.error(res.message);
               	}
               }).catch(() => {
               	
               })
            }
        },
        mounted () {
		//	this.loadData();
            // this.messageList = [...this.messageBaseList];
            // this.followList = [...this.followBaseList];
            // this.todoList = [...this.todoBaseList];
        }
    }
</script>
