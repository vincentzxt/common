<template>
  <div>
    <Modal v-model="showModal" title="编辑党日活动计划" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay"@on-cancel="handleClose" footer-hide mask-closable>
      <Form ref="form" :model="formData" :label-width="100" label-colon>
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="24">
              <FormItem label="标题">
                <div class="color-sub">{{formData.title}}</div>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="活动时间">
                <div class="color-sub">{{formatDateData}}</div>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="审核人员">
                <div class="color-sub">{{formData.auditor}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="活动内容">
                <div class="color-sub">{{formData.content}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="活动要求">
                <div class="color-sub">{{formData.require}}</div>
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
  import dayjs from 'dayjs';
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
        }
      }
    },
    computed: {
      formatDateData() {
        return dayjs(this.formData.date).format('YYYY-MM-DD HH:mm:ss');
      },
      filterMemberList() {
        return this.memberList.filter((item)=>{
          return item.isSecretary == 1
        })
      }
    },
    methods: {
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