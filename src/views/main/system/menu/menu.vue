<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      @newBtnClick="handleNewData"
      @updateBtnClick="handleUpdateData"
    ></page-content>

    <page-modal
      :modalConfig="modalConfig"
      pageName="menu"
      ref="pageModalRef"
      :modalFormConfig="modalFormConfig"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'menus',
  components: {
    PageContent,
    PageModal
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
