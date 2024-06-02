<template>
  <div>
    <template v-if="deviceStore.currentProfile">
      <TabSelect
        v-if="showTabs"
        v-model="configPage"
        :options="configPages"
        class="solid border bg-zinc-900 p-2"
      >
        <template v-for="(page, key) in configPages" #[key] :key="key">
          <ScrambleText ref="title" :text="$t(page.titleKey)" />
        </template>
      </TabSelect>
      <div :key="deviceStore.currentProfileName" class="grow overflow-y-auto">
        <component :is="appStore.currentConfigComponent" />
      </div>
    </template>
    <template v-else>
      <div class="flex grow items-center justify-center pb-16 text-muted-foreground">
        <ChevronLeft class="mb-0.5 inline-block h-5" />
        <ScrambleText
          scramble-on-mount
          :fill-interval="5"
          :replace-interval="5"
          text="Select a profile first"
        />
      </div>
    </template>
  </div>
</template>
<script setup>
import { useAppStore } from '@renderer/appStore'
import { useDeviceStore } from '@renderer/deviceStore'
import TabSelect from '@renderer/components/common/TabSelect.vue'
import { computed } from 'vue'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { ChevronLeft } from 'lucide-vue-next'

const appStore = useAppStore()
const deviceStore = useDeviceStore()

const configPages = computed(() => appStore.currentConfigPages)
const configPage = computed({
  get: () => appStore.currentConfigPage,
  set: (value) => appStore.setCurrentConfigPage(value)
})

defineProps({
  showTabs: {
    type: Boolean,
    default: true
  }
})
</script>
