<template>
    <Form ref="search-form"  :label-width="labelWidth" label-position="left" v-if="searchStatus">
           <Input search placeholder="请输入用户组名称" v-model="formData.realname" style="width: 250px; margin-right: 10px;" @on-search="handleSubmit" /> 
    </Form>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
		props: {
		  searchStatus: {
		    type: Boolean,
		    default: false
		  }
		  },
        data () {
            return {
                formData: {
						realname: '',
						search_date:['',''],
                }
            }
        },
        computed: {
            labelWidth () {
                return this.isMobile ? undefined : 100;
            },
            labelPosition () {
                return this.isMobile ? 'top' : 'right';
            }
        },
        methods: {
			handelSetDate(val){
				this.formData.search_date = val;
			},
            handleSubmit() {
                this.$emit('on-submit', this.formData);
            },
            handleReset () {
                this.$refs.form.resetFields();
                this.$emit('on-reset',this.data);
            }
        }
    }
</script>
