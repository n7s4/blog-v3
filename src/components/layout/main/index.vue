<template>
  <div class="main-container">
    <page-header />
    <div class="max-w-[1280px] px-[40px] py-[60px]" >
      <router-view></router-view>
    </div> 
  </div>
</template>

<script setup lang="ts">
 import PageHeader from '../../page-header/index.vue'
 
</script>

<style lang="scss" scoped>
</style>