<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- 账号和密码框 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          v-model="account.password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import LocalCache from '@/utils/cache'

import { rules } from '../cofig/account-config'

export default defineComponent({
  setup() {
    // 获取store
    const store = useStore()
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 登录逻辑
    const loginAction = (isRemember: boolean) => {
      // 校验表单
      formRef.value?.validate((valid) => {
        // 校验成功
        if (valid) {
          // 1.判断是否需要记住密码
          if (isRemember) {
            // 2.本地缓存记住密码
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            // 3.清除本地缓存
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }

          // 2.登录验证
          // 调用store中的loginAction
          store.dispatch('login/accountLoginAction', { ...account })
          // .then(() => {
          //   // 3.跳转到首页
          //   // router.push('/main')
          // })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
