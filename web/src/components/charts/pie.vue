<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'ChartPie',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    init (options) {
      let option = {
        title: {
          text: options.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14
          },
          subtext: options.total,
          subtextStyle: {
            color: '#17233d',
            fontWeight: 'bold',
            fontSize: 22
          },
          textAlign: 'center',
          textVerticalAlign: 'middle',
          top: '45%',
          left: '50%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        legend: {
          orient: 'horizontal',
           x: 'center', // 'center' | 'left' | {number},     
           y: 'bottom', // 'center' | 'bottom' | {number} 
          itemWidth: 10,
          itemHeight: 10
        },
        color: options.color,
        series: [
          {
            name: options.seriesName,
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['50%', '50%'],
            label: {
              show: false,
              formatter: '{b}({d}%)'
            },
            data: options.seriesData,
			itemStyle: { // 此配置
			            normal: {
			                borderWidth: 2,
			                borderColor: '#ffffff',
			            },
			            emphasis: {
			                borderWidth: 0,
			                shadowBlur: 10,
			                shadowOffsetX: 0,
			                shadowColor: 'rgba(0, 0, 0, 0.5)'
			            }
			        }
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
