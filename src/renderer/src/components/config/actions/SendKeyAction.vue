<template>
  <div class="flex flex-col p-4">
    <Button
      class="flex-1"
      :class="{ 'bg-orange-700 hover:bg-orange-600': isCapturing }"
      @click="toggleCapture"
      >⬤
      {{ isCapturing ? 'Capturing Keyboard Input' : 'Capture Keyboard Input' }}
    </Button>
    <div v-if="lastEvent" class="mt-6 text-center font-mono text-sm text-muted-foreground">
      Key: {{ lastEvent?.key }} | Code: {{ lastEvent?.keyCode }} | Type: {{ lastEvent?.type }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@renderer/components/ui/button'
import { ref, Ref } from 'vue'

const isCapturing = ref(false)
const listener = (e: KeyboardEvent) => {
  lastEvent.value = e
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
