<template>
  <div class="p-4">
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">CC:</span>
        <Input v-model="ccModel" class="my-2" type="number" />
      </div>
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Channel:</span>
        <Input v-model="channelModel" class="my-2" type="number" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from '@renderer/components/ui/input'
import { computed } from 'vue'
const props = defineProps({
  value: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update'])
//TODO: These inputs are limited to 0-127 and 1-16, but once the value is at min/max the change events don't propagate and the field can contain invalid values
const ccModel = computed({
  get: () => props.value.cc || 0,
  set: (cc) => emit('update', { cc: Math.max(0, Math.min(Number(cc), 127)) })
})

const channelModel = computed({
  get: () => props.value.channel || 1,
  set: (channel) => emit('update', { channel: Math.max(1, Math.min(Number(channel), 16)) })
})
</script>
