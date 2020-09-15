<template>
  <div>
    <Modal v-model="showModal" title="添加党内职务" :loading="showLoading" :mask-closable="false" width="70%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" label-position="left" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row>
					  <Col span="24">
              <FormItem prop="name" label="职务名称">
                <Input type="text" v-model="formData.name" placeholder="请输入职务名称"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="备注">
                <Input type="textarea" :rows="3" v-model="formData.remarks" placeholder="请输入备注"/>
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
      },
      templateData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          name: '',
          remarks: ''
        },
        ruleValidata: {
          name: { required: true, message: '组织名称不能为空', trigger: 'blur' }
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
              this.$Notice.success({ title: logMessage.editSuccess });
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
    },
    mounted() {
      this.formData = this.templateData;
    }
  }
</script>