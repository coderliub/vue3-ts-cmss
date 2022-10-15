<template>
  <div class="lb-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :type="item.type"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-config-provider>
                  <el-date-picker
                    v-bind="item.otherOptions"
                    style="width: 100%"
                    v-model="formData[`${item.field}`]"
                  />
                </el-config-provider>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        // >1920px 显示4个
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    // watch对reactive是默认深度监听的，ref对象则需手动开启,ref需要.value取到值然后再调属性
    watch(formData.value, (newValue) => {
      console.log('子组件formData更新了')
      emit('update:modelValue', newValue), { deep: true }
    })

    // 实际不会执行set方法
    // const formData = computed({
    //   get() {
    //     return { ...props.modelValue }
    //   },
    //   set(newVal) {
    //     emit('update:modelValue', newVal)
    //   }
    // })

    // 重置子组件formData的方法1
    // watch(props.modelValue, (newValue) => {
    //   if (JSON.stringify(formData.value) === JSON.stringify(newValue)) {
    //     return
    //   }
    //   for (const key in newValue) {
    //     ;(formData.value as any)[key] = newValue[key]
    //   }
    //   console.log('通过modelValue更新子组件formData')
    // })

    // 重置子组件formData的方法2
    const resetFormData = () => {
      for (const key in props.modelValue) {
        ;(formData.value as any)[key] = props.modelValue[key]
      }
    }
    // defineExpose({
    //   resetFormData
    // })

    return {
      formData,
      resetFormData
    }
  }
})
</script>

<style scoped lang="less">
.lb-form {
  padding-top: 20px;

  .form-item {
    padding: 5px 30px;
  }
}
</style>
