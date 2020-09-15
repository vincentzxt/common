<template>
  <div>
    <Modal v-model="showModal" title="修改会议记录" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="24">
              <FormItem prop="name" label="会议名称">
                <Input type="text" v-model="formData.name" placeholder="请输入会议名称" disabled/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="summary" label="会议总结">
                <Input type="textarea" :rows="10" v-model="formData.summary"/>
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
      mettingName: {
        type: String, 
        default: ''
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          name: '',
          summary: ''
        },
        ruleValidata: {
          name: { required: true, message: '会议名称不能为空', trigger: 'blur' },
          summary: { required: true,message: '会议记录不能为空', trigger: 'blur' }
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
      this.formData.name = this.mettingName;
      this.formData.summary = "一、学习实践科学发展观的主要做法\r\t" + 
      "1、加强领导，精心组织，保证实践活动顺利开展。\r\t" +
      "2、加强学习，提高认识。\r\t" +
      "3、领导带头，发挥表率作用。\r" +
      "二、学习实践科学发展观的主要成效\r\t" +
      "1、思想认识更加统一。"
    }
  }
</script>