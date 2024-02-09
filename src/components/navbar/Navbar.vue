<template>
  <div class="flex app-titlebar">
    <Menubar class="w-full h-14 rounded-none bg-zinc-900 justify-between text-muted-foreground font-mono px-3">
      <div v-if="isMacOS" :style="{width: 80 / zoomFactor + 'px'}" />
      <div class="flex items-center">
        <h1
          class="text-2xl min-w-32   app-titlebar-button text-zinc-100 text-nowrap"
          @click="$refs.zerooneTitle.scramble(1,100,0); $refs.zerooneSubtitle.scramble(1,75,30)">
          <ScrambleText
            ref="zerooneTitle"
            text=" ZERO/ONE" scramble-on-mount :scramble-amount="1" :fill-interval="100"
            :replace-interval="100"
          />
        </h1>
        <h2 class="text-sm min-w-[188px] text-muted-foreground font-mono text-nowrap">
          ::
          <ScrambleText
            ref="zerooneSubtitle"
            text="Configuration Suite" scramble-on-mount :scramble-amount="1" :fill-interval="35"
            :replace-interval="40" />
        </h2>
      </div>
      <div class="h-8 px-2">
        <Separator orientation="vertical" />
      </div>
      <div class="flex gap-2">
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button">
            <template v-if="store.multipleDevicesConnected">
              Devices<span class="text-zinc-600">&nbsp;(2)</span>
            </template>
            <template v-else>
              Device
            </template>
          </MenubarTrigger>
          <MenubarContent>
            <!-- TODO: Switch keyboard shortcut icons based on platform -->
            <MenubarItem @click="store.setConnected(!store.connected)">
              {{ store.connected ? $t('navbar.device.disconnect') : $t('navbar.device.connect') }}
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem v-if="store.multipleDevicesConnected">Next Device
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="store.cycleScreenOrientation">
              <p>Orientation: </p>
              <p>{{ store.screenOrientation }}°</p>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="store.switchPreviewDeviceModel">
              <p>Skin: </p>
              <p>{{ previewDeviceNames[store.previewDeviceModel || 'nanoOne'] }}</p>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>{{ $t('navbar.device.export') }}
              <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>{{ $t('navbar.device.import') }}
              <MenubarShortcut>⌘I</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>{{ $t('navbar.device.quit') }}
              <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarButton class="app-titlebar-button" @click="electron?.openExternal('https://discord.gg/jgRd77YN5T')">
          Community
        </MenubarButton>
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button">Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Report Software Issue</MenubarItem>
            <MenubarItem>Report Hardware Issue</MenubarItem>
            <MenubarItem>Contact Support</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <div class="grow" />
      <MenubarButton
        v-if="showDisconnectButton"
        class="app-titlebar-button border-2"
        @click="store.setConnected(!store.connected)">
        {{ store.connected ? 'Disconnect' : 'Connect' }}
      </MenubarButton>
      <div v-if="!isMacOS" class="flex h-full">
        <button
          v-if="minimizable"
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2"
          @click="electron?.minimizeWindow">
          <Minus class="h-5 w-5" />
        </button>
        <button
          v-if="maximizable"
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2"
          @click="electron?.toggleMaximizeWindow">
          <Copy v-if="isMaximized" class="h-4 w-4" />
          <Square v-else class="h-3.5 w-3.5 mr-0.5" />
        </button>
        <button
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2"
          @click="electron?.closeWindow">
          <X class="h-5 w-5 mr-0.5" />
        </button>
      </div>
    </Menubar>
  </div>
</template>
<script setup>
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { Minus, Square, Copy, X } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import MenubarButton from '@/components/navbar/MenubarButton.vue'

const store = useStore()

const minimizable = ref(true)
const maximizable = ref(true)
const showDisconnectButton = ref(false)

const isMaximized = ref(false)

const { electron } = window

const isMacOS = electron?.platform === 'darwin'
const zoomFactor = ref(1)

const previewDeviceNames = ref({
  nanoOne: 'One',
  nanoZero: 'Zero',
})

onMounted(() => {
  window.addEventListener('resize', () => {
    zoomFactor.value = window.outerWidth / window.innerWidth
  })
  electron.onMaximized((maximized) => {
    console.log(maximized)
    isMaximized.value = true
  })

  electron.onUnmaximized(() => {
    isMaximized.value = false
  })
})

</script>
<style scoped>
.app-titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.app-titlebar-button {
  -webkit-app-region: no-drag;
}
</style>