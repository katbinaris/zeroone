<script setup>
import { ProgressIndicator, ProgressRoot } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: { type: [Number, null], required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: String, required: false, default: "" },
});
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        props.class
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="cn('h-full w-full flex-1 bg-primary transition-all', props.class)"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
