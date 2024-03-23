<template>
  <div class="flex flex-col" :class="{ 'gap-2': actions.length }">
    <draggable
      key="actionsDraggable"
      class="flex flex-col gap-2"
      group="keyActions"
      item-key="id"
      handle=".action-handle"
      :list="actions"
      v-bind="dragOptions"
    >
      <template #item="dragAction">
        <div :key="dragAction.element.id">
          <ActionCard :action-index="dragAction.index + 1" :action="dragAction.element" />
        </div>
      </template>
    </draggable>
    <button
      class="flex flex-1 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-sm text-muted-foreground hover:bg-zinc-800 hover:text-zinc-200"
    >
      <Plus class="mr-2" /> Add an action
    </button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import ActionCard from '@renderer/components/config/actions/ActionCard.vue'
import draggable from 'vuedraggable'
import { ref } from 'vue'
defineProps({
  actions: {
    type: Array,
    required: true
  }
})
const dragOptions = ref({
  ghostClass: 'ghost',
  animation: 150,
  direction: 'vertical'
})
</script>
