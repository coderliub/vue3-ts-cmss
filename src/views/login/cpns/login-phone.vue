<template>
  <div class="login-phone">
    <el-form
      label-width="60px"
      :model="phone"
      :rules="phoneRules"
      ref="formRef"
    >
      <!-- 账号和密码框 -->
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" placeholder="请输入验证码" />
          <el-button class="btn" type="primary" @click="getCode"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

import { phoneRules } from '../cofig/account-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const getCode = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('登录成功')
        }
      })
    }

    return {
      phone,
      getCode,
      phoneRules,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    margin-left: 8px;
  }
}
</style>
