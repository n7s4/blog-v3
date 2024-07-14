<template>
  <div class="main-container">
    <page-header />
    <div
      :class="[wideList.includes(route.path) ? 'max-w-[1280px]' : 'max-w-[880px]', 'md:px-[40px]', 'md:pt-[60px]', 'pt-[60px]', 'px-[10px]']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PageHeader from '../../page-header/index.vue'
const wideList = ['/home', '/articlr']
const route = useRoute();
</script>

<style lang="scss" scoped></style>