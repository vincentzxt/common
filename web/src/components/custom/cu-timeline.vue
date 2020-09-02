<template>
  <div class="ivu-mt-16">
    <Timeline>
      <TimelineItem v-for="(v, k, i) in data" :key="i">
        <div class="body">
          <Card class="wrap" dis-hover v-for="(item, index) in v" :key="index" :style="{'margin-bottom': index !== v.length-1 ? '10px' : '0'}">
			<Row class="ivu-mb-8">
				<Col span="12">跟进人：{{ item.follow_username }} <Icon :custom="typeIcon[item.cus_follow_type].name" :size="typeIcon[item.cus_follow_type].size" :color="typeIcon[item.cus_follow_type].color"></Icon></Col>
				<Col span="12">联系人： {{ item.cus_contact_user }}</Col>
			</Row>
			<Row class="ivu-mb-8">
				<Col span="12">跟进时间：{{ item.cus_follow_time }}</Icon></Col>
				<Col span="12">客户状态：{{ item.cus_state }}</Col>
			</Row>
            <div class="content">
              <div>跟进内容：</div>
              <div>{{ item.cus_follow_record }}</div>
            </div>
          </Card>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  name: 'cu-timeline',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      typeIcon: {
        1: { name: 'iconfont icon-goutong', size: '20', color: '#2db7f5' },
        2: { name: 'iconfont icon-dianhua', size: '20', color: '#19be6b' },
        3: { name: 'iconfont icon-weixin', size: '20', color: '#19be6b' },
        4: { name: 'iconfont icon-qq', size: '20', color: '#2db7f5' },
        5: { name: 'iconfont icon-qita', size: '20', color: '#2db7f5' }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .w25 {
    width: 25%;
  }
  .fr {
    display: flex;
    justify-content: flex-end;
  }
  .header {
    margin-bottom: 10px;
  }
  .body {
    .wrap {
      .title {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        .group {
          display: flex;
          align-items: center;
        }
      }
      .content {
        padding: 5px 0;
      }
    }
  }
</style>