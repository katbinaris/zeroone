<template>
  <Collapsible v-model:open="collapse" :default-open="true">
    <div class="flex h-12 w-full bg-zinc-900">
      <div
        class="flex flex-1 items-center px-4"
        :class="{ 'cursor-pointer hover:bg-zinc-800': showToggle }"
        @click="toggle = !toggle"
      >
        <component :is="iconComponent" v-if="iconComponent" class="mr-2 size-4" />
        <h2 class="flex flex-1 items-center py-4 text-sm">{{ title }}<slot name="title" /></h2>
        <Switch
          v-if="showToggle"
          :checked="toggle"
          class="ml-auto"
          @click.stop="toggle = !toggle"
        />
      </div>
      <CollapsibleTrigger
        v-if="foldable"
        class="flex aspect-square h-12 items-center justify-center hover:bg-zinc-800"
      >
        <ChevronLeft class="chevrot mt-0.5 size-4 text-muted-foreground transition-transform" />
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'
import { ref } from 'vue'
import { Switch } from '@renderer/components/ui/switch'

const collapse = ref(true)

const toggle = defineModel({
  type: Boolean,
  default: true
})

defineProps({
  title: {
    type: String,
    default: 'MISSING_TITLE'
  },
  iconComponent: {
    type: [String, Object, Function],
    default: undefined
  },
  showToggle: {
    type: Boolean,
    default: false
  },
  foldable: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped>
[data-state='open'] > .chevrot {
  transform: rotate(-90deg);
}
</style>
