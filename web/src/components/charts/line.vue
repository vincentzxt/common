<template>
    <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'chartLine',
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
	  let unit = options.unit
      const option = {
        title: {
          text: options.text,
          x: 'center',
          textStyle: {
            "color": "#74777e"
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: options.seriesName,
          x: 'right',
          y: 'top',
          textStyle: {
            color: "#8f96a2"
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
			axisLabel: {
			    interval:0,
			    rotate:40
			  },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#333333"
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
			axisLabel: {
				formatter:'{value}'+options.unit,
			    textStyle: {
			        color: '#7F8B9C'
			    }
			},
			splitLine: {
			    show: true,
			    lineStyle: {
			        color: '#F5F7F9'
			    }
			},
            axisLine: {
              show: false,
              lineStyle: {
                color: "#333333"
              }
            }
          }
        ],
        grid: {
          top: 50,
          left:10,
          right:10,
          bottom:0,
          containLabel: true
        },
        series: [
          {
            name: options.seriesName,
            type: 'line',
            data: seriesData,
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#0000FF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFFFFF'
              }])
            }
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
