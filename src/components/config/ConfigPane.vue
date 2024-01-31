<template>
  <div>
    <div class="flex font-heading">
      <button
        v-for="(option, key) in configPageOptions" :key="key"
        class="flex-1 p-4 items-center text-center"
        :class="currentPage!==key ? 'hover:bg-zinc-800 text-zinc-200' : 'text-black bg-zinc-200 hover:bg-zinc-100'"
        @click="currentPage = key">
        {{ $t(option.titleKey) }}
      </button>
    </div>
    <div class="grow overflow-y-auto">
      <component :is="configPageOptions[currentPage].component" />
    </div>
  </div>
</template>
<script setup>
import LEDsConfig from '@/components/config/pages/LEDsConfig.vue'
import ProfileConfig from '@/components/config/pages/ProfileConfig.vue'
import MappingConfig from '@/components/config/pages/MappingConfig.vue'
import HapticConfig from '@/components/config/pages/HapticConfig.vue'

defineProps({
  currentPage: {
    type: String,
    default: 'profileConfig',
  },
})

const configPageOptions = {
  profileConfig: {
    titleKey: 'config_options.profile_settings.title',
    component: ProfileConfig,
  },
  hapticConfig: {
    titleKey: 'config_options.feedback_designer.title',
    component: HapticConfig,
  },
  mappingConfig: {
    titleKey: 'config_options.mapping_configuration.title',
    component: MappingConfig,
  },
  ledsConfig: {
    titleKey: 'config_options.light_designer.title',
    component: LEDsConfig,
  },
}
</script>