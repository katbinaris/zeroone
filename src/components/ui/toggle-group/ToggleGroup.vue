<script setup>
import { computed, provide } from "vue";
import { ToggleGroupRoot, useForwardPropsEmits } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  type: { type: String, required: false },
  defaultValue: { type: [String, Array], required: false },
  modelValue: { type: [String, Array], required: false },
  rovingFocus: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  loop: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
});
const emits = defineEmits(["update:modelValue"]);

provide("toggleGroup", {
  variant: props.variant,
  size: props.size,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps.value, emits);
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :class="cn('grid grid-cols-4 gap-1 h-auto bg-inherit p-4 items-center justify-center rounded-lg text-muted-foreground', props.class)" 
  >
    <slot />
  </ToggleGroupRoot>
</template>
