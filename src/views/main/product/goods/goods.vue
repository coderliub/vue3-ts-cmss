<template>
  <div class="goods">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      @newBtnClick="handleNewData"
      @updateBtnClick="handleUpdateData"
    >
      <template #image="scope">
        <!-- preview-teleported="true"解决表格覆盖图片 -->
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        />
      </template>
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
    </page-content>

    <page-modal
      :modalConfig="modalConfig"
      pageName="goods"
      ref="pageModalRef"
      :modalFormConfig="modalFormConfig"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'goods',
  components: {
    pageContent,
    pageModal
  },
  setup() {
    const [pageModalRef, modalFormConfig, handleNewData, handleUpdateData] =
      usePageModal()
    return {
      contentTableConfig,
      modalConfig,
      pageModalRef,
      modalFormConfig,
      handleNewData,
      handleUpdateData
    }
  }
})
</script>

<style scoped></style>
