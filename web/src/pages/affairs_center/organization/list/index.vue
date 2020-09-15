<template>
		<div class="container">
			<div class="sider" :style="{'min-height': screenHeight-70 + 'px'}">
				<div class="sider-header">
					<div class="sider-header-title">党组织列表</div>
					<Icon class="sider-header-btn" type="md-add" size="25" @click="handleOpenAdd"/>
				</div>
				<div class="sider-content">
					<Tree :data="orgListTree" @on-select-change="handleSelectOrg"></Tree>
				</div>
			</div>
			<div class="body">
					<Card class="body-header" bordered style="box-shadow:1px 1px 10px #dcdee2;">
						<Row>
							<Col span="6" class="body-header-group" v-for="(item, index) in headerData" :key="index">
								<Icon class="body-header-group-icon" :custom="'iconfont icon-' + item.icon"  size="45" color="#ee4930"/>
								<div class="body-header-group-text">
									<div class="body-header-group-text-title">{{item.title}}</div>
									<div class="body-header-group-text-desc">{{item.desc}}</div>
								</div>
							</Col>
						</Row>
					</Card>
					<div class="body-middle">
						<img :src="img1" class="body-middle-img"/>
						<div class="body-middle-text">
							<div class="body-middle-text-group">
								<div class="body-middle-text-group-desc">党组织名称：</div>
								<div class="body-middle-text-group-title">{{currentOrg.title}}</div>
							</div>
							<div class="body-middle-text-group">
								<span>党委书记：</span>
								<span class="body-middle-text-group-title">张书记</span>
							</div>
							<div class="body-middle-text-group">
								<img :src="photo" class="body-middle-text-group-photo"/>
							</div>
						</div>
					</div>
					<Card class="body-content">
						<div class="body-content-title">
							<Icon type="ios-square" size="20" color="#ee4930"/>
							<span class="body-content-title-text">下级党支部</span>
							<span class="body-content-title-desc">({{filterChildOrg.length}})</span>
						</div>
						<Row class="body-content-child">
							<Col span="6" class="body-content-child-group" v-for="(item, index) in filterChildOrg" :key="index" :style="{'margin-top': index > 3 ? '30px' : '0'}">
								<Icon custom="iconfont icon-hongqi"  size="25" color="#ee4930"/>
								<div class="body-content-child-group-text">
									<div class="body-content-child-group-text-title">{{item.title}}</div>
									<div class="body-content-child-group-text-desc">党员：150人 会议：7次</div>
								</div>
							</Col>
						</Row>
				</Card>
			</div>
			<CAdd v-if="loadAdd" v-model="openAdd" @on-close="handleCloseAdd" :orgList="orgList"></CAdd>
		</div>
</template>
<script>
	import Tables from '@/components/custom/cu-table';
	import { logMessage } from '@/libs/data';
	import CAdd from './add.vue';
	import { getOrgList } from '@/api/affairs_center/organization';
	import dayjs from 'dayjs';
	import { formatTree } from '@/libs/tools';
	import img1 from '@/assets/images/orglist-middle.jpg';
	import photo from '@/assets/images/photo.png';
	export default {
		name: 'organization-list',
		components: { Tables, CAdd },
		data() {
			return {
				pageTitle:"党组织列表",
				loadAdd: false,
				openAdd: false,
				headerData: [
					{ icon: 'duoren', title: '党员总数', desc: '1305人' },
					{ icon: 'huiyi', title: '会议总数', desc: '1次' },
					{ icon: 'dongtai', title: '支部动态', desc: '0篇' },
					{ icon: 'zuzhi', title: '下级党支部', desc: '17个' }
				],
				orgList: [],
				orgListTree: [],
				currentOrg: {},
				img1: img1,
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
			getData() {
				this.loading = true;
				getOrgList().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.orgList = res.data.result;
						this.orgListTree = formatTree(res.data.result);
						this.currentOrg = this.orgList[0];
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
				this.getData();
			},
			handleSelectOrg(val) {
				this.currentOrg = val[0];
			}
		},
		mounted () {
			this.getData();
		}
	}
</script>

<style lang="less" scoped>
	@import './index.less';
</style>
