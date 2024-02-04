<template>
  <ConfigSection title="Key Light" :icon-component="Lightbulb">
    <PaletteInput v-model="keyColors" />
  </ConfigSection>
</template>
<script setup>
import { Lightbulb } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import PaletteInput from '@/components/config/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'

const keyColors = ref({
  default: {
    titleKey: 'default',
    color: Color('#4f25ef'),
  },
  pressed: {
    titleKey: 'pressed',
    color: Color('#d0078f'),
  },
})
</script>