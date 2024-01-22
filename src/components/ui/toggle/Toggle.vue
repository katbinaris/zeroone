<script setup>
import { Toggle, useForwardPropsEmits } from "radix-vue";
import { computed, useAttrs } from "vue";
import { toggleVariants } from ".";
import { cn } from "@/lib/utils";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  variant: { type: null, required: false, default: "default" },
  size: { type: null, required: false, default: "default" },
  disabled: { type: Boolean, required: false, default: false },
  defaultValue: { type: Boolean, required: false },
  pressed: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
const emits = defineEmits(["update:pressed"]);

const toggleProps = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { variant, size, disabled, ...otherProps } = props;
  return otherProps;
});

const { class: className, ...rest } = useAttrs();
const forwarded = useForwardPropsEmits(toggleProps.value, emits);
</script>

<template>
  <Toggle
    v-bind="{
      ...forwarded,
      ...rest,
    }"
    :class="cn(toggleVariants({ variant, size }), className ?? '')"
    :disabled="props.disabled"
  >
    <slot />
  </Toggle>
</template>
