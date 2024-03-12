<template>
  <ConfigSection :title="`${appStore.selectedKey} Pressed`" :icon-component="PanelBottomClose">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsPressed.length }})</span></template
    >
    <ActionGroup :actions="actionsPressed" class="p-2" />
  </ConfigSection>
  <ConfigSection :title="`${appStore.selectedKey} Released`" :icon-component="PanelBottomOpen">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsReleased.length }})</span></template
    >
    <ActionGroup :actions="actionsReleased" class="p-2" />
  </ConfigSection>
  <ConfigSection :title="`${appStore.selectedKey} Held`" :icon-component="Clock2">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ actionsHeld.length }})</span></template
    >
    <ActionGroup :actions="actionsHeld" class="p-2" />
  </ConfigSection>
</template>
<script setup>
import { PanelBottomClose, PanelBottomOpen, Clock2 } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { useAppStore } from '@renderer/appStore'
import { ref } from 'vue'
import ActionGroup from '@renderer/components/config/actions/ActionGroup.vue'

const appStore = useAppStore()
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
