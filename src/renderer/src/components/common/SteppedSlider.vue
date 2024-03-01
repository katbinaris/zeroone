<template>
  <div class="my-4 flex flex-col px-8">
    <span class="font-mono text-sm text-muted-foreground">{{ label }}</span>
    <Slider ref="steppedSlider" v-model="sliderModelValue" :max="max" :step="1" class="pt-4" />
    <div class="flex justify-between py-2">
      <button
        v-for="(position, index) in positions"
        :key="position"
        class="group min-w-0 text-nowrap"
        :class="{
          'slider-start mr-4': index === 0,
          'slider-center': index > 0 && index < positions.length - 1,
          'slider-end ml-4': index === positions.length - 1
        }"
        @click="value = position.value"
      >
        <span
          v-if="index === 0"
          class="mb-[1px] inline-block h-1.5 w-2 rounded-full transition-colors"
          :class="value === position.value ? 'bg-zinc-100' : 'bg-zinc-600 group-hover:bg-zinc-500'"
        />
        <span
          v-if="position.label"
          class="mx-1 font-mono text-xs uppercase transition-colors"
          :class="
            value === position.value ? 'text-zinc-100' : 'text-zinc-600 group-hover:text-zinc-500'
          "
          >{{ position.label }}</span
        >
        <span
          v-if="!position.label || index === positions.length - 1"
          class="mb-[1px] inline-block h-1.5 w-2 rounded-full transition-colors"
          :class="value === position.value ? 'bg-zinc-100' : 'bg-zinc-600 group-hover:bg-zinc-500'"
        />
      </button>
    </div>
  </div>
</template>
<script setup>
import { Slider } from '@renderer/components/ui/slider'
import { computed } from 'vue'

const value = defineModel({
  type: Number,
  default: 0
})

const sliderModelValue = computed({
  get: () => [value.value],
  set: (val) => {
    value.value = val[0]
  }
})

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  max: {
    type: Number,
    default: 4
  },
  namedPositions: {
    type: Array,
    default: () => [
      {
        label: 'Min',
        value: 0
      },
      {
        value: 2
      },
      {
        label: 'Max',
        value: 4
      }
    ]
  },
  autoMarkers: {
    type: Boolean,
    default: true
  }
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
