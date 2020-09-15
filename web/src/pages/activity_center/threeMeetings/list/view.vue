<template>
  <div>
    <Modal v-model="showModal" title="会议详情" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-cancel="handleClose" footer-hide mask-closable>
      <Form ref="form" :model="formData" label-position="left" :label-width="100" label-colon>
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="8">
              <FormItem label="会议名称">
                <div class="color-sub">{{formData.name}}</div>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="会议时间">
                <div class="color-sub">{{formatDateData}}</div>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="会议地点">
               <div class="color-sub">{{formData.address}}</div>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="组织部门">
                <div class="color-sub">{{formData.org[formData.org.length-1]}}</div>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="主持人">
                <div class="color-sub">{{formData.host}}</div>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="会议类型">
                <div class="color-sub">{{formData.type}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="参会人员">
                <span class="color-sub" :class="index > 0 ? 'ml20' : ''" v-for="(item, index) in formatMemberData" :key="index">{{item}}</span>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="会议简介">
                <div class="color-sub">{{formData.introduce}}</div>
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
        }
      }
    },
    computed: {
      formatDateData() {
        return dayjs(this.formData.date).format('YYYY-MM-DD HH:mm:ss');
      },
      formatMemberData() {
        let result = [];
        for (let item of this.formData.members) {
          let name = this.memberList.filter((i) => {
            if (i.id == item) {
              return i.name;
            }
          })[0].name;
          if (name) {
            result.push(name);
            continue;
          }
        }
        return result;
      }
    },
    methods: {
      handleClose() {
        this.$emit('on-close');
      },
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