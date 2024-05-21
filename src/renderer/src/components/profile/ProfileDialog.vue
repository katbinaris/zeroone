<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'
import { ref } from 'vue'

const open = ref(false)

const show = () => {
  open.value = true
}

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({
      id: '1234',
      name: 'PROFILE NAME',
      desc: 'PROFILE DESCRIPTION'
    }),
    required: true
  }
})

const nameInput = ref(props.profile.name)
const descriptionInput = ref(props.profile.desc)

defineExpose({ show })
defineEmits(['update:name', 'update:description'])
</script>

<template>
  <Dialog :open="open" @update:open="(v) => (open = v)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Profile properties</DialogTitle>
      </DialogHeader>
      <div>
        <span class="font-mono text-sm text-muted-foreground">Title:</span>
        <Input
          v-model="nameInput"
          class="my-2 uppercase"
          type="text"
          @update:model-value="(name) => $emit('update:name', name)"
        />
      </div>
      <div>
        <span class="font-mono text-sm text-muted-foreground">Description:</span>
        <Textarea
          v-model="descriptionInput"
          maxlength="40"
          class="my-2 max-h-64 uppercase"
          @update:model-value="(description) => $emit('update:description', description)"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
