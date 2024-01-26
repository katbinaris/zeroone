<template>
  <TabsContent value="led-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection
          :title="$t('config_options.light_designer.led_feedback')" :icon-component="Lightbulb"
          :show-toggle="true">
          <h2 class="p-6">{{ $t('config_options.light_designer.led_mode') }}</h2>
        </ConfigSection>
        <div class="h-6" />
        <ConfigSection :title="$t('config_options.light_designer.led_colors')" :icon-component="Palette">
          <PaletteInput v-model="colors" />
        </ConfigSection>
      </ScrollArea>
    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Lightbulb, Palette } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import PaletteInput from '@/components/config/pages/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'

const colors = ref({
  primary: {
    key: 'config_options.light_designer.primary_color',
    color: Color('#ff0000'),
  },
  secondary: {
    key: 'config_options.light_designer.secondary_color',
    color: Color('#00ff00'),
  },
  pointer: {
    key: 'config_options.light_designer.pointer_color',
    color: Color('#0000ff'),
  },
})
</script>