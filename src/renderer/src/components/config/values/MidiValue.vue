<template>
  <div>midi value settings</div>
</template>
<script setup lang="ts">
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import ActionGroup from '@renderer/components/config/actions/ActionGroup.vue'
import { RotateCw, RotateCcw, CircleDashed } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({
  value: {
    type: Object,
    required: true
  }
})
</script>
