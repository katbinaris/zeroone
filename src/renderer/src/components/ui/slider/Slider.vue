<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'radix-vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@renderer/lib/utils'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    v-bind="forwarded"
  >
    <SliderTrack
      class="flex h-2 w-full grow items-center overflow-hidden rounded-full bg-primary/20 transition-all duration-75"
    >
      <SliderRange class="absolute h-1.5 rounded-full bg-primary" />
    </SliderTrack>
    <SliderThumb
      class="flex h-6 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-zinc-100 bg-zinc-300 text-zinc-600 transition-all duration-75 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      style="box-shadow: -3px 0 15px 0 rgba(0, 0, 0, 0.6)"
    >
      <MoreHorizontal class="h-full" />
    </SliderThumb>
  </SliderRoot>
</template>
