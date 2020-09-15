<template>
  <div>
    <Modal v-model="showModal" title="修改会议列表" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-ok="handleSubmit" @on-cancel="handleClose">
      <Form ref="form" :model="formData" :rules="ruleValidata" label-position="left" :label-width="100">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="8">
              <FormItem prop="name" label="会议名称">
                <Input type="text" v-model="formData.name" placeholder="请输入会议名称"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="date" label="会议时间">
                <DatePicker type="datetime" v-model="formData.date" placeholder="选择日期" format="yyyy-MM-dd hh:mm:ss" style="width:100%;" transfer></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="address" label="会议地点">
                <Input type="text" v-model="formData.address" placeholder="请输入会议地点"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="org" label="组织部门">
                <Cascader :data="formatOrgList" v-model="formData.org" :render-format="orgFormat" change-on-select transfer></Cascader>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="host" label="主持人">
                <Select v-model="formData.host" transfer>
                  <Option v-for="(item, index) in filterMemberList" :key="index" :value="item.name">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="type" label="会议类型">
                <Select v-model="formData.type" transfer>
                  <Option value="组织生活">组织生活</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="members" label="参会人员">
                <Transfer :data="transferMemberData" :target-keys="formData.members" :titles="['全部党员', '参会人员']" @on-change="memberChange"></Transfer>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem prop="introduce" label="会议简介">
                <Input type="textarea" :rows="3" v-model="formData.introduce"/>
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
      },
      templateData: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data () {
      return {
        showModal: false,
        showLoading: true,
        formData: {
          name: '',
          date: '',
          address: '',
          org: '',
          host: '',
          type: '支部大会',
          members: [],
          introduce: ''
        },
        ruleValidata: {
          name: { required: true, message: '会议名称不能为空', trigger: 'blur' },
          date: { required: true, type: 'date', message: '会议时间不能为空', trigger: 'change' },
          address: { required: true, message: '会议地点不能为空', trigger: 'blur' },
          org: { required: true, type: 'array', message: '组织部门不能为空', trigger: 'change' },
          host: { required: true, message: '主持人不能为空', trigger: 'change' },
          type: { required: true, message: '会议类型不能为空', trigger: 'change' },
          members: { required: true, type: 'array', message: '参会人员不能为空', trigger: 'change' },
          introduce: { required: true, message: '会议简介不能为空', trigger: 'blur' }
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
      },
      memberChange(val) {
        this.formData.members = val;
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