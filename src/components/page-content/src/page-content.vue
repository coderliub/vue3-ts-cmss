<template>
  <div class="page-content">
    <lb-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @SelectionChange="handleSelectionChange"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick">{{
          contentTableConfig.newBtnTitle ?? '新建数据'
        }}</el-button>
      </template>

      <!-- 列中的插槽 -->
      <template #status="scope">
        <template v-if="scope.row.enable === 1">
          <el-switch
            v-model="scope.row.enable"
            size="large"
            style="--el-switch-off-color: #ff4949"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </template>
        <template v-else>
          <el-switch
            v-model="scope.row.status"
            size="large"
            style="--el-switch-off-color: #ff4949"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </template>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            type="primary"
            size="small"
            text
            class="btn"
            v-if="isUpdate"
            @click="handleUpdateClick(scope.row)"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            text
            class="btn"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherProPSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row" />
        </template>
      </template>

      <!-- 底部插槽 -->
      <template #footer> </template>
    </lb-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import LbTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'

import { useStore } from '@/store'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    LbTable
  },
  emits: ['newBtnClick', 'updateBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.页面底部的分页信息,双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    // 监听pageInfo的变化,触发获取数据的方法
    watch(
      pageInfo,
      () => {
        getPageData()
      },
      { deep: true }
    )

    // 2.发送网络请求获取数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          // 偏移多少条数据
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          // 每页多少条数据
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherProPSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.处理表格中的事件(选中,编辑,删除)
    // 监听分页信息的变化
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }
    // 新建
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑
    const handleUpdateClick = (row: any) => {
      emit('updateBtnClick', row)
    }
    // 删除
    const handleDeleteClick = (row: any) => {
      console.log(row)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: row.id
      })
    }

    return {
      dataList,
      dataCount,
      getPageData,
      otherProPSlots,
      handleSelectionChange,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleNewClick,
      handleUpdateClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .handle-btns {
    display: flex;
    // 均匀排列每个元素,每个元素周围分配相同的空间
    justify-content: space-around;
    align-items: center;

    .btn {
      margin: 0;
    }
  }
}
</style>
