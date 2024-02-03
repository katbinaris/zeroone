<template>
  <div class="flex font-heading px-4 py-2 gap-2">
    <div class="absolute"/>
    <TabSelectButton
      v-for="(option, key) in options" :key="key"
      :title="$t(option.titleKey)"
      :icon="option.icon" :selected="model===key"
      @select="model=key">
      <template v-if="$slots[key]" #replace>
        <slot :name="key" />
      </template>
    </TabSelectButton>
  </div>
</template>
<script setup>
import { CircleDot } from 'lucide-vue-next'
import TabSelectButton from '@/components/config/TabSelectButton.vue'

const model = defineModel({
  type: String,
  default: 'a',
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