 <template>
  <svg aria-hidden="true">
    <use :href="SymbolId" />
  </svg>
 </template>
 
 <script setup lang="ts">
 import { computed } from "vue"
 const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: 'icon',
  }
 })
 const SymbolId = computed(() => `#${props.prefix}-${props.name}`)
 </script>
 
 <style scoped>
 
 </style>