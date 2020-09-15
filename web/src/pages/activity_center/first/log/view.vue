<template>
  <div>
    <Modal v-model="showModal" title="查看组织结构" :loading="showLoading" :mask-closable="false" width="70%"   :styles="{top: '20px'}" class="cutomer-modal-box-gay">
      <div slot="footer">
        <Button type="primary" @click="handleClose">关闭</Button>
      </div>
      <Form ref="form" :model="formData" label-position="top">
				<Card dis-hover class="ivu-mb-8" :bordered="false">
					<p slot="title">基本信息</p>
					<Row :gutter="16">
					  <Col span="12">
              <FormItem label="组织名称">
                <Input type="text" v-model="formData.name" placeholder="请输入组织名称" disabled />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="组织地址">
                <Input type="text" v-model="formData.address" placeholder="请输入组织地址" disabled />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
		</Modal>
  </div>
</template>

<script>
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
          name: '',
          address: ''
        }
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
      this.formData = this.templateData;
    }
  }
</script>