<template>
  <div>
    <Modal v-model="showModal" title="添加活动计划" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="12">
              <FormItem prop="title" label="计划标题">
                <Input type="text" v-model="formData.title" placeholder="请输入计划标题"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="org" label="党组织">
                <Cascader :data="formatOrgList" v-model="formData.org" :render-format="orgFormat" change-on-select transfer></Cascader>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="members" label="参与人员">
                <Transfer :data="transferMemberData" :target-keys="formData.members" :titles="['全部党员', '参与人员']" @on-change="memberChange"></Transfer>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="content" label="计划内容">
                <Input type="textarea" :rows="3" v-model="formData.content"/>
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
          return []
        }
      },
      memberList: {
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          title: '',
          org: '',
          members: [],
          content: ''
        },
        ruleValidata: {
          title: { required: true, message: '计划标题不能为空', trigger: 'blur' },
          org: { required: true, type: 'array', message: '党组织不能为空', trigger: 'change' },
          members: { required: true, type: 'array', message: '参与人员不能为空', trigger: 'change' },
          content: { required: true, message: '计划内容不能为空', trigger: 'blur' }
        }
      }
    },
    computed: {
      formatOrgList() {
        return formatCascader(this.orgList)
      },
      filterMemberList() {
        return this.memberList.filter((item)=>{
          return item.isSecretary == 1
        })
      },
      transferMemberData() {
        let result = [];
        for (let item of this.memberList) {
          result.push({
            key: item.id,
            label: item.name
          })
        }
        return result;
      },
      transferMemberKey() {
        let result = [];
        for (let item of this.memberList) {
          result.push(item.id);
        }
        return result;
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
      },
      memberChange(val) {
        this.formData.members = val;
      }
    },
    watch: {
      value() {
        this.showModal = this.value;
      }
    }
  }
</script>