<script setup lang="ts">
import ProfileManager from '@renderer/components/profile/ProfileManager.vue'
import DevicePreview from '@renderer/components/device/DevicePreview.vue'
import ConfigPane from '@renderer/components/config/ConfigPane.vue'
import Navbar from '@renderer/components/navbar/Navbar.vue'
import { useStore } from '@renderer/store'
import { useMessageHandlers } from '@renderer/device'

const { electron } = window
const store = useStore()

const menuActions = {
  connect: () => store.setConnected(!store.connected),
  orientation: () => store.cycleScreenOrientation(),
  skin: () => store.switchPreviewDeviceModel()
}

electron?.onMenu((key) => {
  console.log('menu', key)
  if (menuActions[key]) {
    menuActions[key]()
  }
})

store.fetchProfiles() // TODO remove me!

// handle device events
const handlers = useMessageHandlers(store)
window.nanodevices.on_event('device-attached', (evt, deviceid, data) =>
  store.device_attached(deviceid)
)
window.nanodevices.on_event('device-detached', (evt, deviceid, data) =>
  store.device_detached(deviceid)
)
window.nanodevices.on_event('device-error', (evt, deviceid, data) => {
  /* TODO handle connection errors */
})
window.nanodevices.on_event('connected', (evt, deviceid, data) => store.device_connected(deviceid))
window.nanodevices.on_event('disconnected', (evt, deviceid, data) =>
  store.device_disconnected(deviceid)
)
window.nanodevices.on_event('update', (evt, deviceid, data) => {
  handlers.handle_message(data)
})
// get list of the currently attached devices
window.nanodevices.list_devices().then((devs) => store.init_devices(devs))
</script>
<template>
  <main class="select-none w-screen h-screen flex flex-col">
    <Navbar class="flex-none" />
    <div class="flex-1 min-h-0 flex flex-row justify-center">
      <div class="basis-1/3 min-w-60 flex-1 flex overflow-hidden">
        <Transition name="slide-left">
          <ProfileManager
            v-if="store.connected"
            class="flex-1 max-w-full flex flex-col border-solid border-0 border-r bg-zinc-900 bg-opacity-50"
          />
        </Transition>
      </div>
      <DevicePreview class="basis-1/3 flex-col flex" />
      <div class="basis-2/5 flex-1 flex overflow-hidden">
        <Transition name="slide-right">
          <ConfigPane
            v-if="store.connected"
            class="flex-1 max-w-full flex flex-col border-solid border-0 border-l bg-zinc-900 bg-opacity-50"
          />
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
