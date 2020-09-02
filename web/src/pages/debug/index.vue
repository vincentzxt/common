<template>
  <Card>
    <CuTable 
      :datas="datas"
      :columns="columns"
      :pageInfo="pageInfo"
      @changePage='handleChangePage'
      @changePageSize='handleChangePageSize'
      showAdd showEnable showDisable showDel></CuTable>
  </Card>
</template>

<script>
import CuTable from '@/components/custom/cu-table'
export default {
  components: {
    CuTable
  },
  data() {
    return {
      datas: [
        { proj_name: '项目测试1', proj_type: '园区类型1'},
        { proj_name: '项目测试2', proj_type: '园区类型1'},
        { proj_name: '项目测试3', proj_type: '园区类型2'},
        { proj_name: '项目测试4', proj_type: '园区类型2'},
        { proj_name: '项目测试5', proj_type: '园区类型2'},
        { proj_name: '项目测试1', proj_type: '园区类型1'},
        { proj_name: '项目测试2', proj_type: '园区类型1'},
        { proj_name: '项目测试3', proj_type: '园区类型2'},
        { proj_name: '项目测试4', proj_type: '园区类型2'},
        { proj_name: '项目测试5', proj_type: '园区类型2'},
        { proj_name: '项目测试1', proj_type: '园区类型1'},
        { proj_name: '项目测试2', proj_type: '园区类型1'},
        { proj_name: '项目测试3', proj_type: '园区类型2'},
        { proj_name: '项目测试4', proj_type: '园区类型2'},
        { proj_name: '项目测试5', proj_type: '园区类型2'},
        { proj_name: '项目测试1', proj_type: '园区类型1'},
        { proj_name: '项目测试2', proj_type: '园区类型1'},
        { proj_name: '项目测试3', proj_type: '园区类型2'},
        { proj_name: '项目测试4', proj_type: '园区类型2'},
        { proj_name: '项目测试5', proj_type: '园区类型2'},
        { proj_name: '项目测试1', proj_type: '园区类型1'},
        { proj_name: '项目测试2', proj_type: '园区类型1'},
        { proj_name: '项目测试3', proj_type: '园区类型2'},
        { proj_name: '项目测试4', proj_type: '园区类型2'},
        { proj_name: '项目测试5', proj_type: '园区类型2'}
      ],
      columns: [
        {
					title: '选择',
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
				    title: '序号', 
					  type: 'index',
				    width: 60
				 },
				{ title: '项目名称', key: 'proj_name', sortable: true,minWidth: 120},
        { title: '项目类型', key: 'proj_type', sortable: true,minWidth: 80},
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  'margin-right': '10px'
                },
                on: {
                  click: () => {
                    this.handleEdit(params.row)
                  }
                }
              }, '编辑'),
              h('a', {
                on: {
                  click: () => {
                    this.handleView(params.row)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      pageInfo: {
        page: 1,
        pages: 2,
        rows: 20,
        pageSize: 15
      }
    }
  },
  methods: {
    handleChangePage(page) {
      this.pageInfo.page = page
      //this.handleDataList()
    },
    handleChangePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize
      //this.handleDataList()
    }
  }
}
</script>

<style lang="less" scoped>
  .rd {
    color: red;
  }
  .gr {
    color: green;
  }
  .ft24 {
    font-size: 24px;
  }
  .ft40 {
    font-size: 40px;
  }
</style>