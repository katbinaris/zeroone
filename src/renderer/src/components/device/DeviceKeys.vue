<template>
  <div class="flex">
    <button
      v-for="(keyObject, key) in keys"
      :key="key"
      :class="{
        'outline outline-white ': key === selected,
        'outline-zinc-400 hover:outline': key !== selected,
        'bg-black/20': keyObject.pressed
      }"
      class="flex aspect-square flex-1 items-center justify-center rounded-[2px] outline-2 transition-all"
      :style="`box-shadow: 0 10px 40px -2px ${colorToLED(keyObject.color)?.hex()}`"
      @click="$emit('select', key)"
    >
      <span
        class="font-heading text-2xl transition-colors"
        :class="{ 'text-white opacity-25': key !== selected }"
        >{{ key }}
      </span>
    </button>
  </div>
</template>

<script setup>
import Color from 'color'
import { colorToLED } from '@renderer/colorToLED'

defineProps({
  keys: {
    type: Object,
    default: () => ({
      a: {
        color: Color.hsl(265, 100, 50),
        pressed: false
      },
      b: {
        color: Color.hsl(0, 100, 50),
        pressed: false
      },
      c: {
        color: Color.hsl(120, 100, 50),
        pressed: false
      },
      d: {
        color: Color.hsl(60, 100, 50),
        pressed: false
      }
    })
  },
  selected: {
    type: String,
    default: 'a'
  }
})

defineEmits(['select'])
</script>
