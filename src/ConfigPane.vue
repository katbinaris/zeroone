<template>
  <div>
    <component :is="configPages[page]" />
  </div>
</template>
<script setup>
import LEDsConfig from '@/LEDsConfig.vue'
import ProgramConfig from '@/ProgramConfig.vue'
import MappingConfig from '@/MappingConfig.vue'
import HapticConfig from '@/HapticConfig.vue'

const props = defineProps({
  page: {
    type: String,
    default: 'program_settings',
  },
})

const configPages = {
  program_settings: ProgramConfig,
  feedback_designer: HapticConfig,
  mapping_configuration: MappingConfig,
  light_designer: LEDsConfig,
}
</script>