<template>
    <Submenu :name="menu.path">
        <template slot="title">
            <i-menu-side-title :menu="menu" />
        </template>
        <template v-for="(item, index) in menu.children">
            <i-menu-side-item v-if="item.children === undefined || !item.children.length" :menu="item" :key="index" style="margin-left:12px;" />
            <i-menu-side-submenu v-else :menu="item" :key="index"/>
        </template>
    </Submenu>
</template>
<script>
    import iMenuSideItem from './menu-item';
    import iMenuSideTitle from './menu-title';

    export default {
        name: 'iMenuSideSubmenu',
        components: { iMenuSideItem, iMenuSideTitle },
        props: {
            menu: {
                type: Object,
                default () {
                    return {}
                }
            }
        }
    }
</script>
