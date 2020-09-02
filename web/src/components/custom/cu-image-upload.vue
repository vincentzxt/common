<template>
	<div><div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="baseUrl+item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
		:accept="accept"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
		:default-file-list="defaultImage"
        :before-upload="handleBeforeUpload"
        multiple
        :headers = headers
        type="drag"
        :action = api
        style="display: inline-block;width:58px;" 
		v-if="imageShow">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
        <img :src="viewUrl" style="width: 100%">
    </Modal>
</div>	
</template>
<script>
	import util from '@/libs/util'
	
    export default {
		name: 'img_upload',
		props: {
		  baseUrl: {
		    type: String,
		    default: ''
		  },
		  api: {
		    type: String,
		    default: ''
		  },
		  maxSize: {
		    type: Number,
		    default: 10240
		  },
		  defaultImage: {
		      type: Array,
		      default: () => {
		          return []
		      }
		  }
		},
        data () {
            return {
                imgName: '',
                visible: false,
                uploadList: [],
                headers: {
                  Authorization: ''
                },
				accept:'.png,.jpeg,.jpg',
                viewUrl: '',
				imageShow:true
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.$emit('uploadImgs', this.uploadList);
            },
            handleSuccess (res, file) {
				file.url = res.data.path;
				this.uploadList = this.$refs.upload.fileList;
                this.$emit('uploadImgs', this.uploadList);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式出错',
                    desc: file.name + '只能是jpg或者png'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出最大文件限制',
                    desc: '图片  ' + file.name + ' 太大, 不能超过10M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 10;
                    if (!check) {
                        this.$Notice.warning({
                            title: '最多只能上传10张图片.'
                        });
                    }
                    return check;
                }
        },
		watch:{
		},
        mounted () {
			this.uploadList = this.$refs.upload.fileList;
			this.headers.Authorization = 'Bearer ' + util.cookies.get('token');
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>