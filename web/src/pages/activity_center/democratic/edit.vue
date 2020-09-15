<template>
  <div>
    <Modal v-model="showModal" title="修改民主评议" :loading="showLoading" :mask-closable="false" width="40%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" label-position="left" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row>
					  <Col span="24">
              <FormItem prop="title" label="评议标题">
                <Input type="text" v-model="formData.title" placeholder="请输入评议标题"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="date" label="评议日期">
                <DatePicker type="date" v-model="formData.date" placeholder="选择日期" style="width:100%;" transfer></DatePicker>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="org" label="评议组织">
                <Cascader :data="formatOrgList" v-model="formData.org" :render-format="orgFormat" change-on-select transfer></Cascader>
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
      },
      orgList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      formatOrgList() {
        return formatCascader(this.orgList)
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          title: '',
          date: '',
          org: []
        },
        ruleValidata: {
          title: { required: true, message: '标题不能为空', trigger: 'blur' },
          date: { required: true, type: 'date', message: '日期不能为空', trigger: 'change' },
          org: { required: true, type: 'array', message: '组织不能为空', trigger: 'change' }
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