<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <lb-card title="分类商品的数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </lb-card>
      </el-col>
      <el-col :span="10">
        <lb-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </lb-card>
      </el-col>
      <el-col :span="7">
        <lb-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </lb-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <lb-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </lb-card>
      </el-col>
      <el-col :span="12">
        <lb-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsSale"></bar-echart>
        </lb-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import LbCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts'
// import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    LbCard,
    PieEchart,
    RoseEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('analysis/getDashboardDataAction')

    // 获取数据
    // 用computed保证当请求到vuex中的数据时，才会渲染
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.analysis.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return {
        xLabels,
        values
      }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.analysis.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLabels,
        values
      }
    })
    const addressGoodsSale = computed(() => {
      return store.state.analysis.addressGoodsSale.map((item: any) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 15px;
}
</style>
