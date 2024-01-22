<script setup>
import { Label } from "radix-vue";
import { useFormField } from "./useFormField";
import { cn } from "@/lib/utils";

const props = defineProps({
  for: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="
      cn(
        'block text-sm tracking-tight font-medium text-foreground text-left',
        error && 'text-destructive',
        $attrs.class ?? ''
      )
    "
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
