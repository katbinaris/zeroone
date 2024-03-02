<template>
  <ConfigSection title="Ring Colors" :icon-component="Palette">
    <PaletteInput v-model="ringColors" />
  </ConfigSection>
</template>
<script setup>
import { Palette } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import PaletteInput from '@renderer/components/common/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'

const ringColors = ref({
  primary: {
    titleKey: 'config_options.light_designer.primary_color',
    color: Color('#8f9af2')
  },
  secondary: {
    titleKey: 'config_options.light_designer.secondary_color',
    color: Color('#c06300')
  },
  pointer: {
    titleKey: 'config_options.light_designer.pointer_color',
    color: Color('#ffa346')
  }
})
</script>
