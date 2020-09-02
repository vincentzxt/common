<template>
	<div>
		<Card :bordered="false" dis-hover class="ivu-mt">
			<TagSelect title="字典类型：" :data="dictType" name="dict_type" value="dict_value" @click="handleDictTypeChange"></TagSelect>
			<Divider dashed />
			<table-form  @on-submit="handleSearch" @on-reset="handleSearch" :searchStatus="searchStatus" />
			<table-list ref="table" :loading="loading" :columns="columns" :list="list" :pageSize="pageSize" :pageInfo="pageInfo" :currentPage="currentPage" @on-page-change="handleChangePage" @on-search="handleSearchStatus"/>
		</Card>
    </div>
</template>
<script>
    import tableForm from './table-form';
    import tableList from './table-list';
	import { getDictType, getDictByType } from '@/api/setting/dict';
    import TagSelect from '@/components/tag-select';
    export default {
        name: 'dict-list',
        components: { tableForm, tableList, TagSelect },
        data () {
            return {
				 columns: [
				 	{
				 		title: '选择',
				 		type: 'selection',
				 		width: 60,
				 		align: 'center'
				 	},
				 	{
				 		title: '用户名',
				 		key: 'name',
				 		align: 'center',
				 		minWidth: 100,
				 		sortable: true,
				 	},
				 	{
				 		title: '姓名',
				 		key: 'realname',
				 		align: 'center',
				 		minWidth: 100,
				 	},
				 	{
				 		title: '手机号码',
				 		key: 'phone',
				 		align: 'center',
				 		minWidth: 140,
				 	},
				 	{
				 		title: '创建日期',
				 		slot: 'date',
				 		align: 'center',
				 		minWidth: 140,
				 	},
				 	{
				 		title: '操作',
				 		slot: 'action',
				 		align: 'center',
				 		checked: true,
				 		minWidth: 140
				 	}
				 ],
				loading: false,
				dictType: [],
				dictList:[], 
				pageInfo: {},
				searchData: {},
				currentPage: 1,
				pageSize: 2,
				searchStatus: false
            }
        },
        methods: {
			handleSearch(data){
				this.searchData = data;
				this.loadData();
			},
			handleSearchStatus(){
				this.searchStatus = !this.searchStatus;
			},
			handleChangePage(val) {
				this.currentPage = val;
				this.loadData();
			},
			loadData() {
				this.loading = true;
				getDictType().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.dictType = res.data;
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			handleDictTypeChange(item) {
				const sendData = {
					dict_key: item.dict_type
				}
				getDictByType(sendData).then(res => {
					this.loading = false;
					console.log(res);
					if (res.code === 200) {
						this.dictList = res.data;
					}
				})
				.catch(err => {
					this.loading = false;
				});
			}
        },
        mounted () {
			this.loadData();
        }
    }
</script>
