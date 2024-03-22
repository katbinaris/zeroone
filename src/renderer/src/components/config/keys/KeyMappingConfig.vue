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
<script setup lang="ts">
import { PanelBottomClose, PanelBottomOpen, Clock2 } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { useAppStore } from '@renderer/appStore'
import { useDeviceStore } from '@renderer/deviceStore'
import ActionGroup from '@renderer/components/config/actions/ActionGroup.vue'
import { computed } from 'vue'
import { Action } from '@renderer/deviceStore'

const appStore = useAppStore()
const deviceStore = useDeviceStore()
const actionsPressed = computed({
  get() {
    return deviceStore.keyActions(appStore.selectedKey).pressedActions as Action[]
  },
  set(newValue) {
    deviceStore.setKeyPressedActions(appStore.selectedKey, newValue)
  }
})
const actionsReleased = computed({
  get() {
    return deviceStore.keyActions(appStore.selectedKey).releasedActions as Action[]
  },
  set(newValue) {
    deviceStore.setKeyReleasedActions(appStore.selectedKey, newValue)
  }
})
const actionsHeld = computed({
  get() {
    return deviceStore.keyActions(appStore.selectedKey).heldActions as Action[]
  },
  set(newValue) {
    deviceStore.setKeyHeldActions(appStore.selectedKey, newValue)
  }
})
</script>
