<script setup>
import ProfileManager from '@/components/profile/ProfileManager.vue'
import DevicePreview from '@/components/device/DevicePreview.vue'
import ConfigPane from '@/components/config/ConfigPane.vue'
import Navbar from '@/components/Navbar.vue'
import ConfigSelect from '@/components/config/ConfigSelect.vue'
import { onMounted, ref } from 'vue'
import ConfigSection from '@/components/config/ConfigSection.vue'
import { Bolt } from 'lucide-vue-next'
import { useStore } from '@/store'

const currentConfigPage = ref(0)

const store = useStore()

store.fetchProfiles()

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

onMounted(() => {
  window.addEventListener('resize', e => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
})


</script>
<template>
  <main class="select-none w-screen h-screen flex flex-col">
    <Navbar class="flex-none" />
    <div class="flex-1 min-h-0 flex flex-row">
      <ProfileManager
        class="basis-1/3 min-w-80 flex-1 flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-30" />
      <DevicePreview class="basis-1/3 flex-col flex border-solid border-0 border-r" />
      <ConfigPane
        class="flex-1 basis-2/5 flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-30"
        :page="currentConfigPage" />
    </div>
  </main>
  <p
    class="absolute bottom-2 left-0 right-0 text-center font-heading text-white opacity-15">
    {{ windowWidth }} x {{ windowHeight }}</p>
</template>