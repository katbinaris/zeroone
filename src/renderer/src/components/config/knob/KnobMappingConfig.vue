<template>
  <ConfigSection title="Knob Values" :icon-component="PlusCircle">
    <template #title>
      <span class="text-zinc-500">&nbsp;({{ knobValues.length }})</span></template
    >
    <ValueGroup :values="knobValues" class="p-2" />
  </ConfigSection>
</template>
<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import ValueGroup from '@renderer/components/config/values/ValueGroup.vue'
import { useDeviceStore } from '@renderer/deviceStore'
import { computed } from 'vue'

const deviceStore = useDeviceStore()

const knobValues = computed({
  get() {
    return Object.values(deviceStore.currentProfile.knob).map((value, index) => ({
      id: index.toString(),
      value: value
    }))
  },
  set(newValues) {
    //TODO: Update deviceStore & device
    //deviceStore.setValues(newValues)
  }
})
</script>
