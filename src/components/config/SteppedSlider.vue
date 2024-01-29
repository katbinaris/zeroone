<template>
  <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">{{ label }}</span>
    <Slider
      ref="steppedSlider" v-model="sliderModelValue" :max="max" :step="1"
      class="pt-4" />
    <div class="flex justify-between py-1">
      <button
        v-for="(position, index) in positions" :key="position"
        :class="{
          'slider-start mr-2.5': index===0,
          'slider-center': index > 0 && index < positions.length-1,
          'slider-end ml-2.5': index === positions.length-1}"
        @click="value = position.value">
        <span class="text-xs text-muted-foreground font-mono">{{ position.label || '|' }}</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { Slider } from '@/components/ui/slider'
import { computed, onBeforeMount } from 'vue'

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
        label: 'Default',
        value: 2,
      },
      {
        label: 'Max',
        value: 4,
      },
    ],
  },
  markers: {
    type: Boolean,
    default: true,
  },
})

const positions = computed(() => {
  const filled = []
  for (let i = 0; i <= props.max; i++) {
    filled.push(props.namedPositions.find((p) => p.value === i) || (props.markers && { value: i }))
  }
  return filled
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