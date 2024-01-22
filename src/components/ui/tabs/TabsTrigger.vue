<script setup>
import { TabsTrigger } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  value: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: String, required: false },
});
</script>

<template>
  <TabsTrigger
    v-bind="props"
    :class="
      cn(
        'items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:hover:bg-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:ring-emerald-600 ring- data-[state=active]:ring-1 py-2',
        props.class
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
