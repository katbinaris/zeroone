<template>
  <div
    class="p-4"
    :style="{background: `linear-gradient(180deg, hsla(${options[currentOption].color.hue()}, ${options[currentOption].color.saturationl()}%, ${options[currentOption].color.lightness()}%, 30%) 0%, transparent 50%`}">
    <div
      class="flex font-heading rounded-t-xl overflow-hidden">
      <button
        v-for="(option, key) in options" :key="key"
        class="flex-1 pt-2 items-center text-center"
        :class="currentOption!==key ? 'hover:bg-zinc-800 text-zinc-200 bg-zinc-900' : 'text-black bg-zinc-300 hover:bg-zinc-200'"
        @click="currentOption = key">
        {{ $t(option.titleKey) }}
        <span class="flex h-4 w-full mt-2" :style="{background: option.color.hex()}" />
      </button>
    </div>
    <HSVInput v-model="options[currentOption].color" class="relative z-20" />
  </div>
</template>
<script setup>
import HSVInput from '@/components/common/HSVInput.vue'
import Color from 'color'
import { onBeforeMount, reactive, ref } from 'vue'

const currentOption = ref(null)

const model = defineModel({
  type: Object,
  default: () => ({
    one: {
      titleKey: 'One',
      color: Color('#ff0000'),
    },
    two: {
      titleKey: 'Two',
      color: Color('#00ff00'),
    },
    three: {
      titleKey: 'Three',
      color: Color('#0000ff'),
    },
  }),
})

const options = reactive(model.value)

onBeforeMount(() => {
  if (currentOption.value === null)
    currentOption.value = Object.keys(options)[0]
})

</script>