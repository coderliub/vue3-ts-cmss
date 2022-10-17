<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义 props,也是能直接在 template 中使用的
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  // 1.直接去使用echarts的方法去初始化，依赖性太强，不利于后期的维护
  // const echartInstance = echarts.init(echartDivRef.value!)
  // 2.初始化echarts实例和设置options也可能在别的地方使用，所以封装成一个方法
  // echartInstance.setOption(props.options)
  // 3.将初始化echarts实例和设置options抽离到hooks中，这样就可以在别的地方使用了
  // 4.用到的时候是对hooks有依赖，如果到时候需要用别的图表库，只需要修改hooks中的代码即可

  // 初始化 echarts,获取设置echarts 实例的方法
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    // 设置 options
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
