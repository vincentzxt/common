<template>
  <div>
    <Modal v-model="showModal" title="添加党员" :loading="showLoading" :mask-closable="false" width="50%"   :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="12">
              <FormItem prop="name" label="姓名">
                <Input type="text" v-model="formData.name" placeholder="请输入姓名"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="code" label="证件号码">
                <Input type="text" v-model="formData.number" placeholder="请输入证件号码"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="sex" label="性别">
                <Select v-model="formData.sex">
                  <Option value="男">男</Option>
                  <Option value="男">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话">
                <Input type="text" v-model="formData.mobile" placeholder="请输入联系电话"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="党员编号">
                <Input type="text" v-model="formData.code" placeholder="请输入党员编号"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="org" label="党支部">
                <Cascader :data="formatOrgList" v-model="formData.org" :render-format="orgFormat" change-on-select transfer></Cascader>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem prop="joinDate" label="入党时间">
                <DatePicker type="date" v-model="formData.joinDate" placeholder="选择日期" style="width:100%;" transfer></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="申请时间">
                <DatePicker type="date" v-model="formData.applyDate" placeholder="选择日期" style="width:100%;" transfer></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="党员荣誉">
                <Select v-model="formData.honor" clearable transfer>
                  <Option value="优秀共产党员">优秀共产党员</Option>
                  <Option value="优秀党务工作者">优秀党务工作者</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="党员状态">
                <Select v-model="formData.status" transfer>
                  <Option value="正式党员">正式党员</Option>
                  <Option value="预备党员">预备党员</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="所属职务">
                <Select v-model="formData.post" transfer>
                  <Option v-for="(item, index) in orgPostList" :key="index" :value="item.name">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="备注">
                <Input type="textarea" v-model="formData.remarks" :rows="3"/>
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
      },
      orgPostList: {
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
          number: '',
          sex: '男',
          mobile: '',
          code: '',
          org: [],
          joinDate: '',
          applyDate: '',
          honor: '',
          status: '正式党员',
          post: '党员',
          remarks: ''
        },
        ruleValidata: {
          name: { required: true, message: '姓名不能为空', trigger: 'blur' },
          number: { required: true, message: '证件号码不能为空', trigger: 'blur' },
          sex: { required: true, message: '性别不能为空', trigger: 'blur' },
          org: { required: true, type: 'array', message: '党支部不能为空', trigger: 'change' },
          joinDate: { required: true, type: 'date', message: '入党时间不能为空', trigger: 'change' }
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