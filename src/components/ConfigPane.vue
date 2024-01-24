<template>
  <div>
    <div
      class="px-6 h-20 flex items-center bg-zinc-900 bg-opacity-40"
      @mouseenter="$refs.configPaneTitle.scramble(0.15, 100)">
      <div>
        <h1 class="text-lg">
          <ScrambleText ref="configPaneTitle" class="align-middle" :text="$t(`config_options.${page}.title`)" />
        </h1>
        <p class="text-xs text-muted-foreground">
          {{ $t(`config_options.${page}.subtitle`) }}
        </p>
      </div>
    </div>
    <component :is="configPages[page]" />
  </div>
</template>
<script setup>
import LEDsConfig from '@/components/config/LEDsConfig.vue'
import ProgramConfig from '@/components/config/ProgramConfig.vue'
import MappingConfig from '@/components/config/MappingConfig.vue'
import HapticConfig from '@/components/config/HapticConfig.vue'
import ScrambleText from '@/components/effects/ScrambleText.vue'

defineProps({
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