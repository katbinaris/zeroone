<template>
  <svg :viewBox="`0 0 ${size} ${size}`" filter="url(#blur)">
    <filter id="blur" color-interpolation-filters="sRGB">
      <feGaussianBlur
        v-for="index in blurSteps" :key="index" in="SourceGraphic" :stdDeviation="blur*index"
        :result="index" />
      <feMerge result="blurMerge">
        <feMergeNode v-for="index in blurSteps" :key="index" :in="index" />
      </feMerge>
    </filter>
    <circle
      v-for="index in ledCount" :key="index"
      :transform="`rotate(${index/ledCount*360} ${size/2} ${size/2})`"
      :r="ledRadius"
      :cx="size/2"
      :cy="padding + ledRadius"
      :fill="leds[index-1]?.hex()" />
  </svg>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Color from 'color'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const leds = ref(new Array(60).fill(Color()))

const radius = ref(100)
const ledRadius = ref(3)
const ledCount = ref(60)
const blur = ref(2)
const blurSteps = ref(5)
const padding = ref(40)

const size = computed(() => (radius.value + ledRadius.value + padding.value) * 2)

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    const valueIndex = Math.floor(props.value / 100 * ledCount.value)
    leds.value.forEach((color, index) => {
      const distance = Math.abs(index - valueIndex) % ledCount.value
      if (distance < 1) {
        leds.value[index] = Color.hsl(40, 100, 100)
      } else if (distance < 2) {
        leds.value[index] = Color.hsl(40, 100, 60)
      } else {
        leds.value[index] = color.mix(Color.hsl(310, 100, 20), 0.03)
      }
    })
  })
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>