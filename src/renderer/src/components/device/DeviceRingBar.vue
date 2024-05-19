<template>
  <svg :viewBox="`0 0 ${size} ${size}`">
    <circle
      :r="radius"
      :cx="size / 2"
      :cy="size / 2"
      :transform="`rotate(${rotationOffset - 90 + value * 3.6 + gap / 2} ${size / 2} ${size / 2})`"
      stroke="#4a4a4a"
      fill="transparent"
      :stroke-width="thiccness"
      :stroke-dasharray="`${Math.max(0, (1 - value / 100) * circumference - gap * 2)} ${circumference}`"
    />
    <circle
      :r="radius"
      :cx="size / 2"
      :cy="size / 2"
      :transform="`rotate(${rotationOffset - 90 + gap / 2} ${size / 2} ${size / 2})`"
      stroke="#c66936"
      fill="transparent"
      :stroke-width="thiccness"
      :stroke-dasharray="`${Math.max(0, (value / 100) * circumference - gap * 2)} ${circumference}`"
    />
    <circle
      :r="thiccness / 1.5"
      :cx="size / 2"
      :cy="padding + thiccness"
      fill="white"
      :transform="`rotate(${value * 3.6 + rotationOffset} ${size / 2} ${size / 2})`"
    />
  </svg>
</template>
<script setup>
import { computed, ref } from 'vue'

defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const radius = ref(100)
const thiccness = ref(3)
const padding = ref(40)
const rotationOffset = ref(180)
const gap = ref(5)

const size = computed(() => (radius.value + thiccness.value + padding.value) * 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
</script>
