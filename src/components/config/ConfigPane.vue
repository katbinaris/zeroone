<template>
  <div>
    <div class="grow overflow-y-auto">
      <component :is="store.currentConfigComponent" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store'

const store = useStore()
</script>