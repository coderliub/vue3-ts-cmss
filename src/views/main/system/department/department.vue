<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @updateBtnClick="handleUpdateData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      pageName="department"
      :modalFormConfig="modalFormConfig"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // modal配置信息
    const store = useStore()
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })
      return modalConfig
    })

    // 处理modal的hook
    const [pageModalRef, modalFormConfig, handleNewData, handleUpdateData] =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      modalFormConfig,
      pageModalRef,
      handleNewData,
      handleUpdateData
    }
  }
})
</script>

<style scoped></style>
