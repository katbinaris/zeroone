<script setup>
import { computed, ref } from 'vue'
import { SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const hue = ref([0])
const saturation = ref([100])
const lightness = ref([50])

function hslToRgb(h, s, l) {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

const rgb = computed(() => hslToRgb(hue.value / 360, saturation.value / 100, lightness.value / 100))

</script>
<template>
  <div>
    <div
      class="w-full flex p-4" :style="{backgroundColor: `hsl(${hue},${saturation}%,${lightness}%)`}">
      <div class="opacity-50" :class="{'text-black': lightness > 50}">
        <p class="font-heading">H: {{ String(hue[0]).padStart(3, '0') }}</p>
        <p class="font-heading">S: {{ String(saturation[0]).padStart(3, '0') }}</p>
        <p class="font-heading">L: {{ String(lightness[0]).padStart(3, '0') }}</p>
      </div>
      <div class="opacity-50 ml-auto" :class="{'text-black': lightness > 50}">
        <p class="font-heading">R: {{ String(rgb[0]).padStart(3, '0') }}</p>
        <p class="font-heading">G: {{ String(rgb[1]).padStart(3, '0') }}</p>
        <p class="font-heading">B: {{ String(rgb[2]).padStart(3, '0') }}</p>
      </div>
    </div>
    <div
      class="w-full h-10 absolute"
      :style="{background: `linear-gradient(180deg, hsla(${hue}, ${saturation}%, ${lightness}%, 30%) 0%, transparent 100%`}" />
    <div class="px-6 py-4 flex">
      <p class="font-heading text-muted-foreground w-24">HUE</p>
      <SliderRoot v-model="hue" :max="360" class="relative flex w-full touch-none select-none items-center">
        <SliderTrack
          class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
          style="background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 154, 0, 1) 10%, rgba(208, 222, 33, 1) 20%, rgba(79, 220, 74, 1) 30%, rgba(63, 218, 216, 1) 40%, rgba(47, 201, 226, 1) 50%, rgba(28, 127, 238, 1) 60%, rgba(95, 21, 242, 1) 70%, rgba(186, 12, 248, 1) 80%, rgba(251, 7, 217, 1) 90%, rgba(255, 0, 0, 1) 100%)" />
        <SliderThumb
          class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderRoot>
    </div>
    <div class="px-6 py-4 flex">
      <p class="font-heading text-muted-foreground w-24">SAT</p>
      <SliderRoot v-model="saturation" :max="100" class="relative flex w-full touch-none select-none items-center">
        <SliderTrack
          class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
          :style="{background: `linear-gradient(90deg, hsl(${hue}, 0%, ${lightness}%) 0%, hsl(${hue}, 100%, ${lightness}%) 100%)`}" />
        <SliderThumb
          class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderRoot>
    </div>
    <div class="px-6 py-4 flex">
      <p class="font-heading text-muted-foreground w-24">LIT</p>
      <SliderRoot v-model="lightness" :max="100" class="relative flex w-full touch-none select-none items-center">
        <SliderTrack
          class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
          :style="{background: `linear-gradient(90deg, hsl(${hue}, ${saturation}%, 0%) 0%, hsl(${hue}, ${saturation}%, 50%) 50%, hsl(${hue}, ${saturation}%, 100%) 100%)`}" />
        <SliderThumb
          class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderRoot>
    </div>
  </div>
</template>
