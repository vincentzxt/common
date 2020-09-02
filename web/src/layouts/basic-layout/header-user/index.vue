<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
            <!-- <Avatar size="small" :src="info.avatar" /> -->
			 <Avatar  icon="ios-person" size="20" />
            <span class="i-layout-header-user-name" v-if="!isMobile">{{ info.name }}</span>
            <DropdownMenu slot="list">
                
                    <DropdownItem class="ivu-mb-8">
                        <!-- <Icon type="ios-contact-outline" /> -->
						<i-link to="/setting/mycenter/user">
                        <span>{{ $t('basicLayout.user.center') }}</span>
						</i-link>
                    </DropdownItem>
                
                <DropdownItem  name="logout">
                    <!-- <Icon type="ios-log-out" /> -->
                    <span>{{ $t('basicLayout.user.logOut') }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderUser',
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                }
            }
        }
    }
</script>
