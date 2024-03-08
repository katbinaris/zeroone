<template>
  <ConfigSection :title="`${store.selectedKey} Pressed`" :icon-component="PanelBottomClose">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsPressed.length }})</span></template
    >
    <ActionGroup :actions="actionsPressed" class="p-2" />
  </ConfigSection>
  <ConfigSection :title="`${store.selectedKey} Released`" :icon-component="PanelBottomOpen">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsReleased.length }})</span></template
    >
    <ActionGroup :actions="actionsReleased" class="p-2" />
  </ConfigSection>
  <ConfigSection :title="`${store.selectedKey} Held`" :icon-component="Clock2">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsHeld.length }})</span></template
    >
    <ActionGroup :actions="actionsHeld" class="p-2" />
  </ConfigSection>
</template>
<script setup>
import { PanelBottomClose, PanelBottomOpen, Clock2 } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { useStore } from '@renderer/store'
import { ref } from 'vue'
import ActionGroup from '../actions/ActionGroup.vue'

const store = useStore()
const actionsPressed = ref([
  {
    id: '1'
  },
  {
    id: '2'
  },
  {
    id: '3'
  }
])
const actionsReleased = ref([
  {
    id: '4'
  },
  {
    id: '5'
  },
  {
    id: '6'
  }
])
const actionsHeld = ref([
  {
    id: '7'
  },
  {
    id: '8'
  },
  {
    id: '9'
  }
])
</script>
