<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min"> <span @click="handleOpenView" v-if="info.is_admin==1">{{ info.company_name }}</span><span v-else>{{ info.company_name }}</span>
    <TableView ref="tableView" v-if="loadView" v-model="viewModalStatus"  @view-closed="handleCloseView"></TableView>
	</span>	
</template>
<script>
	import TableView from './table-view';
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'iHeaderCompany',
		components: {TableView},
		data() {
			return {
				showViewModal:false,
				loadView: false,
				viewModalStatus: false
				}
		},		
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
        },
        methods: {
			//打开查看界面
			handleOpenView(row) {
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
			handleCompanySet(){
				this.showViewModal = true
			}
        }
    }
</script>
