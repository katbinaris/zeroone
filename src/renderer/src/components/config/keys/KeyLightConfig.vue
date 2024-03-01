<template>
  <ConfigSection title="Key Colors" :icon-component="Palette">
    <PaletteInput v-model="keyColors" />
  </ConfigSection>
</template>
<script setup>
import { Palette } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import PaletteInput from '@renderer/components/common/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'

const keyColors = ref({
  default: {
    titleKey: 'default',
    color: Color('#4f25ef')
  },
  pressed: {
    titleKey: 'pressed',
    color: Color('#d0078f')
  }
})
</script>
