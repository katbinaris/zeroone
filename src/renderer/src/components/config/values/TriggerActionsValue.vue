<template>
  <ConfigSection title="Every Step" :icon-component="CircleDashed">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsEvery.length }})</span></template
    >
    <ActionGroup :actions="actionsEvery" class="p-2" />
  </ConfigSection>
  <ConfigSection title="Clockwise step" :icon-component="RotateCw">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsCw.length }})</span></template
    >
    <ActionGroup :actions="actionsCw" class="p-2" />
  </ConfigSection>
  <ConfigSection title="Counterclockwise Step" :icon-component="RotateCcw">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsCcw.length }})</span></template
    >
    <ActionGroup :actions="actionsCcw" class="p-2" />
  </ConfigSection>
</template>
<script setup lang="ts">
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import ActionGroup from '@renderer/components/config/actions/ActionGroup.vue'
import { RotateCw, RotateCcw, CircleDashed } from 'lucide-vue-next'
import { ref } from 'vue'
const actionsEvery = ref([
  {
    id: '1'
  }
])
const actionsCw = ref([])
const actionsCcw = ref([])

defineProps({
  value: {
    type: Object,
    required: true
  }
})
</script>
