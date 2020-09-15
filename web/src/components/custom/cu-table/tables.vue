<template>
	<div>
		<div class="cu-table-form">
			<div class="cu-table-form-left">
				<Button v-if="showAdd" class="br5" type="primary" icon="md-add" @click="handleAdd">新增</Button>
        <Dropdown v-if="showEnable || showDisable || showDel" class="ml10" trigger="click" @on-click="handleBatch">
          <Button class="br5" icon="md-list">批量操作</Button>
          <DropdownMenu slot="list">
            <DropdownItem v-if="showEnable" name="enable">启用</DropdownItem>
            <DropdownItem v-if="showDisable" name="disable">停用</DropdownItem>
            <DropdownItem v-if="showDel" name="delete">删除</DropdownItem>
          </DropdownMenu>
        </DropDown>
				<Button v-if="showExport" class="br5 ml10" @click="handleExport">
					<Icon class="mr10" custom="iconfont icon-daochu" size="4" />导出</Button>
			</div>
			<div class="cu-table-form-right">
				<div class="cu-table-form-right-condition">
          <slot name="condition1"></slot>
					<slot name="condition2"></slot>
					<slot name="condition3"></slot>
					<slot name="condition4"></slot>
					<slot name="condition5"></slot>
        </div>
        <Button class="br5 ml10" type="primary" icon="md-search" @click="handleSearch">搜索</Button>
			</div>
		</div>
		<div class="cu-table-body mt10">
			<Table 
				ref="tableMain"
				:data="datas"
				:columns="columns" 
				@on-selection-change='handleSelectChange'
				:loading="loading">
			</Table>
		</div>
		<div class="cu-table-page mt10">
			<Page 
				class="cu-table-page"
				:total="pageInfo.totalNum"
				:page-size="pageInfo.pageSize"
				:page-size-opts="pageInfo.pageSizeOpts"
				transfer show-total show-sizer
				prev-text='上一页'
				next-text='下一页'
				@on-change="handleChangePage"
				@on-page-size-change="handleChangePageSize"></Page>
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>
<script>
export default {
	props: {
		datas: {
			type: Array,
			default() {
				return [];
			}
		},
		columns: {
			type: Array,
			default() {
				return [];
			}
		},
		pageInfo: {
			type: Object,
			default: {}
		},
		showAdd: {
			type: Boolean,
			default: false
		},
		showEnable: {
			type: Boolean,
			default: false
		},
		showDisable: {
			type: Boolean,
			default: false
		},
		showDel: {
			type: Boolean,
			default: false
		},
		showExport: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selList: [],
			spinShow: false
		}
	},
	mounted() {
	},
	methods: {
		//点击新增按钮
		handleAdd() {
			this.$emit('on-add');
		},
		//复选框发生改变
		handleSelectChange (selection) {
      if (selection.length !== 0) {
        this.selList = []
        for (let i = 0; i < selection.length; i++) {
          this.selList.push(selection[i].id)
        }
      } else {
        this.selList = []
      }
		},
		//点击批处理按钮
		handleBatch(val) {
			if (val == 'delete') {
				this.$emit("on-batch", { name: 'delete', data: this.selList });
			} else if (val == 'enable') {
				this.$emit("on-batch", { name: 'enable', data: this.selList });
			} else if (val == 'disable') {
				this.$emit("on-batch", { name: 'disable', data: this.selList });
			}
		},
		//点击导出按钮
		handleExport() {
			this.$emit('on-export');
		},
		//搜索
		handleSearch(){
			this.$emit('on-search');
		},
		//切换页码
		handleChangePage(index) {
			this.$emit('on-page-change', index);
		},
		//切换显示行数
		handleChangePageSize (size) {
      this.pageInfo.pageSize = size;
      this.$emit('on-page-size-change', size);
		}
	}
};
</script>

<style lang="less">
	@import './tables.less';
</style>
