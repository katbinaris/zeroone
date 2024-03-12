<template>
  <div
    class="pt-2"
    :style="{
      background: `linear-gradient(180deg, ${options[currentOption].color.hex() + '11'}, ${options[currentOption].color.hex() + '30'} 25%, ${options[currentOption].color.hex() + '30'} 40%, transparent 60%`
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
        @click="currentOption = key"
      >
        {{ $t(option.titleKey) }}
      </button>
    </div>
    <div class="mx-2 flex overflow-hidden border-x border-zinc-800">
      <button
        v-for="(option, key) in options"
        :key="key"
        class="h-6 flex-1"
        :class="{ 'color-tab': currentOption === key }"
        :style="{ background: option.color.hex() }"
        @click="currentOption = key"
      />
    </div>
    <HSVInput
      :color="options[currentOption].color"
      @input="(color) => $emit('input', currentOption, color)"
    />
  </div>
</template>
<script setup>
import HSVInput from '@renderer/components/common/HSVInput.vue'
import Color from 'color'
import { computed, onBeforeMount, ref } from 'vue'

defineEmits(['input'])

const currentOption = ref(null)

const currentColorHex = computed(() => props.options[currentOption.value].color.hex())

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      one: {
        titleKey: 'One',
        color: Color('#ff0000')
      },
      two: {
        titleKey: 'Two',
        color: Color('#00ff00')
      },
      three: {
        titleKey: 'Three',
        color: Color('#0000ff')
      }
    })
  }
})

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
