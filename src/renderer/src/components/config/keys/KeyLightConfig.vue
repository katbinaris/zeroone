<template>
  <ConfigSection title="Key Colors" :icon-component="Palette">
    <PaletteInput
      :options="keyColors"
      @input="
        (optionKey, color) => {
          keyColors = {
            ...keyColors,
            [optionKey]: {
              ...keyColors[optionKey],
              color
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
import Color from 'color'
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
        color: Color(keyColor.value(appStore.selectedKey, false))
      },
      pressed: {
        titleKey: 'pressed',
        color: Color(keyColor.value(appStore.selectedKey, true))
      }
    }
  },
  set(newValue) {
    deviceStore.setKeyColor(appStore.selectedKey, false, Color(newValue.default.color).rgbNumber())
    deviceStore.setKeyColor(appStore.selectedKey, true, Color(newValue.pressed.color).rgbNumber())
  }
})
</script>
