<template>
  <div class="p-4">
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">CC:</span>
        <Input v-model="ccInput" class="my-2" type="number" />
      </div>
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Channel:</span>
        <Input v-model="channelInput" class="my-2" type="number" />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Min:</span>
        <Input v-model="valueMinInput" class="my-2" type="number" />
      </div>
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Max:</span>
        <Input v-model="valueMaxInput" class="my-2" type="number" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from '@renderer/components/ui/input'
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  value: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update'])

const ccInput = ref(props.value.cc)
const channelInput = ref(props.value.channel)
const valueMinInput = ref(props.value.valueMin)
const valueMaxInput = ref(props.value.valueMax)

watch(ccInput, (cc) => {
  nextTick(() => {
    ccInput.value = Math.max(0, Math.min(Number(cc), 127))
  })
  emit('update', { cc: ccInput.value })
})

watch(channelInput, (channel) => {
  nextTick(() => {
    channelInput.value = Math.max(1, Math.min(Number(channel), 16))
  })
  emit('update', { channel: channelInput.value })
})

watch(valueMinInput, (valueMin) => {
  nextTick(() => {
    valueMinInput.value = Math.max(0, Math.min(Number(valueMin), 127))
  })
  emit('update', { valueMin: valueMinInput.value })
})

watch(valueMaxInput, (valueMax) => {
  nextTick(() => {
    valueMaxInput.value = Math.max(0, Math.min(Number(valueMax), 127))
  })
  emit('update', { valueMax: valueMaxInput.value })
})
</script>
