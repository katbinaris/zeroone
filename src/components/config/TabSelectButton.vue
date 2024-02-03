<template>
  <button
    class="flex-1 flex flex-col items-center rounded-xl p-1 gap-2"
    :class="{'text-black bg-zinc-300 hover:bg-zinc-200 outline outline-zinc-100': selected,
    'hover:bg-zinc-800 text-muted-foreground' : !selected}"
    @click="$emit('select'); $refs.title.scramble()">
    <slot v-if="$slots['replace']" name="replace" />
    <template v-else>
      <img
        draggable="false"
        :src="icon" alt="connection-type-icon"
        class="h-16"
        :class="{'invert': selected}">
      <ScrambleText ref="title" :resize="false" class="text-xs text-wrap" :text="title" />
    </template>
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