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
      :class="{'invert': invert && selected}">
    <ScrambleText ref="title" :resize="false" class="text-xs text-wrap p-1" :text="title" />
    <span>
      <ArrowBigUp class="inline-block" />
      <Badge
        class="shadow-none text-wrap inline-block p-0.5 mx-1"
        :class="{'bg-orange-400': selected, 'bg-zinc-400': !selected}">Space</Badge>+<Badge
      class="shadow-none text-wrap inline-block p-0.5 mx-1"
      :class="{'bg-orange-400': selected, 'bg-zinc-400': !selected}">E</Badge>
    </span>
  </button>
</template>
<script setup>
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { Badge } from '@renderer/components/ui/badge'
import { ArrowBigUp } from 'lucide-vue-next'

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
  invert: {
    type: Boolean,
    default: true,
  },
  badge: {
    type: [String, Object, Function],
    default: '',
  },
})
</script>