<template>
  <div class="flex flex-col px-8 my-4">
    <span class="text-sm text-muted-foreground font-mono">{{ label }}</span>
    <Slider
      ref="steppedSlider" v-model="sliderModelValue" :max="max" :step="1"
      class="pt-4" />
    <div class="flex justify-between py-2">
      <button
        v-for="(position, index) in positions" :key="position"
        class="min-w-0 text-nowrap"
        :class="{
          'slider-start mr-4': index===0,
          'slider-center': index > 0 && index < positions.length-1,
          'slider-end ml-4': index === positions.length-1}"
        @click="value = position.value">
        <span
          v-if="index===0" class="rounded-full w-2 h-1.5 inline-block mb-[1px] transition-colors"
          :class="value===position.value ? 'bg-zinc-100' : 'bg-zinc-600'" />
        <span
          v-if="position.label" class="text-xs font-mono uppercase mx-1 transition-colors"
          :class="value===position.value ? 'text-zinc-100' : 'text-zinc-600'">{{ position.label }}</span>
        <span
          v-if="!position.label || index === positions.length-1"
          class="rounded-full w-2 h-1.5 inline-block mb-[1px] transition-colors"
          :class="value===position.value ? 'bg-zinc-100' : 'bg-zinc-600'" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { Slider } from '@/components/ui/slider'
import { computed } from 'vue'

const value = defineModel({
  type: Number,
  default: 0,
})

const sliderModelValue = computed({
  get: () => [value.value],
  set: (val) => {
    value.value = val[0]
  },
})

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  max: {
    type: Number,
    default: 4,
  },
  namedPositions: {
    type: Array,
    default: () => [
      {
        label: 'Min',
        value: 0,
      },
      {
        value: 2,
      },
      {
        label: 'Max',
        value: 4,
      },
    ],
  },
  autoMarkers: {
    type: Boolean,
    default: true,
  },
})

const positions = computed(() => {
  if (props.autoMarkers) {
    const filled = []
    for (let i = 0; i <= props.max; i++) {
      const position = props.namedPositions.find((p) => p.value === i) || { value: i }
      filled.push(position)
    }
    return filled
  }
  return props.namedPositions
})
</script>
<style scoped>
.slider-start {
  text-align: left;
}

.slider-center {
  text-align: center;
}

.slider-end {
  text-align: right;
}

.slider-start,
.slider-end {
  flex: 0.5;
}

.slider-center {
  flex: 1;
}
</style>