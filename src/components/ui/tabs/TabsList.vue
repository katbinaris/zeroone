<script setup>
import { TabsList } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  loop: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: String, required: false },
});
</script>

<template>
  <TabsList
    v-bind="props"
    :class="
      cn(
        'gap-1 bg-inherit p-4 rounded-lg ',
        props.class
      )
    "
  >
    <slot />
  </TabsList>
</template>
