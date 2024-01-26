<template>
  <div class="flex font-heading">
    <button
      v-for="(option, key) in options" :key="key"
      class="flex-1 pt-2 items-center text-center relative"
      :class="currentOption!==key ? '' : 'text-black bg-white'"
      @click="currentOption = key">
      {{ $t(option.key) }}
      <div class="h-4 w-full mt-2" :style="{background: option.color.hex()}"/>
    </button>
  </div>
  <HSVInput v-model="options[currentOption].color" class="relative z-20" />
</template>
<script setup>
import HSVInput from '@/components/HSVInput.vue'
import Color from 'color'
import { reactive, ref } from 'vue'

const currentOption = ref('primary')

const model = defineModel({
  type: Object,
  default: () => ({
    primary: {
      key: 'config_options.light_designer.primary_color',
      color: Color('#ff0000'),
    },
    secondary: {
      key: 'config_options.light_designer.secondary_color',
      color: Color('#00ff00'),
    },
    pointer: {
      key: 'config_options.light_designer.pointer_color',
      color: Color('#0000ff'),
    },
  }),
})

const options = reactive(model.value)

</script>