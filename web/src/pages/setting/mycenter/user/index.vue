<template>
    <div class="setting-account-safety">
        <Card :bordered="false"  title="个人设置"  dis-hover>
        <div class="ivu-mt ivu-pl ivu-pr">
			<Row type="flex" justify="center" align="middle">
			    <Col span="22">
			        <h4>基本设置</h4>
			        <p>个人账户信息设置</p>
			    </Col>
			    <Col span="2" class="ivu-text-right">
					<Button @click="handleOpenInfo">修改</Button>
			    </Col>
			</Row>
			<Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>账户密码</h4>
                    <p>修改密码</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                	<Button @click="handleOpenSafety">修改</Button>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>绑定手机</h4>
                    <p>已绑定手机号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <Button @click="handleOpenPhone">修改</Button>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle" class="ivu-mb-16">
                <Col span="22">
                    <h4>微信绑定</h4>
                    <p>当前未绑定微信账号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>设置</i-link>
                </Col>
            </Row>
        </div>
		</Card>
		<info v-if="loadInfo" v-model="infoModalStatus" @info-closed="handleCloseInfo"></info>	
		<safety v-if="loadSafety" v-model="safetyModalStatus" @safety-closed="handleCloseSafety"></safety>
		<phone v-if="loadPhone" v-model="phoneModalStatus" @phone-closed="handleClosePhone"></phone>
    </div>
</template>
<script>
	import info from './info';
	import safety from './safety';
	import phone from './phone';
    export default {
		components: { info,safety,phone },
        data () {
            return {
				loadInfo:false,
				infoModalStatus:false,
				loadSafety:false,
				safetyModalStatus:false,
				loadPhone:false,
				phoneModalStatus:false
            }
        },
		methods:{
			//打开基本界面
			handleOpenInfo() {
				this.loadInfo = true;
				this.$nextTick(() => {
					this.infoModalStatus = true;
				});
			},
			//关闭基本界面
			handleCloseInfo(val) {
				this.infoModalStatus = false;
				this.$nextTick(() => {
					this.loadInfo = false;
				});
				
			},
			//打开修改密码界面
			handleOpenSafety() {
				this.loadSafety = true;
				this.$nextTick(() => {
					this.safetyModalStatus = true;
				});
			},
			//关闭修改密码界面
			handleCloseSafety(val) {
				this.safetyModalStatus = false;
				this.$nextTick(() => {
					this.loadSafety= false;
				});
			},
			//打开修改密码界面
			handleOpenPhone() {
				this.loadPhone = true;
				this.$nextTick(() => {
					this.phoneModalStatus = true;
				});
			},
			//关闭修改密码界面
			handleClosePhone(val) {
				this.phoneModalStatus = false;
				this.$nextTick(() => {
					this.loadPhone= false;
				});
			},
		}
    }
</script>
<style lang="less">
    .setting-account-safety{
        .ivu-col{
            p{
                margin-top: 8px;
                color: #808695;
            }
        }
    }
</style>
