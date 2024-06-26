<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, useCounterStore } from '../store/user/index.ts'
import { storeToRefs, } from 'pinia';
const userStore = useUserStore();
const counterStore = useCounterStore();
const { fullName } = storeToRefs(userStore)
const { count } = storeToRefs(counterStore)
defineProps<{ msg: string }>()
const number = ref(0)

</script>

<template>
  <div>{{ number }}</div>
  <div>{{ msg }}</div>
  <div>{{ fullName }}</div>
  <div>{{ count }}</div>
  <svg-icon name="svg"></svg-icon>
  <el-button @click="() => userStore.changeFirstName('hah')">改变名称</el-button>
  <el-button @click="() => counterStore.addCount()">add</el-button>
</template>

<style scoped>

</style>
