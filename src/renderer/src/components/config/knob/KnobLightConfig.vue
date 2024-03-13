<template>
  <ConfigSection title="Ring Colors" :icon-component="Palette">
    <PaletteInput
      ref="paletteInput"
      :options="ringColors"
      @input="
        (optionKey, colorNumber) => {
          ringColors = {
            ...ringColors,
            [optionKey]: {
              ...ringColors[optionKey],
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
import { computed } from 'vue'

const deviceStore = useDeviceStore()

const ringColors = computed({
  get() {
    return {
      primary: {
        titleKey: 'config_options.light_designer.primary_color',
        colorNumber: deviceStore.currentProfile.primary
      },
      secondary: {
        titleKey: 'config_options.light_designer.secondary_color',
        colorNumber: deviceStore.currentProfile.secondary
      },
      pointer: {
        titleKey: 'config_options.light_designer.pointer_color',
        colorNumber: deviceStore.currentProfile.pointer
      }
    }
  },
  set(newValue) {
    if (newValue.primary.colorNumber !== deviceStore.currentProfile.primary) {
      deviceStore.setPrimaryColor(newValue.primary.colorNumber)
    }
    if (newValue.secondary.colorNumber !== deviceStore.currentProfile.secondary) {
      deviceStore.setSecondaryColor(newValue.secondary.colorNumber)
    }
    if (newValue.pointer.colorNumber !== deviceStore.currentProfile.pointer) {
      deviceStore.setPointerColor(newValue.pointer.colorNumber)
    }
  }
})
</script>
