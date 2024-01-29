<template>
  <button
    class="flex-1 flex flex-col items-center py-2"
    :class="{'text-black bg-zinc-200 hover:bg-zinc-100': selected,
    'hover:bg-zinc-800 text-muted-foreground' : !selected}"
    @click="$emit('select'); $refs.title.scramble()">
    <img
      draggable="false"
      :src="icon" alt="connection-type-icon"
      class="w-16 py-2"
      :class="{'invert': selected}">
    <ScrambleText ref="title" :resize="false" class="text-xs text-wrap p-1" :text="title" />
  </button>
</template>
<script setup>
import ScrambleText from '@/components/effects/ScrambleText.vue'

defineEmits(['select'])

defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: [String, Object, Function],
    default: '',
  },
  selected: {
    type: Boolean,
    default: false,
  },
})
</script>