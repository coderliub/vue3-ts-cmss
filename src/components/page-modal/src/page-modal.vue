<template>
  <div class="page-modal">
    <!-- centerDialogVisible控制显示与隐藏 -->
    <el-dialog
      v-model="dialogVisible"
      :title="Ititle"
      width="30%"
      center
      destroy-on-close
      :before-close="handleClose"
    >
      <lb-form v-bind="modalConfig" v-model="formDate"></lb-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import LbForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    modalFormConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    LbForm
  },
  setup(props) {
    // dialogVisible控制显示与隐藏
    const dialogVisible = ref(false)
    const formDate = ref<any>({})

    // 通过watch监听modalConfig的变化，是否有参数传入决定是发生哪个事件
    // 从而改变表单标题
    let Ititle = ref(props.modalConfig.title)
    watch(
      () => props.modalFormConfig,
      (newVal) => {
        for (const item of props.modalConfig.formItems) {
          formDate.value[`${item.field}`] = newVal[`${item.field}`]
        }
        // 编辑是有参数传入的
        if (newVal.id) {
          // 提取后2个字符并添加新字符
          Ititle.value = `编辑${Ititle.value.slice(-2)}`
        } else {
          Ititle.value = `新建${Ititle.value.slice(-2)}`
        }
      }
    )

    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('是否要关闭对话框?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.modalFormConfig).length) {
        // 编辑
        store.dispatch('system/updataPageDataAction', {
          pageName: props.pageName,
          editData: { ...formDate.value, ...props.otherInfo },
          id: props.modalFormConfig.id
        })
      } else {
        // 新增
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formDate.value, ...props.otherInfo }
        })
      }
    }

    return {
      formDate,
      dialogVisible,
      handleClose,
      handleConfirmClick,
      Ititle
    }
  }
})
</script>

<style scoped></style>
