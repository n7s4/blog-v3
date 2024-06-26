<template>
  <div class="header-container backdrop-blur">
    <div class="left">
     <MaterialSymbolsFace2 class="logo" />
    </div>
    <div class="right">
      <el-menu :ellipsis="false" mode="horizontal" @select="handleSelect">
        <div v-for="menu in menuList" :key="menu.path">
          <el-sub-menu v-if="menu.children.length" :index="menu.path">
            <template #title>
              <component class="menu-icon" :is="menu.icon"></component>
              {{ menu.title }}
            </template>
            <el-menu-item v-for="submenu in menu.children" :key="submenu.path" :index="submenu.path">
              <component class="menu-icon" :is="menu.icon"></component>
              {{ submenu.title }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="menu.path">
            <component class="menu-icon" :is="menu.icon"></component>
            {{ menu.title }}
          </el-menu-item>
        </div>
      </el-menu>
      <el-avatar>M</el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import MaterialSymbolsFace2 from '~icons/material-symbols/face-2';
import { useRouter } from 'vue-router'
const router = useRouter();
type MenuList = {
  title: string,
  icon: any
  path: string,
  children: any[],
}
const menuList: MenuList[] = [
  {
    title: "首页",
    icon: defineAsyncComponent(() => import("~icons/material-symbols/face-2")),
    path: "/home",
    children: []
  },
  {
    title: "时间轴",
    icon: defineAsyncComponent(() => import("~icons/material-symbols/face-2")),
    path: "/archive",
    children: []
  },
  {
    title: "说说",
    icon: defineAsyncComponent(() => import("~icons/material-symbols/face-2")),
    path: "/talk",
    children: []
  },
  {
    title: "更多",
    icon: defineAsyncComponent(() => import("~icons/material-symbols/face-2")),
    path: "/more",
    children: [
      {
        title: "关于我",
        icon: defineAsyncComponent(() => import("~icons/material-symbols/face-2")),
        path: "/more/about",
      }
    ]
  },
]
const handleSelect = (path: string) => {
  console.log(path)
  router.push(path);
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  .left {
    display: flex;width: 20%;
    .logo {
      width: 3rem;
      height: 3rem;
      transition: all .3s;
      border-radius: 50%;
    }
    .logo:hover {
      transform: rotate(180deg);

    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

  }

}
.menu-icon {
      margin-right: 1rem;
      height: 1rem;
      width: 1rem;
    }
</style>