<template>
  <div class="flex flex-col p-4">
    <span class="font-mono text-sm text-muted-foreground">Keycode:</span>
    <div class="flex gap-2">
      <Button
        :class="{ 'bg-orange-700 hover:bg-orange-600': isCapturing }"
        class="my-2 flex-1"
        @click="toggleCapture"
        >⬤
        {{ isCapturing ? 'Capturing' : 'Capture' }}
      </Button>
      <Input v-model="keyCodeInput" class="my-2 flex-1 uppercase" type="number" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Action } from '@renderer/deviceStore'
import { Button } from '@renderer/components/ui/button'
import { ref, watch, Ref } from 'vue'
import { Input } from '@renderer/components/ui/input'

const emit = defineEmits(['update'])

const props = defineProps({
  action: {
    type: Object as () => Action,
    required: true
  }
})

const keyCodeInput = ref(props.action.keyCodes ? props.action.keyCodes[0] : '')

watch(keyCodeInput, (keyCode) => {
  emit('update', { keyCodes: [keyCode] })
})

const isCapturing = ref(false)
const listener = (e: KeyboardEvent) => {
  lastEvent.value = e
  keyCodeInput.value = e.keyCode
  toggleCapture()
}

const toggleCapture = () => {
  isCapturing.value = !isCapturing.value
  // TODO: Do this in the main process
  if (isCapturing.value) {
    window.addEventListener('keydown', listener)
    window.addEventListener('keyup', listener)
  } else {
    window.removeEventListener('keydown', listener)
    window.removeEventListener('keyup', listener)
  }
}
const lastEvent: Ref<KeyboardEvent | null> = ref(null)
</script>
