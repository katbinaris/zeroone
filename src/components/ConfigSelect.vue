<template>
  <div>
    <div
      v-for="(config, index) in config_tabs"
      :key="config"
      :data-selected="current_tab===config.id"
      class="px-4 h-20 flex items-center hover:bg-zinc-900 data-[selected=true]:bg-zinc-200 data-[selected=true]:text-black border-solid border-0 border-b"
      :class="config.disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      @click="current_tab=config.disabled ? current_tab : config.id; $refs.configSelect[index].scramble()">
      <div>
        <h1 class="text-lg" :class="{'text-muted-foreground': config.disabled}">
          <ScrambleText ref="configSelect" class="align-middle" :text="$t(`config_options.${config.id}.title`)" />
          <Badge
            v-if="config.hasOwnProperty('badgeKey')"
            v-t="config.badgeKey"
            class="font-mono rounded-full h-4 align-middle bg-zinc-900 text-muted-foreground" />
        </h1>
        <p class="text-xs" :class="current_tab===config.id?'text-black' : 'text-muted-foreground'">
          {{ $t(`config_options.${config.id}.subtitle`) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { Badge } from '@/components/ui/badge/index.js'

const config_tabs = ref([
  { id: 'program_settings' },
  { id: 'feedback_designer' },
  { id: 'mapping_configuration' },
  { id: 'light_designer' },
  {
    id: 'gui_designer',
    disabled: true,
    badgeKey: 'common.coming_soon',
  },
])

const current_tab = defineModel({
  type: String,
  default: 'program_settings',
})
</script>