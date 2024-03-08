<template>
  <div class="flex flex-col p-4">
    <Button
      class="flex-1"
      :class="{ 'bg-orange-600 hover:bg-orange-500': isCapturing }"
      @click="toggleCapture"
      >⬤
      {{ isCapturing ? 'Capturing Keyboard Input' : 'Capture Keyboard Input' }}
    </Button>
    <div class="mt-6 text-center font-mono text-sm text-muted-foreground">
      Key: {{ lastEvent?.key }} | Code: {{ lastEvent?.keyCode }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@renderer/components/ui/button'
import { ref, Ref } from 'vue'

const isCapturing = ref(false)
const keydownListener = (e: KeyboardEvent) => {
  lastEvent.value = e
}
const keyupListener = (e: KeyboardEvent) => {
  lastEvent.value = e
}

const toggleCapture = () => {
  isCapturing.value = !isCapturing.value
  // TODO: Do this in the main process
  if (isCapturing.value) {
    window.addEventListener('keydown', keydownListener)
    window.addEventListener('keyup', keyupListener)
  } else {
    window.removeEventListener('keydown', keydownListener)
    window.removeEventListener('keyup', keyupListener)
  }
}
const lastEvent: Ref<KeyboardEvent | null> = ref(null)
</script>
