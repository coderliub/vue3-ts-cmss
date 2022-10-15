<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleOutClick"
            ><el-icon><CircleClose /></el-icon>退出登录</el-dropdown-item
          >
          <!-- disabled属性是禁止  divided是分割线-->
          <el-dropdown-item divided
            ><el-icon><User /></el-icon>用户信息</el-dropdown-item
          >
          <el-dropdown-item
            ><el-icon><Setting /></el-icon>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    // 退出登录
    const handleOutClick = () => {
      store.dispatch('login/logoutAction')
    }

    return {
      name,
      handleOutClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  // 使得鼠标移入时，变成小手
  cursor: pointer;
  display: flex;
  align-items: center;

  .el-avatar {
    margin-right: 5px;
  }
}
</style>
