<script setup>
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useEmitAsProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, required: false },
  defaultValue: { type: Array, required: false },
  modelValue: { type: Array, required: false },
  disabled: { type: Boolean, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  inverted: { type: Boolean, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  step: { type: Number, required: false },
  minStepsBetweenThumbs: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
})
const emits = defineEmits(['update:modelValue', 'valueCommit'])
</script>

<template>
  <SliderRoot
    :class="
      cn(
        'relative flex w-full touch-none select-none items-center',
        $attrs.class ?? ''
      )
    "
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
  >
    <SliderTrack
      class="flex h-2 w-full grow overflow-hidden rounded-full bg-primary/20 items-center"
    >
      <SliderRange class="absolute h-1.5 bg-primary rounded-full" />
    </SliderTrack>
    <SliderThumb
      class="flex h-6 w-8 rounded-[8px] hover:bg-zinc-200 outline outline-zinc-100 bg-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-zinc-600 justify-center items-center"
      style="box-shadow: 0 0 15px 0 rgba(0,0,0,0.5)">
      <MoreHorizontal class="h-full" />
    </SliderThumb>
  </SliderRoot>
</template>
