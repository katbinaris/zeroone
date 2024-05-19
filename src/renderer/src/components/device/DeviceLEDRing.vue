<template>
  <svg :viewBox="`0 0 ${size} ${size}`" filter="url(#blur)">
    <filter id="blur" color-interpolation-filters="sRGB">
      <feGaussianBlur
        v-for="index in blurSteps"
        :key="index"
        in="SourceGraphic"
        :stdDeviation="blur * index"
        :result="index"
      />
      <feMerge result="blurMerge">
        <feMergeNode v-for="index in blurSteps" :key="index" :in="index" />
      </feMerge>
    </filter>
    <circle
      v-for="index in ledCount"
      :key="index"
      :transform="`rotate(${(index / ledCount) * 360 + rotationOffset} ${size / 2} ${size / 2})`"
      :r="ledRadius"
      :cx="size / 2"
      :cy="padding + ledRadius"
      :fill="leds[index - 1]?.hex()"
    />
  </svg>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import Color from 'color'
import { useDeviceStore } from '@renderer/deviceStore'

const deviceStore = useDeviceStore()

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const leds = ref(Array(60).fill(Color()))

const radius = ref(100)
const ledRadius = ref(3)
const ledCount = ref(60)
const blur = ref(2)
const blurSteps = ref(5)
const padding = ref(40)
const rotationOffset = ref(180)

const size = computed(() => (radius.value + ledRadius.value + padding.value) * 2)

const updateLEDs = (value) => {
  const clamped = Math.min(98, Math.max(0, value))
  for (let i = 0; i < ledCount.value; i++) {
    if (i / ledCount.value < clamped / 100) {
      leds.value[i] = Color(deviceStore.currentProfile?.primary)
    } else if ((i - 1) / ledCount.value < clamped / 100) {
      leds.value[i] = Color(deviceStore.currentProfile?.pointer)
    } else {
      leds.value[i] = Color(deviceStore.currentProfile?.secondary)
    }
  }
}

updateLEDs(props.value)

watch(
  () => [
    deviceStore.currentProfile?.primary,
    deviceStore.currentProfile?.pointer,
    deviceStore.currentProfile?.secondary,
    props.value
  ],
  () => updateLEDs(props.value)
)
</script>
