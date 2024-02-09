<script setup>
import ProfileManager from '@/components/profile/ProfileManager.vue'
import DevicePreview from '@/components/device/DevicePreview.vue'
import ConfigPane from '@/components/config/ConfigPane.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import { useStore } from '@/store'

const { electron } = window
const store = useStore()

const menuActions = {
  connect: () => store.setConnected(!store.connected),
  orientation: () => store.cycleScreenOrientation(),
  skin: () => store.switchPreviewDeviceModel(),
}

electron.onMenu((key) => {
  console.log('menu', key)
  if (menuActions[key]) {
    menuActions[key]()
  }
})

store.fetchProfiles()

</script>
<template>
  <main class="select-none w-screen h-screen flex flex-col">
    <Navbar class="flex-none" />
    <div class="flex-1 min-h-0 flex flex-row justify-center">
      <div class="basis-1/3 min-w-60 flex-1 flex overflow-hidden">
        <Transition name="slide-left">
          <ProfileManager
            v-if="store.connected"
            class="flex-1 max-w-full flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-50" />
        </Transition>
      </div>
      <DevicePreview
        class="basis-1/3 flex-col flex" />
      <div class="basis-2/5 flex-1 flex overflow-hidden">
        <Transition name="slide-right">
          <ConfigPane
            v-if="store.connected"
            class="flex-1 max-w-full flex flex-col border-solid border-0 border-l bg-zinc-900 bg-opacity-50" />
        </Transition>
      </div>
    </div>
  </main>
</template>
<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 700ms ease;
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition-delay: 500ms;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

</style>