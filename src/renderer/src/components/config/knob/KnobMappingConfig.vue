<template>
  <ConfigSection title="Knob Values" :icon-component="PlusCircle">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ values.length }})</span></template
    >
    <ValueGroup :values="values" class="p-2" />
  </ConfigSection>
</template>
<script setup>
import { PlusCircle } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { ref } from 'vue'
import ValueGroup from '@renderer/components/config/values/ValueGroup.vue'

const values = ref([
  {
    id: '1'
  },
  {
    id: '2'
  }
])
</script>
