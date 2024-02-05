<template>
  <div>
    <TabSelect
      v-if="showTabs"
      v-model="configPage"
      :options="configPages"
      class="p-2 border solid border-b">
      <template v-for="(page, key) in configPages" #[key]>
        {{ $t(page.titleKey) }}
      </template>
    </TabSelect>
    <div class="grow overflow-y-auto">
      <component :is="store.currentConfigComponent" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store'
import TabSelect from '@/components/common/TabSelect.vue'
import { computed } from 'vue'

const store = useStore()

const configPages = computed(() => store.currentConfigPages)
const configPage = computed({
  get: () => store.currentConfigPage,
  set: (value) => store.setCurrentConfigPage(value),
})

defineProps({
  showTabs: {
    type: Boolean,
    default: true,
  },
})
</script>