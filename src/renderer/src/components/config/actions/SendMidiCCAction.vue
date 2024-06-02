<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">CC:</span>
        <Input v-model="ccInput" class="my-2 uppercase" type="number" />
      </div>
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Channel:</span>
        <Input v-model="channelInput" class="my-2 uppercase" type="number" />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Value:</span>
        <Input v-model="valueInput" class="my-2 uppercase" type="number" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Action } from '@renderer/deviceStore'
import { ref, watch, nextTick } from 'vue'
import { Input } from '@renderer/components/ui/input'

const emit = defineEmits(['update'])

const props = defineProps({
  action: {
    type: Object as () => Action,
    required: true
  }
})

const ccInput = ref(props.action.cc)
const channelInput = ref(props.action.channel)
const valueInput = ref(props.action.val)

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

watch(valueInput, (val) => {
  nextTick(() => {
    valueInput.value = Math.max(0, Math.min(Number(val), 127))
  })
  emit('update', { val: valueInput.value })
})
</script>
