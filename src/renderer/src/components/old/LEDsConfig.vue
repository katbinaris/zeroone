<template>
  <ConfigSection
    title="Ring Lights" :icon-component="Lightbulb"
    :show-toggle="true">
    <h2 class="p-6 inline-block">{{ $t('config_options.light_designer.led_mode') }}</h2> [TODO]
    <div class="px-6 py-2">
      <Slider v-model="brightnessSliderModel" max="100" class="h-10" />
    </div>
  </ConfigSection>
  <ConfigSection
    title="Key Lights" :icon-component="Lightbulb"
    :show-toggle="true">
    <h2 class="p-6 inline-block">{{ $t('config_options.light_designer.led_mode') }}</h2> [TODO]
    <div class="px-6 py-2">
      <Slider v-model="brightnessSliderModel" max="100" class="h-10" />
    </div>
  </ConfigSection>
  <ConfigSection title="Ring Colors" :icon-component="Circle">
    <PaletteInput v-model="ringColors" />
  </ConfigSection>
  <ConfigSection title="Key Colors" :icon-component="PanelBottom">
    <PaletteInput v-model="keyColors" />
  </ConfigSection>
  <ConfigSection title="Key Colors (Pressed)" :icon-component="PanelBottomClose">
    <PaletteInput v-model="keyColors" />
  </ConfigSection>
</template>
<script setup>
import { Lightbulb, PanelBottomClose, Circle, PanelBottom } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import PaletteInput from '@renderer/components/common/PaletteInput.vue'
import Color from 'color'
import { computed, ref } from 'vue'
import { useStore } from '@renderer/store'
import { Slider } from '@renderer/components/ui/slider'

const store = useStore()

const ledConfig = computed(() => store.selectedProfile.ledConfig)

const brightnessSliderModel = computed({
  get: () => [ledConfig.value.ledBrightness],
  set: (val) => ledConfig.value.ledBrightness = val[0],
})

const ringColors = ref({
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

const keyColors = ref({
  a: {
    key: 'a',
    color: Color('#ff2a7d'),
  },
  b: {
    key: 'b',
    color: Color('#f32a9c'),
  },
  c: {
    key: 'c',
    color: Color('#d12ab1'),
  },
  d: {
    key: 'd',
    color: Color('#a92ac3'),
  },
})
</script>