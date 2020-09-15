<template>
  <div>
    <Modal v-model="showModal" title="添加组织结构" :loading="showLoading" :mask-closable="false" width="70%"   :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" label-position="top">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<p slot="title">基本信息</p>
					<Row :gutter="16">
					  <Col span="12">
              <FormItem prop="name" label="组织名称">
                <Input type="text" v-model="formData.name" placeholder="请输入组织名称"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="address" label="组织地址">
                <Input type="text" v-model="formData.address" placeholder="请输入组织地址"/>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
		</Modal>
  </div>
</template>

<script>
	import { logMessage } from '@/libs/data';
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          name: '',
          address: ''
        },
        ruleValidata: {
          name: { required: true, message: '组织名称不能为空', trigger: 'blur' },
          address: { required: true, message: '组织地址不能为空', trigger: 'blur' }
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let senddata = this.formData;
            this.showLoading = true;
            setTimeout(() => {
              this.showLoading = false;
              this.$nextTick(() => {
                this.showLoading = true;
              })
              this.$Notice.success({ title: logMessage.addSuccess });
              this.$emit('on-close');
            }, 1000);
          } else {
            this.showLoading = false;
            this.$nextTick(() => {
              this.showLoading = true;
            })
          }
        })
      },
      handleClose() {
        this.$emit('on-close');
      }
    },
    watch: {
      value() {
        this.showModal = this.value;
      }
    }
  }
</script>