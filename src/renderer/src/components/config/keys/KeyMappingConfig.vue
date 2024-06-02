<template :key="deviceStore.currentProfileName + appStore.selectedKey || 'no-profile'">
  <ConfigSection :title="`${appStore.selectedKey} Pressed`" :icon-component="PanelBottomClose">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ pressedActions.length }})</span></template
    >
    <ActionGroup
      :actions="pressedActions"
      class="p-2"
      :trigger="0"
      @add="deviceStore.addKeyAction(null, appStore.selectedKey, 0)"
      @delete="(index) => deviceStore.removeKeyAction(index, appStore.selectedKey, 0)"
    />
  </ConfigSection>
  <ConfigSection
    v-if="false"
    :title="`${appStore.selectedKey} Released`"
    :icon-component="PanelBottomOpen"
  >
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ releasedActions.length }})</span></template
    >
    <ActionGroup
      :actions="releasedActions"
      class="p-2"
      :trigger="1"
      @add="deviceStore.addKeyAction(null, appStore.selectedKey, 1)"
      @delete="(index) => deviceStore.removeKeyAction(index, appStore.selectedKey, 1)"
    />
  </ConfigSection>
  <ConfigSection v-if="false" :title="`${appStore.selectedKey} Held`" :icon-component="Clock2">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ heldActions.length }})</span></template
    >
    <ActionGroup
      :actions="heldActions"
      class="p-2"
      :trigger="2"
      @add="deviceStore.addKeyAction(null, appStore.selectedKey, 2)"
      @delete="(index) => deviceStore.removeKeyAction(index, appStore.selectedKey, 2)"
    />
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
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const deviceStore = useDeviceStore()
const { keyActions } = storeToRefs(deviceStore)
// TODO: Only set the actions if they are different, only send those actions to the device
const pressedActions = computed({
  get() {
    return (keyActions.value(appStore.selectedKey).pressed as Action[]) || []
  },
  set(newValue) {
    deviceStore.setKeyPressedActions(appStore.selectedKey, newValue)
  }
})
const releasedActions = computed({
  get() {
    return (keyActions.value(appStore.selectedKey).released as Action[]) || []
  },
  set(newValue) {
    deviceStore.setKeyReleasedActions(appStore.selectedKey, newValue)
  }
})
const heldActions = computed({
  get() {
    return (keyActions.value(appStore.selectedKey).held as Action[]) || []
  },
  set(newValue) {
    deviceStore.setKeyHeldActions(appStore.selectedKey, newValue)
  }
})
</script>
