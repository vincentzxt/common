<template>
  <div class="container">
    <div class="header">
      <div class="header-title">{{ title }}</div>
      <div class="header-extend">
        <Button class="header-extend-singleBtn" icon="ios-add" size="small" type="primary" v-if="singleBtn" @click="handleSingleClick" :style="{'margin-right': batchBtn ? '10px' : '0'}">{{ singleBtnTitle }}</Button>
        <Button class="header-extend-batchBtn" icon="ios-add" size="small" type="primary" v-if="batchBtn" @click="handleBatchClick">{{ batchBtnTitle }}</Button>
      </div>
    </div>
    <div class="content">
      <Form ref="cu-dynamic-form" label-position="top">
        <Row :gutter="24" class="content-row" v-for="(item, index1) in data" :key="index1">
          <Col :xl="child.lager" :lg="child.lager" :md="child.lager" :sm="child.small" :xs="child.small" v-for="(child, index2) in fields" :key="index2">
            <FormItem>
              <div slot="label" style="display:flex;align-items:center;">
                <div :style="{'margin-right': child.validate ? '2px' : '0'}">{{child.des}}</div>
                <div v-if="child.validate" style="color:#ed4014;font-size:20px;">*</div>
              </div>
              <Input v-if="child.edit" type="text" v-model="data[index1][child.name]" :placeholder="'请输入' + child.des" :disabled="view" />
              <div v-else :disabled="view">{{ data[index1][child.name] }}</div>
            </FormItem>
          </Col>
          <Col :xl="2" :lg="2" :md="2" :sm="2" :xs="2" v-if="showDelete">
            <Button type="error" size="small" @click="handleDelete(index1, item.id)">删除</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <Modal :title="batchBtnTitle" v-model="showModal" :mask-closable="false" @on-ok="handleBatchSubmit" width="800">
      <Form ref="form2" label-position="top">
        <Row :gutter="24">
          <Col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <FormItem label="请选择需要批量生成的字段：">
              <RadioGroup v-model="batchField">
                <Radio :label="item.name" v-for="(item, index) in filterFields" :key="index" :style="{'margin-left': index !== 0 ? '10px' : '0'}">{{ item.des }}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="24">
          <Col :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
             <FormItem>
              <Input type="text" v-model="prefix" placeholder="请输入输入前缀" />
            </FormItem>
          </Col>
          <Col :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
             <FormItem>
              <Input type="text" v-model="suffix" placeholder="请输入输入后缀" />
            </FormItem>
          </Col>
          <Col :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
             <FormItem>
              <Input type="text" v-model="startCode" placeholder="请输入开始编号" />
            </FormItem>
          </Col>
          <Col :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
             <FormItem>
              <Input type="text" v-model="endCode" placeholder="请输入结束编号" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'cu-dynamic-form',
  props: {
    title: {
      type: String,
      default: ''
    },
    singleBtn: {
      type: Boolean,
      default: true
    },
    singleBtnTitle: {
      type: String,
      default: '添加联系人'
    },
    batchBtn: {
      type: Boolean,
      default: false
    },
    batchBtnTitle: {
      type: String,
      default: '批量添加联系人'
    },
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    view: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showModal: false,
      batchField: '',
      prefix: '',
      suffix: '',
      startCode: '',
      endCode: ''
    }
  },
  computed: {
    filterFields () {
      return this.fields.filter((item) => {
        return item.edit
      })
    }
  },
  methods: {
    handleSingleClick () {
      let row = Object.assign({}, this.dataModel);
      this.data.push(row);
    },
    handleBatchClick () {
      this.showModal = true;
    },
    handleBatchSubmit () {
      for (let i = this.startCode; i <= this.endCode; i++) {
        let batch = Object.assign({}, this.dataModel);
        batch[this.batchField] = this.prefix + i + this.suffix;
        this.data.push(batch);
      }
    },
    handleDelete (index, id) {
      if (id !== 0) {
        this.$emit("delete", id)
      }
      this.data.splice(index, 1);
    }
  },
  mounted() {
  }
 }
</script>

<style lang="less" scope>
  .container {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    width:100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.5px solid #e8eaec;
      padding: 10px 0;
      &-title {
        font-weight: bold;
      }
    }
    .content {
      padding: 10px;
      &-row {
        display: flex;
        align-items: center;
      }
    }
  }
</style>

