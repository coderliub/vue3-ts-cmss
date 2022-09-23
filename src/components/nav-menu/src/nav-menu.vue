<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="filterIcon(item.icon)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template #title>
                  <el-icon v-if="subitem.icon">
                    <component :is="filterIcon(subitem.icon)" />
                  </el-icon>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <!-- index要求传字符串 -->
          <el-menu-item :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="filterIcon(item.icon)" />
                <span>{{ item.name }}</span>
              </el-icon>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

// import { IRootState } from '@/store/types'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 获取store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    // 计算属性过滤icon字段并首字母大写
    const filterIcon = (icon: string) => {
      const iconStr = icon.replace('el-icon-', '')
      return iconStr.charAt(0).toUpperCase() + iconStr.slice(1)
    }

    // 获取路由实例
    const router = useRouter()

    // 菜单点击事件
    const handleMenuItemClick = (item: any) => {
      // console.log(item)
      // 跳转路由
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      filterIcon,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  // 消除白色边框
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
