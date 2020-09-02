<template>
	<div>
		   <Drawer
            title="查看用户"
            v-model="showViewModal"
            width="50%"
            :mask-closable="false"
			class="drawer-no-padding"
        >
		<div class="drawer-content">
		<Card dis-hover  :bordered="false">
		<Form ref="form" :model="formData"  :label-width="80" label-position="left"  class="form-view">
			<FormItem label="用户名">{{formData.name}}</FormItem>
			<FormItem label="姓名">{{formData.realname}}</FormItem>
			<FormItem label="手机号">{{formData.phone}}</FormItem>
			<FormItem label="用户角色">{{formData.role.name}}</FormItem>
			<FormItem label="用户组">{{formData.group.name}}</FormItem>
			<FormItem label="创建时间">{{formData.created_at}}</FormItem>
			<FormItem label="描述">{{formData.remark}}</FormItem>
		</Form>
		</Card>	
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
			<div class="drawer-footer-tool">
					<Button style="margin-right: 8px" @click="showViewModal = false">关闭</Button>
					<Button type="primary" @click="handleEdit">编辑</Button>
			  </div>	
	     </Drawer>    
	</div>
</template>

<script>
import { editUser, getUserById } from '@/api/setting/auth';
import { getRole } from '@/api/common/global';

export default {
	name: 'table-view',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		templateData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			viewid:0,
			formData: {
				id:0,
				name:'',
				realname:'',
				phone:'',
				password:'',
				role:{name:''},
				group:{name:''},
				remark: ''
			},
			roleList: [],
			showViewModal: false,
			loadingView: true,
			spinShow: true
		};
	},
	methods: {
		getRow(){
			this.spinShow = true
			const senddata = {id:this.viewid};
			getUserById(senddata)
				.then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
					}else{
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.$Message.error(err.message);
					this.spinShow = false
					// 异常情况
				});
		},
		handleEdit(){
			this.$emit("on-edit",this.formData);
		}
		
	},
	watch: {
		value() {
			this.showViewModal = this.value;
			if (this.showViewModal === false) {
			}else{
				this.getRow()
				
			}
		},
		showViewModal(val) {
			if (!val) {
				this.$emit('view-closed',0);
			}
		}
	},
	mounted() {
		this.viewid = this.templateData.id;
	}
};
</script>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>