<template>
	<div class="page-account">
		<Card :bordered="false" class="login-card">
			<div class="login-content">
				<div class="login-header">
				<!--	<img :src="icon" class="header-icon"></img>-->
					<div class="header-title">智慧党建管理系统</div>
				</div>
				<Form ref="form" :model="formData" :rules="ruleValidata">
					<FormItem prop="userName">
						<Input style="text-align:center;" size="large" prefix="ios-contact-outline" type="text" v-model="formData.userName" placeholder="请输入用户名"/>
					</FormItem>
					<FormItem prop="password">
						<Input size="large" prefix="ios-lock-outline" type="password" v-model="formData.password" placeholder="请输入密码"/>
					</FormItem>
					<div class="page-account-auto-login">
						<Checkbox v-model="autoLogin">{{ $t('page.login.remember') }}</Checkbox>
						<a style="color: #d62321;" href="">{{ $t('page.login.forgot') }}</a>
					</div>
					<Button type="primary" class="login-btn" size="large" :loading="loading" @click="handleSubmit">{{ $t('page.login.submit') }}</Button>
				</Form>
				<i-copyright class="copyright"></i-copyright>
			</div>
		</Card>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
import mixins from '../mixins';
import iCopyright from '@/components/copyright';
import icon from '@/assets/images/icon.png';

export default {
	mixins: [mixins],
	components: { iCopyright },
	data() {
		return {
			ruleValidata: {
				userName: [
					{ required: true, message: '请输入用户名！', trigger: 'blur' },
					{ min: 1, max: 30, message: '用户名不能超过30位!', trigger: 'change' }
				],
				password: [
					{ required: true, message: '请输入密码！', trigger: 'blur' },
					{ min: 1, max: 30, message: '密码不能超过30位!', trigger: 'change' }
				]
			},
			formData: {
				userName: '',
				password: ''
			},
			autoLogin: true,
			loading: false,
			icon: icon
		};
	},
	methods: {
		...mapActions('admin/account', ['login']),
		/**
		 * @description 登录
		 */
		handleSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.loading = true;
					let username = this.formData.userName;
					let password = this.formData.password;
					this.login({ username, password }).then(res => {
						this.loading = false;
						if (res.code === 200) {
							this.$router.replace(this.$route.query.redirect || '/');
						} else {
							this.$Message.error(res.message);
						}
					});
				} else {
					this.$Message.error('表单验证失败！');
					this.loading = false; 
				}
			})
		}
	}
};
</script>
<style lang="less">
@import "./index.less";
</style>
