<template>
  <Collapsible v-model:open="collapse" :default-open="true">
    <div class="w-full bg-zinc-900 flex">
      <div
        class="flex-1 flex items-center px-4"
        :class="{'cursor-pointer hover:bg-zinc-800': showToggle}"
        @click="toggle = !toggle">
        <component :is="iconComponent" class="h-4 w-4" />
        <h2 class="text-sm px-2 py-4">{{ title }}</h2>
        <Switch
          v-if="showToggle" :checked="toggle"
          class="ml-auto" @click.stop="toggle=!toggle" />
      </div>

      <CollapsibleTrigger class="flex items-center justify-center h-12 aspect-square hover:bg-zinc-800">
        <ChevronLeft class="chevrot h-4 w-4 mt-0.5 transition-transform text-muted-foreground" />
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible/index.js'
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch/index.js'

const collapse = ref(true)

const toggle = defineModel({
  type: Boolean,
  default: true,
})

defineProps({
  title: {
    type: String,
    default: 'MISSING_TITLE',
  },
  iconComponent: {
    type: [String, Object],
    default: 'div',
  },
  showToggle: {
    type: Boolean,
    default: false,
  },
})

</script>
<style scoped>
[data-state=open] > .chevrot {
  transform: rotate(-90deg);
}
</style>