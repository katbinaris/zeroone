<template>
  <ConfigSection title="Key Colors" :icon-component="Palette">
    <PaletteInput
      :options="keyColors"
      @input="
        (optionKey, colorNumber) => {
          keyColors = {
            ...keyColors,
            [optionKey]: {
              ...keyColors[optionKey],
              colorNumber
            }
          }
        }
      "
    />
  </ConfigSection>
</template>
<script setup>
import { Palette } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import PaletteInput from '@renderer/components/common/PaletteInput.vue'
import { useDeviceStore } from '@renderer/deviceStore'
import { useAppStore } from '@renderer/appStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const appStore = useAppStore()
const deviceStore = useDeviceStore()
const { keyColor } = storeToRefs(deviceStore)

const keyColors = computed({
  get() {
    return {
      default: {
        titleKey: 'default',
        colorNumber: keyColor.value(appStore.selectedKey, false)
      },
      pressed: {
        titleKey: 'pressed',
        colorNumber: keyColor.value(appStore.selectedKey, true)
      }
    }
  },
  set(newValue) {
    if (newValue.default.colorNumber !== keyColor.value(appStore.selectedKey, false)) {
      deviceStore.setKeyColor(appStore.selectedKey, false, newValue.default.colorNumber)
    }
    if (newValue.pressed.colorNumber !== keyColor.value(appStore.selectedKey, true)) {
      deviceStore.setKeyColor(appStore.selectedKey, true, newValue.pressed.colorNumber)
    }
  }
})
</script>
