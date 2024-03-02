<script setup lang="ts">
import ProfileManager from '@renderer/components/profile/ProfileManager.vue'
import DevicePreview from '@renderer/components/device/DevicePreview.vue'
import ConfigPane from '@renderer/components/config/ConfigPane.vue'
import Navbar from '@renderer/components/navbar/Navbar.vue'
import { useStore } from '@renderer/store'
import { useMessageHandlers } from '@renderer/device'

const { electronAPI, nanoDevicesAPI } = window
const store = useStore()

const menuActions = {
  connect: () => store.setConnected(!store.connected),
  orientation: () => store.cycleScreenOrientation(),
  skin: () => store.switchPreviewDeviceModel()
}

electronAPI.onMenu((key) => {
  console.log('menu', key)
  if (menuActions[key]) {
    menuActions[key]()
  }
})

store.fetchProfiles() // TODO remove me!

// handle device events
const handlers = useMessageHandlers(store)
nanoDevicesAPI.on_event('device-attached', (evt, deviceid, data) => store.device_attached(deviceid))
nanoDevicesAPI.on_event('device-detached', (evt, deviceid, data) => store.device_detached(deviceid))
nanoDevicesAPI.on_event('device-error', (evt, deviceid, data) => {
  /* TODO handle connection errors */
})
nanoDevicesAPI.on_event('connected', (evt, deviceid, data) => store.device_connected(deviceid))
nanoDevicesAPI.on_event('disconnected', (evt, deviceid, data) =>
  store.device_disconnected(deviceid)
)
nanoDevicesAPI.on_event('update', (evt, deviceid, data) => {
  handlers.handle_message(data)
})
// get list of the currently attached devices
nanoDevicesAPI.list_devices().then((devs) => store.init_devices(devs))
</script>
<template>
  <main class="flex h-screen w-screen select-none flex-col">
    <Navbar class="flex-none" />
    <div class="flex min-h-0 flex-1 flex-row justify-center">
      <div class="flex min-w-60 flex-1 basis-1/3 overflow-hidden">
        <Transition name="slide-left">
          <ProfileManager
            v-if="store.connected"
            class="flex max-w-full flex-1 flex-col border-0 border-r border-solid bg-zinc-900/50"
          />
        </Transition>
      </div>
      <DevicePreview class="flex basis-1/3 flex-col" />
      <div class="flex flex-1 basis-2/5 overflow-hidden">
        <Transition name="slide-right">
          <ConfigPane
            v-if="store.connected"
            class="flex max-w-full flex-1 flex-col border-0 border-l border-solid bg-zinc-900/50"
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
