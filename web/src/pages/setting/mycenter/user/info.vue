<template>
    <div>
		<Modal v-model="showModal" title="基本设置" :loading="loading" :mask-closable="false" width="45%"  :styles="{top: '20px'}" @on-ok="handleSubmit">
		<Card :bordered="false" dis-hover :padding="8">
        <Form ref="form" :model="formData" :rules="rules" label-position="left"  :label-width="80">
            <Row type="flex" :gutter="48">
            
                <Col span="24">
				
                    <FormItem label="用名户" prop="name" disabled>
                        <Input v-model="formData.name" disabled/>
                    </FormItem>
					<FormItem label="姓名" prop="realname">
					    <Input v-model="formData.realname" disabled />
					</FormItem>
					
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="formData.email" placeholder="请输入邮箱" />
                    </FormItem>
					<FormItem label="手机号" prop="phone">
					    <Input v-model="formData.phone" placeholder="请输入邮箱" />
					</FormItem>
                    <FormItem label="个人介绍" prop="desc">
                        <Input v-model="formData.remark" type="textarea" :rows="4" placeholder="请输入个人介绍" />
                    </FormItem>
                <!--    <FormItem label="头像" prop="avatar">
                        <Upload :action="uploadUrl" :show-upload-list="showUploadList"  :headers="headers" :accept="accept" :on-success="handleUploadSuccess">
                            <Avatar :src="full_avatar" class="setting-account-info-avatar ivu-b" />
                        </Upload>
                    </FormItem> -->
                </Col>
            </Row>
        </Form>
		</Card>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</Modal>	
    </div>
</template>
<script>
	import { userinfo,editInfo} from '@/api/setting/account';
	import TableAdd from './table-add';
	import Setting from '@/setting';
	import util from '@/libs/util'
    export default {
		components: {TableAdd},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			templateData: {
				type: Object,
				default: () => {}
			}
		},
        data () {
			const validatePhone = (rule, value, callback) => {
			            if (!value) {
			                return callback(new Error('手机号不能为空'));
			            } else if (!/^1[34578]\d{9}$/.test(value)) {
			                callback('手机号格式不正确');
			            } else {
			                callback();
			            }   
			        };
            return {
                grid1: {
                    xl: {
                        span: 12,
                        order: 2
                    },
                    lg: {
                        span: 24,
                        order: 1
                    },
                    md: {
                        span: 24,
                        order: 1
                    },
                    sm: {
                        span: 24,
                        order: 1
                    },
                    xs: {
                        span: 24,
                        order: 1
                    }
                },
                grid2: {
                    xl: {
                        span: 12,
                        order: 1
                    },
                    lg: {
                        span: 24,
                        order: 2
                    },
                    md: {
                        span: 24,
                        order: 2
                    },
                    sm: {
                        span: 24,
                        order: 2
                    },
                    xs: {
                        span: 24,
                        order: 2
                    }
                },
              
                rules: {
   
                    mail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
                },
				showModal:false,
				spinShow:false,
				loading: false,
				showUploadList:false,
				uploadUrl:'',
				baseUrl:'',
				headers: {
				  Authorization: ''
				},
				full_avatar:'',
				accept:'.png,.jpeg,.jpg',
				formData:{
					avatar: '',
					name: '',
					realname: '',
					mail: '',
					desc: '',
					company: '',
				},
            }
        },
        methods: {
			getRow(){
				this.spinShow = true
				const senddata = {};
				userinfo(senddata).then(res => {
					this.spinShow = false
					if (res.code === 200) {
						this.formData = res.data;
						this.full_avatar = this.baseUrl+res.data.avatar
					}else{
						this.$Message.error(res.message);
					}
				}).catch(err => {
					this.spinShow = false
				});
			},
			handleUploadSuccess(res, file){
				this.formData.avatar = res.data.path;
				this.full_avatar = this.baseUrl+res.data.path;
				console.log(this.full_avatar);
			},
            handleSubmit () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.spinShow = true
                        const senddata = {
							phone:this.formData.phone,
							email:this.formData.email,
							avatar:this.formData.avatar,
							remark:this.formData.remark
						};
                        editInfo(senddata).then(res => {
                        	this.spinShow = false
                        	if (res.code === 200) {
                        		this.$Message.success("个人信息更新成功！")
                        	}else{
                        		this.$Message.error(res.message);
                        	}
                        }).catch(err => {
                        	this.spinShow = false
                        });
                    }
                });
            },
			
        },
		watch: {
			value() {
				this.showModal = this.value;
				if (this.showModal === false) {
					this.handleReset();
				}
			},
			showModal(val) {
				if (!val) {
					this.$emit('info-closed',0);
				}
			}
		},
		mounted() {
			this.getRow();
			this.headers.Authorization = 'Bearer ' + util.cookies.get('token');
			this.uploadUrl = Setting.apiBaseURL+'/api/common/upload/img';
			this.baseUrl = Setting.ossURL;
		}
    }
</script>
<style lang="less">
    .setting-account-info{
        &-avatar{
            width: 90px;
            height: 90px;
        }
    }
</style>
