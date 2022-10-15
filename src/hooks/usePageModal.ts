import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(
  newCallback?: CallbackFn,
  updataCallback?: CallbackFn
) {
  // 获取page-modal组件实例
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const modalFormConfig = ref({})
  const handleNewData = () => {
    modalFormConfig.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }
  const handleUpdateData = (row: any) => {
    modalFormConfig.value = { ...row }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // pageContentRef.value.handleUpdateData(row)
    updataCallback && updataCallback(row)
  }
  return [pageModalRef, modalFormConfig, handleNewData, handleUpdateData]
}
