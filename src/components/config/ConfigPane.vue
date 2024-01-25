<template>
  <div>
    <div
      class="px-6 h-20 flex items-center bg-zinc-900 bg-opacity-40">
      <div>
        <h1 class="text-lg">
          <ScrambleText class="align-middle" :text="$t(`config_options.${page}.title`)" />
        </h1>
        <p class="text-xs text-muted-foreground">
          <ScrambleText class="align-middle" :text="$t(`config_options.${page}.subtitle`)" :replace-interval="5" />
        </p>
      </div>
    </div>
    <component :is="configPages[page]" />
  </div>
</template>
<script setup>
import LEDsConfig from '@/components/config/pages/LEDsConfig.vue'
import ProfileConfig from '@/components/config/pages/ProfileConfig.vue'
import MappingConfig from '@/components/config/pages/MappingConfig.vue'
import HapticConfig from '@/components/config/pages/HapticConfig.vue'
import ScrambleText from '@/components/effects/ScrambleText.vue'

defineProps({
  page: {
    type: String,
    default: 'profile_settings',
  },
})

const configPages = {
  profile_settings: ProfileConfig,
  feedback_designer: HapticConfig,
  mapping_configuration: MappingConfig,
  light_designer: LEDsConfig,
}
</script>