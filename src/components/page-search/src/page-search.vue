<template>
  <div class="page-search">
    <lb-form
      v-bind:="searchFormConfig"
      :modelValue="formData"
      @update:modelValue="updateFormData($event)"
      ref="formRef"
    >
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </lb-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LbForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    LbForm
  },
  eimts: ['resetBtnClick', 'queryBtnClick'],
  // 自定义指令
  // directives: {
  //   focus: {
  //     // 可以传4个参数el, binding, vnode, oldVnode
  //     mounted(el) {
  //       el.focus()
  //     }
  //   }
  // },
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定的
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref({ ...formOriginData })
    // formData.value.name = '123'

    // 2.优化二：当用户点击重置
    // let currentInstance: any = null
    // const { proxy }: any = getCurrentInstance()
    // proxy.$refs.formRef.resetFormData()
    // onMounted(() => {
    // })
    const formRef = ref<InstanceType<typeof LbForm>>()
    const handleResetClick = () => {
      for (const key in formOriginData) {
        ;(formData.value as any)[key] = formOriginData[key]
      }
      formRef.value?.resetFormData()
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    // 快速判断formData和newValue是否相等
    // 1.如果相等，直接return
    // 2.如果不相等，遍历newValue，将不相等的属性赋值给formData
    const updateFormData = (newValue: any) => {
      // for (const key in newValue) {
      //   if (formData.value[key] === newValue[key]) {
      //     continue
      //   }
      //   ;(formData.value as any)[key] = newValue[key]
      // }
      // 防止formData和newValue是同一个对象，防止formData重复更新
      if (JSON.stringify(formData.value) === JSON.stringify(newValue)) {
        return
      }
      for (const key in newValue) {
        ;(formData.value as any)[key] = newValue[key]
      }
      // console.log('父组件formdata更新了')
    }

    return {
      formData,
      formRef,
      handleResetClick,
      updateFormData,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
  padding: 10px;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
  padding: 0 50px 20px 0;
}
</style>
