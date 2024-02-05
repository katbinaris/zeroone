<template>
  <div>
    <div v-if="showTabs" class="p-2 border-solid border-0 border-b">
      <div class="flex bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
        <button
          v-for="(option, key) in store.currentConfigPages" :key="key"
          class="flex-1 h-12 items-center text-center px-3 font-heading transition-all"
          :class="{'text-black bg-zinc-300 hover:bg-zinc-200': key===store.currentConfigPage,
          'hover:bg-zinc-800 text-muted-foreground' : key!==store.currentConfigPage}"
          @click="store.setCurrentConfigPage(key)">
          {{ $t(option.titleKey) }}
        </button>
      </div>
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