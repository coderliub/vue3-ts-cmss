<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '600px', height: '500px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 1.初始化echarts实例
      // 3个参数：dom容器，主题，渲染器
      const echartInstance = echarts.init(divRef.value!, 'dark', {
        renderer: 'svg'
      })
      // 2.编写配置文件
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        // 鼠标悬浮样式
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // 图例
        legend: {
          data: ['销量']
        },
        // x轴展示内容
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        // y轴展示内容，可以不设置，会自动根据数据计算
        yAxis: {},
        // 数据
        series: [
          {
            name: '销量',
            // 图表类型
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      // 3.设置配置，并绘制图表
      echartInstance.setOption(option)
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
