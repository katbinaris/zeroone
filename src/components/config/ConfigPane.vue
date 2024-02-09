<template>
  <div>
    <template v-if="store.selectedProfile">
      <TabSelect
        v-if="showTabs"
        v-model="configPage"
        :options="configPages"
        class="p-2 border solid border-b bg-zinc-900">
        <template v-for="(page, key) in configPages" #[key] :key="key">
          <ScrambleText ref="title" :text="$t(page.titleKey)" />
        </template>
      </TabSelect>
      <div class="grow overflow-y-auto">
        <component :is="store.currentConfigComponent" />
      </div>
    </template>
    <template v-else>
      <div class="flex grow justify-center items-center text-muted-foreground pb-16">
        <ChevronLeft class="h-5 mb-0.5 inline-block" />
        <ScrambleText
          scramble-on-mount
          :fill-interval="5"
          :replace-interval="5"
          text="Select a profile first" />
      </div>
    </template>
  </div>
</template>
<script setup>
import { useStore } from '@/store'
import TabSelect from '@/components/common/TabSelect.vue'
import { computed } from 'vue'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { ChevronLeft } from 'lucide-vue-next'

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