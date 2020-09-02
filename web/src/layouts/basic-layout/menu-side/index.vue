<template>
    <div>
        <div class="i-layout-sider-logo" :class="{ 'i-layout-sider-logo-dark': siderTheme === 'dark' }">
            <transition name="fade-quick">
                <i-link to="/" v-show="!hideLogo">
                    <img src="@/assets/images/logo-small.png" v-if="menuCollapse">
                    <img src="@/assets/images/logo.png" v-else-if="siderTheme === 'light'">
                    <img src="@/assets/images/logo-dark.png" v-else>
                </i-link>
            </transition>
        </div>
		
		<!-- <div class="menu-top">{{currentHeader.title}}</div> -->
        <Menu
            ref="menu"
            class="i-layout-menu-side i-scrollbar-hide"
            :theme="siderTheme"
            :accordion="menuAccordion"
            :active-name="activePath"
            :open-names="openNames"
            width="auto">
			<!--<div style="background-color: #FFFFFF;padding: 15px; margin-bottom: 5px;">
			    <CellGroup  style="background: #eeeeee;border-radius: 5px;" @on-click="handleProject">
			        <Cell :title="currentProj.proj_name||'未选择'" label="当前项目">
			            <Icon custom="iconfont icon-community" slot="icon" size="30" />
			            <Icon type="ios-arrow-forward" slot="extra" size="18"/> 
			        </Cell>
			    </CellGroup>
			</div> -->
            <template v-if="!menuCollapse" v-for="(item, index) in filterSider">
                <i-menu-side-item v-if="item.children === undefined || !item.children.length" :menu="item" :key="index" />
                <i-menu-side-submenu v-else :menu="item" :key="index" />
            </template>
            <template v-else>
                <Tooltip :content="tTitle(item.title)" placement="right" v-if="item.children === undefined || !item.children.length" :key="index">
                    <i-menu-side-item :menu="item" hide-title />
                </Tooltip>
                <i-menu-side-collapse v-else :menu="item" :key="index" top-level />
            </template>
        </Menu>
    </div>
</template>
<script>
    import iMenuSideItem from './menu-item';
    import iMenuSideSubmenu from './submenu';
    import iMenuSideCollapse from './menu-collapse';
    import tTitle from '../mixins/translate-title';

    import { mapState, mapGetters } from 'vuex';

    export default {
        name: 'iMenuSide',
        mixins: [ tTitle ],
        components: { iMenuSideItem, iMenuSideSubmenu, iMenuSideCollapse},
        props: {
            hideLogo: {
                type: Boolean,
                default: false
            },
			currentProj: {
			  type: Object,
			  default() {
			    return {proj_name:'未选择'}
			  }
			},
        },
		data () {
		    return {
				showStatus:false
				}
		}	,
        computed: {
            ...mapState('admin/layout', [
                'siderTheme',
                'menuAccordion',
                'menuCollapse'
            ]),
            ...mapState('admin/menu', [
                'activePath',
                'openNames',
				'headerName',
				'headerTitle'
            ]),
            ...mapGetters('admin/menu', [
                'filterSider',
				'currentHeader'
            ])
			
        },
		mounted (){
		},
        watch: {
            '$route': {
                handler () {
                    this.handleUpdateMenuState();
                },
                immediate: true
            },
            // 在展开/收起侧边菜单栏时，更新一次 menu 的状态
            menuCollapse () {
                this.handleUpdateMenuState();
            }
        },
        methods: {
			handleProject(){
				this.showStatus =  !this.showStatus;
				const data = { showProj : this.showStatus}
				this.$emit('on-project',data);
			},
            handleUpdateMenuState () {
                this.$nextTick(() => {
                    if (this.$refs.menu) {
                        this.$refs.menu.updateActiveName();
                        if (this.menuAccordion) this.$refs.menu.updateOpened();
                    }
                });
            }
        }
    }
</script>
