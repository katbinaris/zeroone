<template>
  <div class="flex">
    <div
      v-for="(key, index) in keys" :key="key" class="aspect-square flex-1 rounded-[2px] flex items-center justify-center"
      :style="`box-shadow: 0 0 20px 0 hsl(${-hue + index * 20},100%,50%)`">
      <div class="font-heading text-2xl text-black opacity-30">{{ key}}</div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const keys = ref(['a', 'b', 'c', 'd'])

const hue = ref(0)

onMounted(() => {
  gsap.to(hue, { duration: 10, value: 360, repeat: -1, ease: 'none' })
})
</script>