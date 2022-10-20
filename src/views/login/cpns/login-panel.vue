<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <!-- 使用插槽自定义内容 -->
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- 给子组件设置ref -->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <!-- 记住密码 -->
    <div class="account-control">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <el-link type="primary" class="forget">忘记密码</el-link>
    </div>

    <!-- 登录 -->
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 是否记住密码
    const isRemember = ref(false)
    // 获取accountRef子组件实例
    // <typeof LoginAccount>表示LoginAccount组件的类型
    // InstanceType<typeof LoginAccount>表示LoginAccount组件的实例类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    // 管理登录事件
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isRemember.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }

    return {
      isRemember,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  width: 320px;

  .title {
    text-align: center;
  }

  // 与表单隔开
  .account-control {
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 垂直居中
    align-items: center;
    // 与表单隔开
    margin-top: 10px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
