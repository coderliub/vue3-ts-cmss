<template>
  <div class="login-phone">
    <el-form
      label-width="60px"
      :model="phone"
      :rules="phoneRules"
      ref="formRef"
    >
      <!-- 账号和密码框 -->
      <el-form-item label="手机号" prop="number" label-width="65px">
        <el-input v-model="phone.number" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="65px">
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
import { useStore } from 'vuex'

import { phoneRules } from '../cofig/account-config'

export default defineComponent({
  setup() {
    // 获取store
    const store = useStore()
    const phone = reactive({
      number: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 获取验证码
    const getCode = () => {
      console.log('获取验证码成功')
    }

    // 登录逻辑
    const loginAction = () => {
      // 校验表单
      formRef.value?.validate((valid) => {
        // 校验成功
        if (valid) {
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      phone,
      phoneRules,
      formRef,
      getCode,
      loginAction
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
