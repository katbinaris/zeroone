<template>
  <div>
    <div class="flex font-heading">
      <div v-for="(option, index) in configPageOptions" :key="index" class="flex items-center">
        <button
          class="flex-1 p-4 items-center text-center group"
          :class="index===currentPage ? 'bg-zinc-900': 'hover:bg-zinc-800 text-zinc-200 bg-zinc-950'"
          @click="currentPage = index">
          {{ $t(option.titleKey) }}
        </button>
        <div
          class="group-hover:h-full"
          :class="index===currentPage || index+1===currentPage ? 'h-full' : 'h-7'">
          <Separator orientation="vertical" />
        </div>
      </div>
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
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue'

defineProps({
  currentPage: {
    type: Number,
    default: '0',
  },
})

const configPageOptions = [
  {
    titleKey: 'config_options.profile_settings.title',
    component: ProfileConfig,
  },
  {
    titleKey: 'config_options.feedback_designer.title',
    component: HapticConfig,
  },
  {
    titleKey: 'config_options.mapping_configuration.title',
    component: MappingConfig,
  },
  {
    titleKey: 'config_options.light_designer.title',
    component: LEDsConfig,
  },
]
</script>