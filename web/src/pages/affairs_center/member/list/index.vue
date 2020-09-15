<template>
	<div class="container">
		<div class="sider" :style="{'min-height': screenHeight-70 + 'px'}">
			<div class="sider-header">
				<span>党组织列表</span>
			</div>
			<div class="sider-content">
				<Tree :data="orgListTree" @on-select-change="handleSelectOrg"></Tree>
			</div>
		</div>
		<div class="body">
			<div class="body-header">
				<div class="body-header-menu" :class="item.select ? 'body-header-selMenu' : 'body-header-noSelMenu'"
					v-for="(item, index) in menuData" :key="index" @click="handleClickMenu(item.id)">
					{{item.title}}
				</div>
			</div>
			<div class="body-middle">
				<div class="body-middle-left">
					<Button class="br5" type="primary" icon="md-add" @click="handleOpenAdd">添加</Button>
					<Button class="br5 ml10" @click="handleSearch">
					<Icon class="mr10" custom="iconfont icon-daoru" size="4" />导入</Button>
					<Button class="br5 ml10" @click="handleSearch">
					<Icon class="mr10" custom="iconfont icon-daochu" size="4" />导出</Button>
				</div>
				<div class="body-middle-right">
					<Select class="body-middle-right-select br5" v-model="searchKey">
						<Option value="name">党员姓名</Option>
						<Option value="org">组织名称</Option>
					</Select>
					<Input class="body-middle-right-input br5 ml10" type="text" v-model="searchContent" clearable/>
					<Button class="br5 ml10" type="primary" icon="md-search" @click="handleSearch">搜索</Button>
				</div>
			</div>
			<div class="body-content">
				<div class="body-content-group" v-for="(item, index) in memberData" :key="index" :style="{'margin-top': index > 3 ? '30px' : '0'}">
					<div class="body-content-group-left">
						<div class="body-content-group-left-title">
							<div class="body-content-group-left-title-left">
								<span>{{item.name}}</span>
								<span class="ml10" style="font-size:12px;">{{item.sex}}</span>
								<span class="ml10" style="font-size:12px;">{{item.age}}</span>
							</div>
							<div class="body-content-group-left-title-right">
								<Icon type="md-create" size="20" color="#ee4930"/>
								<Icon class="ml10" type="ios-trash" size="20" color="#ee4930"/>
							</div>
						</div>
						<div class="body-content-group-left-desc mt10">{{currentOrg.title}}</div>
						<div class="body-content-group-left-desc2 mt10">
							<div>
								<span>民族：</span><span style="color:#ee4930;">{{item.nation}}</span>
							</div>
							<div class="ml10">
								<span>职务：</span><span style="color:#ee4930;">{{item.post}}</span>
							</div>
						</div>
					</div>
					<div class="body-content-group-right">
						<img :src="photo" class="body-content-group-right-photo"/>
					</div>
				</div>
			</div>
		</div>
		<CAdd v-if="loadAdd" v-model="openAdd" @on-close="handleCloseAdd" :orgList="orgList" :orgPostList="orgPostList"></CAdd>
		<CEdit v-if="loadEdit" v-model="openEdit" @on-close="handleCloseEdit" :orgList="orgList" :orgPostList="orgPostList"></CEdit>
	</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import CEdit from './edit.vue';
	import { getOrgList } from '@/api/affairs_center/organization';
	import { getMemberListById } from '@/api/affairs_center/member';
	import { getOrgPostList } from '@/api/affairs_center/organization';
	import dayjs from 'dayjs';
	import { formatTree } from '@/libs/tools';
	import photo from '@/assets/images/photo.png';
	export default {
		name: 'organization-list',
		components: { Tables, CAdd, CEdit },
		data() {
			return {
				pageTitle:"党组织列表",
				loadAdd: false,
				openAdd: false,
				loadEdit: false,
				openEdit: false,
				menuData: [
					{ id: 1, title: '党员(8名)', select: 1 },
					{ id: 2, title: '支部书记(1名)', select: 0 },
					{ id: 3, title: '年轻党员(4名)', select: 0 },
					{ id: 4, title: '中年党员(4名)', select: 0 }
				],
				orgList: [],
				orgListTree: [],
				orgPostList: [],
				currentOrg: {},
				memberData: [],
				searchKey: 'name',
				searchContent: '',
				photo: photo
			};
		},
		computed: {
			filterChildOrg() {
				return this.orgList.filter((item) => {
					return item.fid == this.currentOrg.id;
				})
			}
		},
		methods: {
			getOrgData() {
				this.loading = true;
				getOrgList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.orgList = res.data.result;
						this.orgListTree = formatTree(res.data.result);
						this.currentOrg = this.orgList[0];
						this.getMemberData(this.currentOrg.id);
						this.getOrgPostData();
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			getMemberData(orgId) {
				let sendData = {
					oid: orgId
				}
				this.loading = true;
				getMemberListById(sendData).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.memberData = res.data.result;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			getOrgPostData() {
				this.loading = true;
				getOrgPostList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.orgPostList = res.data.result;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch(err => {
					this.loading = false;
				});
			},
			handleOpenAdd() {
				this.loadAdd = true;
				this.$nextTick(() => {
					this.openAdd = true;
				})
			},
			handleCloseAdd() {
				this.loadAdd = false;
				this.openAdd = false;
				this.getMemberData(this.currentOrg.id);
			},
			handleOpenEdit() {
				this.loadEdit = true;
				this.$nextTick(() => {
					this.openEdit = true;
				})
			},
			handleCloseEdit() {
				this.loadEdit = false;
				this.openEdit = false;
				this.getMemberData(this.currentOrg.id);
			},
			handleSelectOrg(val) {
				this.currentOrg = val[0];
			},
			handleClickMenu(id) {
				this.menuData.map((item) => {
					if (item.id == id) {
						item.select = 1
					} else {
						item.select = 0
					}
				})
			},
			handleSearch() {

			}
		},
		mounted () {
			this.getOrgData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
