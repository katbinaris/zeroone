<template>
  <div class="p-2 border-solid border-0 border-b">
    <div class="flex rounded-lg overflow-hidden border border-zinc-800">
      <TransitionGroup name="flex">
        <TabSelectButton
          v-for="(option, key) in options" :key="key"
          :ref="(el) => buttons[key] = el"
          :title="$t(option.titleKey)"
          :icon="option.icon" :selected="model===key"
          class="min-w-0 overflow-hidden"
          @select="model=key">
          <template v-if="$slots[key]" #replace>
            <slot :name="key" />
          </template>
        </TabSelectButton>
      </TransitionGroup>
    </div>
  </div>
</template>
<script setup>
import { CircleDot } from 'lucide-vue-next'
import TabSelectButton from '@/components/common/TabSelectButton.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const model = defineModel({
  type: String,
  default: 'a',
})

const buttons = ref({})

const showBackground = ref(false)

const backgroundStyle = ref({
  top: '0',
  left: '0',
  width: '0',
  height: '0',
})

const updateBackgroundStyle = () => {
  const selected = buttons.value[model.value]
  if (selected) {
    backgroundStyle.value = {
      top: `${selected.$el.offsetTop}px`,
      left: `${selected.$el.offsetLeft}px`,
      width: `${selected.$el.offsetWidth}px`,
      height: `${selected.$el.offsetHeight}px`,
    }
  }
}

watch([model, buttons], () => {
  updateBackgroundStyle()
  showBackground.value = true
})

let observer = null

onMounted(() => {
  observer = new ResizeObserver(updateBackgroundStyle)
  observer.observe(buttons.value[model.value].$el)
})

onBeforeUnmount(() => {
  observer.disconnect()
})

defineProps({
  options: {
    type: Object,
    default: () => ({
      a: { titleKey: 'Option A', icon: CircleDot },
      b: { titleKey: 'Option B', icon: CircleDot },
      c: { titleKey: 'Option C', icon: CircleDot },
    }),
  },
})
</script>
<style scoped>
.flex-enter-active,
.flex-leave-active {
  transition: flex-grow 75ms;
}

.flex-enter-from,
.flex-leave-to {
  flex-grow: 0.000001;
}
</style>