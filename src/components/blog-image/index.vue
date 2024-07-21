<template>
  <el-image :class="['w-[100%]', 'h-[100%]', animate ? 'duration-300 hover:scale-110' : '']" :src="src" lazy :fit="fit"
    v-bind="$attrs">
    <template #placeholder>
      <div class="w-[100%] h-[100%] grid place-items-center">
        <EosIconsBubbleLoading size="60" class="w-[2rem] h-[2rem]" />
      </div>
    </template>
    <template #error>
      <div class="w-[100%] h-[100%] grid place-items-center">
        <IcRoundErrorOutline size="60" class="w-[2rem] h-[2rem]" />
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
import IcRoundErrorOutline from '~icons/ic/round-error-outline';
import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

defineProps({
  src: {
    type: String,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  fit: {
    type: String,
    default: 'cover',
  },
  animate: {
    type: Boolean,
    default: true,
  }
})
</script>
<style lang="scss" scoped></style>