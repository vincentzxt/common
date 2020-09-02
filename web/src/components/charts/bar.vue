<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'ChartBar',
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
      let xAxisData = options.xAxisData
      let seriesData = options.seriesData
      let option = {
        title: {
          show: false
        },
        legend: {
          data: options.seriesName,
          x: 'right',
          y: 'top',
          textStyle: {
            color: "#8f96a2"
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          splitLine: {
            show: false
          },
		  axisLabel: {
		  	interval:0,
		  	rotate:40,
		      textStyle: {
		          color: '#7F8B9C'
		      }
		  },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8f96a2"
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 'dataMax',
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8f96a2"
            }
          }
        },
        grid: {
          top: 50,
          left:10,
          right:20,
          bottom:0,
          containLabel: true
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        series: [
        {
          data: seriesData,
          type: 'bar',
		  barWidth:20,
          name: options.seriesName[0],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [
                  {offset: 0, color: options.color[0]},
                  {offset: 1, color: options.color[1]}
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [
                  {offset: 0, color: options.color[1]},
                  {offset: 1, color: options.color[0]}
                ]
              )
            }
          },
        }]
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
