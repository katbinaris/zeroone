<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2">
      <div class="flex-1">
        <span class="font-mono text-sm text-muted-foreground">Profile Name:</span>
        <Input v-model="profileNameInput" class="my-2 uppercase" type="text" />
        <!-- TODO: Make this a dropdown -->
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

const profileNameInput = ref(props.action.name)

watch(profileNameInput, (profileName) => {
  nextTick(() => {
    profileNameInput.value = profileName?.toUpperCase() || ''
  })
  emit('update', { name: profileNameInput.value })
})
</script>
