<template>
  <div>
    <Modal v-model="showModal" title="添加组织结构" :loading="showLoading" :mask-closable="false" width="40%"   :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row>
					  <Col span="24">
              <FormItem prop="name" label="组织名称">
                <Input type="text" v-model="formData.name" placeholder="请输入组织名称"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="所属组织">
                <Cascader :data="formatOrgList" v-model="formData.fname" :render-format="orgFormat" change-on-select transfer></Cascader>
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
  import { formatCascader } from '@/libs/tools';
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      orgList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          name: '',
          fname: []
        },
        ruleValidata: {
          name: { required: true, message: '组织名称不能为空', trigger: 'blur' }
        }
      }
    },
    computed: {
      formatOrgList() {
        return formatCascader(this.orgList)
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
    }
  }
</script>