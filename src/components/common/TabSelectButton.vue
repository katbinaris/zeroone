<template>
  <button
    class="flex-1 flex flex-col items-center rounded-lg p-2 gap-2 font-heading transition-all"
    :class="{'text-black bg-zinc-300 hover:bg-zinc-200': selected,
          'hover:bg-zinc-800 text-muted-foreground' : !selected}"
    @click="$emit('select'); $refs.title.scramble()">
    <slot v-if="$slots['replace']" name="replace" />
    <template v-else>
      <img
        v-if="icon"
        draggable="false"
        :src="icon" :alt="title"
        class="h-16"
        :class="{'invert': selected}">
      <ScrambleText ref="title" :resize="false" class="text-xs text-wrap" :text="title" />
    </template>
  </button>
</template>
<script setup>
import ScrambleText from '@/components/common/ScrambleText.vue'

defineEmits(['select'])

defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: [String, Object, Function],
    default: null,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})
</script>