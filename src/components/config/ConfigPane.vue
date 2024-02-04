<template>
  <div>
    <div v-if="showTabs" class="flex">
      <!-- TODO: Remove later if not needed -->
      <button
        v-for="(option, key) in store.currentConfigPages" :key="key"
        class="flex-1 h-12 items-center text-center group px-3 font-heading"
        :class="key===store.currentConfigPage ? 'bg-zinc-900': 'hover:bg-zinc-800 text-zinc-200'"
        @click="store.setCurrentConfigPage(key)">
        {{ $t(option.titleKey) }}
      </button>
    </div>
    <div class="grow overflow-y-auto">
      <component :is="store.currentConfigComponent" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store'

const store = useStore()

defineProps({
  showTabs: {
    type: Boolean,
    default: true,
  },
})
</script>