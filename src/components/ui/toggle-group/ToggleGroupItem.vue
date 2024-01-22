<script setup>
import { computed, inject } from "vue";
import { ToggleGroupItem, useForwardProps } from "radix-vue";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const props = defineProps({
  value: { type: String, required: true },
  defaultValue: { type: Boolean, required: false },
  pressed: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
});

const context = inject("toggleGroup");

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps.value);
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
         'items-center py-12 justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=off]:hover:bg-zinc-900 data-[state=on]:bg-zinc-900 data-[state=on]:ring-emerald-600 ring- data-[state=on]:ring-1  py-2',
        props.class
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>
