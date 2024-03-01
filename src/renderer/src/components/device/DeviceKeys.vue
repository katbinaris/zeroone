<template>
  <div class="flex">
    <button
      v-for="(color, key) in keys"
      :key="key"
      :class="{
        'outline outline-white ': key === selected,
        'outline-zinc-400 hover:outline': key !== selected
      }"
      class="flex aspect-square flex-1 items-center justify-center rounded-[2px] outline-2 transition-all"
      :style="`box-shadow: 0 3px 20px -2px ${color.hex()}`"
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

defineProps({
  keys: {
    type: Object,
    default: () => ({
      a: Color.hsl(265, 100, 50),
      b: Color.hsl(280, 100, 50),
      c: Color.hsl(300, 100, 50),
      d: Color.hsl(330, 100, 50)
    })
  },
  selected: {
    type: String,
    default: 'a'
  }
})

defineEmits(['select'])
</script>
