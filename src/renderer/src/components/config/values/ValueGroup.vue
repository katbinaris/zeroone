<template>
  <div class="flex flex-col" :class="{ 'gap-2': values.length }">
    <draggable
      key="valuesDraggable"
      class="flex flex-col gap-2"
      group="knobValues"
      item-key="id"
      handle=".value-handle"
      :list="values"
      v-bind="dragOptions"
    >
      <template #item="dragValue">
        <div :key="dragValue.element.id">
          <ValueCard
            :value="dragValue.element"
            :value-index="dragValue.index + 1"
            @delete="deviceStore.removeKnobValue(dragValue.index)"
          />
        </div>
      </template>
    </draggable>
    <button
      class="flex flex-1 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-sm text-muted-foreground hover:bg-zinc-800 hover:text-zinc-200"
      @click="deviceStore.addKnobValue"
    >
      <Plus class="mr-2" /> Add a value
    </button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import ValueCard from '@renderer/components/config/values/ValueCard.vue'
import draggable from 'vuedraggable'
import { ref } from 'vue'
import { useDeviceStore } from '@renderer/deviceStore'

const deviceStore = useDeviceStore()

defineProps({
  values: {
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
