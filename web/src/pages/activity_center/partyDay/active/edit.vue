<template>
  <div>
    <Modal v-model="showModal" title="编辑党日活动计划" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="24">
              <FormItem prop="title" label="标题">
                <Input type="text" v-model="formData.title" placeholder="请输入标题"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="date" label="活动时间">
                <DatePicker type="datetime" v-model="formData.date" placeholder="选择日期" format="yyyy-MM-dd hh:mm:ss" style="width:100%;" transfer></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="auditor" label="审核人员">
                <Select v-model="formData.auditor">
                  <Option v-for="(item, index) in filterMemberList" :key="index" :value="item.name">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="content" label="活动内容">
                <Input type="textarea" :rows="5" v-model="formData.content"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="require" label="活动要求">
                <Input type="textarea" :rows="5" v-model="formData.require"/>
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
  import { cloneObject } from '@/libs/tools';
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      memberList: {
        default: () => {
          return []
        }
      },
      templateData: {
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
          date: '',
          auditor: '',
          content: '',
          require: ''
        },
        ruleValidata: {
          title: { required: true, message: '标题不能为空', trigger: 'blur' },
          date: { required: true, type: 'date', message: '活动时间不能为空', trigger: 'change' },
          auditor: { required: true, message: '审核人员不能为空', trigger: 'change' }
        }
      }
    },
    computed: {
      filterMemberList() {
        return this.memberList.filter((item)=>{
          return item.isSecretary == 1
        })
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
      this.formData = cloneObject(this.templateData);
    }
  }
</script>