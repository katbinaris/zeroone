<template>
  <div
    class="pt-2"
    :style="{
      background: `linear-gradient(180deg, ${currentColorHex + '11'}, ${currentColorHex + '30'} 25%, ${currentColorHex + '30'} 40%, transparent 60%`
    }"
  >
    <div
      class="font-heading mx-2 flex overflow-hidden rounded-t-lg border-x border-t border-zinc-800 bg-zinc-900"
    >
      <button
        v-for="(option, key) in options"
        :key="key"
        class="min-w-0 flex-1 items-center rounded-t-lg py-2 text-center transition-colors"
        :class="
          currentOption !== key
            ? 'hover:bg-zinc-800 text-muted-foreground mx-[1px]'
            : 'text-black bg-zinc-300 hover:bg-zinc-200 border-x border-t border-zinc-100'
        "
        @click="
          () => {
            enableAnimateSliders()
            currentOption = key
          }
        "
      >
        {{ $t(option.titleKey) }}
      </button>
    </div>
    <div class="mx-2 flex overflow-hidden border-x border-zinc-800">
      <button
        v-for="(option, key) in options"
        :key="key"
        class="h-6 flex-1 transition-colors"
        :class="{ 'color-tab': currentOption === key }"
        :style="{ background: Color(option.colorNumber).hex() }"
        @click="
          () => {
            enableAnimateSliders()
            currentOption = key
          }
        "
      />
    </div>
    <HSVInput
      ref="hsvInput"
      :color-number="options[currentOption].colorNumber"
      @input="(colorNumber) => $emit('input', currentOption, colorNumber)"
    />
  </div>
</template>
<script setup>
import HSVInput from '@renderer/components/common/HSVInput.vue'
import Color from 'color'
import { computed, onBeforeMount, ref } from 'vue'

defineEmits(['input'])

const currentOption = ref(null)

const hsvInput = ref(null)

const currentColorHex = computed(() => Color(props.options[currentOption.value].colorNumber).hex())

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      one: {
        titleKey: 'One',
        colorNumber: Color('#ff0000').rgbNumber()
      },
      two: {
        titleKey: 'Two',
        colorNumber: Color('#00ff00').rgbNumber()
      },
      three: {
        titleKey: 'Three',
        colorNumber: Color('#0000ff').rgbNumber()
      }
    })
  }
})

function enableAnimateSliders() {
  hsvInput.value.enableAnimateSliders()
}
defineExpose({ enableAnimateSliders })

onBeforeMount(() => {
  if (currentOption.value === null) currentOption.value = Object.keys(props.options)[0]
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
  content: ' ';
  transition: box-shadow 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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

.color-tab:after,
.color-tab:before {
  border: none;
}
</style>
