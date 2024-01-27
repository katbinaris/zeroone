<template>
  <TabsContent value="led-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection
          :title="$t('config_options.light_designer.led_feedback')" :icon-component="Lightbulb"
          :show-toggle="true">
          <h2 class="p-6 inline-block">{{ $t('config_options.light_designer.led_mode') }}</h2> [TODO]
          <div class="px-6 py-2">
            <Slider v-model="brightnessSliderModel" max="100" class="h-10" />
          </div>
        </ConfigSection>
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
import { computed, ref } from 'vue'
import { store } from '@/store.js'
import { Slider } from '@/components/ui/slider/index.js'

const ledConfig = computed(() => store.currentProfile.ledConfig)

const brightnessSliderModel = computed({
  get: () => [ledConfig.value.ledBrightness],
  set: (val) => ledConfig.value.ledBrightness = val[0],
})

const colors = ref({
  primary: {
    key: 'config_options.light_designer.primary_color',
    color: computed({
      get: () => Color(ledConfig.value.primary),
      set: (color) => [ledConfig.value.primary.h, ledConfig.value.primary.s, ledConfig.value.primary.v] = color.hsv().color,
    }),
  },
  secondary: {
    key: 'config_options.light_designer.secondary_color',
    color: computed({
      get: () => Color(ledConfig.value.secondary),
      set: (color) => [ledConfig.value.secondary.h, ledConfig.value.secondary.s, ledConfig.value.secondary.v] = color.hsv().color,
    }),
  },
  pointer: {
    key: 'config_options.light_designer.pointer_color',
    color: computed({
      get: () => Color(ledConfig.value.pointer),
      set: (color) => [ledConfig.value.pointer.h, ledConfig.value.pointer.s, ledConfig.value.pointer.v] = color.hsv().color,
    }),
  },
})
</script>