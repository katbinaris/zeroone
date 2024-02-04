<template>
  <ConfigSection title="Ring Light" :icon-component="Lightbulb">
    <PaletteInput v-model="ringColors" />
  </ConfigSection>
</template>
<script setup>
import { Lightbulb } from 'lucide-vue-next'
import ConfigSection from '@/components/common/ConfigSection.vue'
import PaletteInput from '@/components/common/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'

const ringColors = ref({
  primary: {
    titleKey: 'config_options.light_designer.primary_color',
    color: Color('#4f25ef'),
  },
  secondary: {
    titleKey: 'config_options.light_designer.secondary_color',
    color: Color('#1a1498'),
  },
  pointer: {
    titleKey: 'config_options.light_designer.pointer_color',
    color: Color('#ffa346'),
  },
})
</script>