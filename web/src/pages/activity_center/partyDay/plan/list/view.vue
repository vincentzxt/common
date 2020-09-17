<template>
  <div>
    <Modal v-model="showModal" title="活动计划详情" :loading="showLoading" :mask-closable="false" width="60%" :styles="{top: '20px'}" class="cutomer-modal-box-gay" @on-cancel="handleClose" footer-hide mask-closable>
      <Form ref="form" :model="formData" :label-width="100" label-colon>
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<Row :gutter="16">
					  <Col span="12">
              <FormItem label="计划标题">
                <div class="color-sub">{{formData.title}}</div>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="党组织">
                <div class="color-sub">{{formData.org[formData.org.length-1]}}</div>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="参与人员">
                <span class="color-sub" :class="index > 0 ? 'ml20' : ''" v-for="(item, index) in formatMemberData" :key="index">{{item}}</span>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="计划内容">
                <div class="color-sub">{{formData.content}}</div>
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
          title: '',
          org: '',
          members: [],
          content: ''
        }
      }
    },
    computed: {
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