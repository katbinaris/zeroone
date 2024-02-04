<script setup>
import ProfileManager from '@/components/profile/ProfileManager.vue'
import DevicePreview from '@/components/device/DevicePreview.vue'
import ConfigPane from '@/components/config/ConfigPane.vue'
import Navbar from '@/components/Navbar.vue'
import { useStore } from '@/store'
import { ref } from 'vue'

const store = useStore()

const currentConfigPage = ref(0)

store.fetchProfiles()

</script>
<template>
  <main class="select-none w-screen h-screen flex flex-col">
    <Navbar class="flex-none" />
    <div class="flex-1 min-h-0 flex flex-row">
      <ProfileManager
        class="basis-1/3 min-w-60 flex-1 flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-50" />
      <DevicePreview
        class="basis-1/3 flex-col flex-1 flex border-solid border-0 border-r"
        @select="currentConfigPage = Math.floor(Math.random() * 4)" />
      <ConfigPane
        v-model="currentConfigPage"
        class="flex-1 basis-2/5 flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-50" />
    </div>
  </main>
</template>