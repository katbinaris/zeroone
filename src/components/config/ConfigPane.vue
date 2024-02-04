<template>
  <div>
    <div v-if="showTabs" class="flex">
      <!-- TODO: Remove later if not needed -->
      <div v-for="(option, index) in configPageOptions" :key="index" class="flex flex-1 items-center">
        <button
          class="flex-1 h-12 items-center text-center group px-3 font-heading"
          :class="index===currentPage ? 'bg-zinc-900': 'hover:bg-zinc-800 text-zinc-200'"
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
  showTabs: {
    type: Boolean,
    default: false,
  },
})

const currentPage = ref(1)

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