<template>
  <div>
    <Modal v-model="showModal" title="民主评议记录" :loading="showLoading" :mask-closable="false" width="40%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" label-position="left" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row>
					  <Col span="24">
              <FormItem label="评议标题">
                <div>{{formData.title}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="评议日期">
                <div>{{formData.date}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="评议组织">
                <div>{{formData.org[formData.org.length-1]}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="record" label="会议记录">
                <Input type="textarea" :rows="3" v-model="formData.record"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="proposal" label="会议建议">
                <Input type="textarea" :rows="3" v-model="formData.proposal"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="plan" label="整改方案">
                <Input type="textarea" :rows="3" v-model="formData.plan"/>
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
  import { formatCascader, cloneObject } from '@/libs/tools';
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
          title: '',
          date: '',
          org: [],
          record: '',
          proposal: '',
          plan: ''
        },
        ruleValidata: {
          record: { required: true, message: '会议记录不能为空', trigger: 'blur' },
          proposal: { required: true, message: '会议建议不能为空', trigger: 'blur' },
          plan: { required: true, message: '整改方案不能为空', trigger: 'blur' }
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
      },
      orgFormat(labels, selectedData) {
        let index = labels.length - 1;
        let data = selectedData[index] || false;
        if (data && data.code) {
          return labels[index] + ' - ' + data.code;
        }
        return labels[index];
      }
    },
    watch: {
      value() {
        this.showModal = this.value;
      }
    },
    mounted() {
      this.formData = cloneObject(this.templateData);
    }
  }
</script>