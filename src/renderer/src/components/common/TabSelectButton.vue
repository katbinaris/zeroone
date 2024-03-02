<template>
  <button
    class="font-heading flex flex-1 flex-col items-center gap-2 rounded-lg border p-2 transition-all"
    :class="{
      'border-zinc-100 bg-zinc-300 text-black hover:bg-zinc-200': selected,
      'border-transparent text-muted-foreground hover:bg-zinc-800': !selected
    }"
    @click="
      () => {
        $emit('select')
        $refs.title?.scramble()
      }
    "
  >
    <slot v-if="$slots['replace']" name="replace" />
    <template v-else>
      <img
        v-if="icon"
        draggable="false"
        :src="icon"
        :alt="title"
        class="h-16"
        :class="{ invert: selected }"
      />
      <ScrambleText
        ref="title"
        :resize="false"
        class="line-clamp-2 overflow-hidden text-ellipsis text-wrap text-xs"
        :text="title"
      />
    </template>
  </button>
</template>
<script setup>
import ScrambleText from '@renderer/components/common/ScrambleText.vue'

defineEmits(['select'])

defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object, Function],
    default: null
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>
