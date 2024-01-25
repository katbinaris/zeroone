<template>
  <Collapsible v-model:open="collapse" :default-open="true">
    <CollapsibleTrigger class="w-full bg-zinc-900 flex items-center px-4">
      <component :is="iconComponent" class="h-4 w-4" />
      <h2 class="text-sm px-2 py-4">{{ title }}</h2>
      <ChevronLeft class="chevrot h-4 w-4 mb-0.5 transition-transform ml-auto text-muted-foreground" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible/index.js'
import { ref } from 'vue'

const collapse = ref(true)

defineProps({
  title: {
    type: String,
    default: 'MISSING_TITLE',
  },
  iconComponent: {
    type: [String, Object],
    default: 'div',
  },
})

</script>
<style scoped>
[data-state=open] > .chevrot {
  transform: rotate(-90deg);
}
</style>