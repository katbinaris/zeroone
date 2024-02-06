<template>
  <div
    class="px-4 py-2"
    :style="{background: `linear-gradient(180deg, ${options[currentOption].color.hex()+'11'}, ${options[currentOption].color.hex()+'30'} 25%, ${options[currentOption].color.hex()+'30'} 40%, transparent 60%`}">
    <div
      class="flex font-heading rounded-t-lg overflow-hidden border-t border-x border-zinc-800 bg-zinc-900">
      <button
        v-for="(option, key) in options" :key="key"
        class="flex-1 py-2 items-center text-center rounded-t-lg min-w-0 transition-colors"
        :class="currentOption!==key ? 'hover:bg-zinc-800 text-muted-foreground' : 'text-black bg-zinc-300 hover:bg-zinc-200'"
        @click="currentOption = key">
        {{ $t(option.titleKey) }}
      </button>
    </div>
    <div class="flex border-x border-zinc-800 overflow-hidden">
      <button
        v-for="(option, key) in options" :key="key" class="flex-1 h-4"
        :class="{ 'color-tab': currentOption === key}"
        :style="{background: option.color.hex()}" @click="currentOption = key" />
    </div>
    <HSVInput v-model="options[currentOption].color" class="relative z-20" />
  </div>
</template>
<script setup>
import HSVInput from '@/components/common/HSVInput.vue'
import Color from 'color'
import { computed, onBeforeMount, reactive, ref } from 'vue'

const currentOption = ref(null)

const currentColorHex = computed(() => options[currentOption.value].color.hex())

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
<style scoped>
.color-tab {
  position: relative;
  --rounded: var(--radius);
}

.color-tab:before,
.color-tab:after {
  position: absolute;
  bottom: -1px;
  width: var(--rounded);
  height: var(--rounded);
  content: " ";
}

.color-tab:before {
  left: calc(var(--rounded) * -1);
  border-bottom-right-radius: var(--rounded);
  border-width: 0 1px 1px 0;
  box-shadow: calc(var(--rounded) / 4) calc(var(--rounded) / 4) 0 v-bind('currentColorHex');
  z-index: 1;
}

.color-tab:after {
  right: calc(var(--rounded) * -1);
  border-bottom-left-radius: var(--rounded);
  border-width: 0 0 1px 1px;
  box-shadow: calc(var(--rounded) / 4 * -1) calc(var(--rounded) / 4) 0 v-bind('currentColorHex');
  z-index: 1;
}

.color-tab:after, .color-tab:before {
  border: none;
}
</style>