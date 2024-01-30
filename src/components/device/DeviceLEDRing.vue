<template>
  <svg :width="size" :height="size" filter="url(#blur)" class="mix-blend-screen">
    <filter id="blur" color-interpolation-filters="sRGB">
      <feGaussianBlur
        v-for="index in blurSteps" :key="index" in="SourceGraphic" :stdDeviation="blur*index"
        :result="index" />
      <feMerge result="blurMerge">
        <feMergeNode v-for="index in blurSteps" :key="index" :in="index" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <circle
      v-for="index in ledCount" :key="index"
      :r="radius"
      :cx="size/2"
      :cy="size/2"
      fill="none"
      :stroke-width="ledWidth"
      :stroke-dashoffset="index/ledCount*ledArcSize"
      :stroke-dasharray="`${ledArcSize/ledCount} ${ledArcSize}`"
      :stroke="`rgb(${index/ledCount*255} ${index/ledCount*255-128} ${0})`" />
  </svg>
</template>
<script setup>
import { computed, ref } from 'vue'

const radius = ref(120)
const ledWidth = ref(5)
const ledCount = ref(60)
const blur = ref(10)
const blurSteps = ref(3)
const padding = ref(20)

const size = computed(() => (radius.value + padding.value) * 2 + ledWidth.value)
const ledArcSize = computed(() => 2 * Math.PI * radius.value)

</script>