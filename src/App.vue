<script setup>
import ProfileManager from '@/components/profile/ProfileManager.vue'
import DevicePreview from '@/components/device/DevicePreview.vue'
import ConfigPane from '@/components/config/ConfigPane.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import { useStore } from '@/store'

const store = useStore()

store.fetchProfiles()

</script>
<template>
  <main class="select-none w-screen h-screen flex flex-col">
    <Navbar class="flex-none" />
    <div class="flex-1 min-h-0 flex flex-row justify-center">
      <div class="basis-1/3 min-w-60 flex-1 flex">
        <ProfileManager
          v-if="store.connected"
          class="flex-1 flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-50" />
      </div>
      <DevicePreview
        class="basis-1/3 flex-col flex" />
      <div class="basis-2/5 flex-1 flex">
        <ConfigPane
          v-if="store.connected"
          class="flex-1 flex flex-col border-solid border-0 border-l bg-zinc-900 bg-opacity-50" />
      </div>
    </div>
  </main>
</template>