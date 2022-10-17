import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 把echart里的逻辑单独进行编写
  const updatasize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  // 用对象的方式返回，可以只获取需要用到的属性，使用更加灵活
  // const [] = useEchart() 使用时，必须按照顺序来，并且要用到所有的属性
  return {
    echartInstance,
    setOptions,
    updatasize
  }
}
