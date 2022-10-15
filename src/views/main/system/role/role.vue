<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @updateBtnClick="handleUpdateData"
    ></page-content>

    <page-modal
      pageName="role"
      :modalConfig="modalConfig"
      ref="pageModalRef"
      :modalFormConfig="modalFormConfig"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { mapMenusToMenuTree } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from '../role/config/search.config'
import { contentTableConfig } from '../role/config/content.config'
import { modalConfig } from '../role/config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // pageSearch相关的hook逻辑
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 从pageModal中获取到menuList数据
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const emnuCallback = (row: any) => {
      const menuTree = mapMenusToMenuTree(row.menuList)
      // 等待el-tree渲染完成后，再去设置默认选中的节点
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(menuTree, false)
      })
    }
    const [pageModalRef, modalFormConfig, handleNewData, handleUpdateData] =
      usePageModal(undefined, emnuCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data: any, node: any) => {
      const checkedKeys = node.checkedKeys
      const halfCheckedKeys = node.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      modalFormConfig,
      handleNewData,
      handleUpdateData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
