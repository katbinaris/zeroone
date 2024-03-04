<template>
  <div class="app-titlebar flex">
    <Menubar
      class="h-14 w-full justify-between rounded-none bg-zinc-900 px-3 font-mono text-muted-foreground"
    >
      <div v-if="isMacOS" :style="{ width: 80 / zoomFactor + 'px' }" />
      <div class="flex items-center">
        <h1
          class="app-titlebar-button min-w-32 text-nowrap text-2xl text-zinc-100"
          @click="
            () => {
              $refs.zerooneTitle.scramble(1, 100, 0)
              $refs.zerooneSubtitle.scramble(1, 75, 30)
            }
          "
        >
          <ScrambleText
            ref="zerooneTitle"
            text=" ZERO/ONE"
            scramble-on-mount
            :scramble-amount="1"
            :fill-interval="100"
            :replace-interval="100"
          />
        </h1>
        <h2 class="min-w-[188px] text-nowrap font-mono text-sm text-muted-foreground">
          ::
          <ScrambleText
            ref="zerooneSubtitle"
            text="Configuration Suite"
            scramble-on-mount
            :scramble-amount="1"
            :fill-interval="35"
            :replace-interval="40"
          />
        </h2>
      </div>
      <div class="h-8 px-2">
        <Separator orientation="vertical" />
      </div>
      <div class="flex gap-2">
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button">
            <template v-if="store.numAttachedDevices !== 1">
              Devices<span class="text-zinc-500">&nbsp;({{ '' + store.numAttachedDevices }})</span>
            </template>
            <template v-else> Device </template>
          </MenubarTrigger>
          <MenubarContent>
            <!-- TODO: Switch keyboard shortcut icons based on platform -->
            <MenubarItem @click="store.setConnected(!store.connected)">
              {{ store.connected ? $t('navbar.device.disconnect') : $t('navbar.device.connect') }}
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem v-if="store.multipleDevicesConnected"
              >Next Device
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="store.cycleScreenOrientation">
              <p>Orientation:&nbsp;</p>
              <p>{{ store.screenOrientation }}°</p>
              <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="store.switchPreviewDeviceModel">
              <p>Skin:&nbsp;</p>
              <p>{{ previewDeviceNames[store.previewDeviceModel || 'nanoOne'] }}</p>
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              >{{ $t('navbar.device.export') }}
              <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              >{{ $t('navbar.device.import') }}
              <MenubarShortcut>⌘I</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              >{{ $t('navbar.device.quit') }}
              <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarButton
          class="app-titlebar-button"
          @click="electronAPI.openExternal('https://discord.gg/jgRd77YN5T')"
        >
          Community
        </MenubarButton>
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button">Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem @click="electronAPI.openExternal('https://github.com/katbinaris/zeroone')"
              >Software Source</MenubarItem
            >
            <MenubarItem
              @click="electronAPI.openExternal('https://github.com/katbinaris/NanoD_RatchetH1')"
              >Firmware Source</MenubarItem
            >
            <MenubarItem
              @click="electronAPI.openExternal('https://github.com/katbinaris/Nano_D_PlusPlus')"
              >Hardware Source</MenubarItem
            >
            <MenubarSeparator />
            <MenubarItem
              @click="electronAPI.openExternal('https://github.com/katbinaris/zeroone/issues/new')"
              >Report Software Issue</MenubarItem
            >
            <MenubarItem
              @click="
                electronAPI.openExternal('https://github.com/katbinaris/NanoD_RatchetH1/issues/new')
              "
              >Report Device Issue</MenubarItem
            >
            <MenubarSeparator />
            <MenubarItem class="flex justify-between">
              <p>Software Version:&nbsp;</p>
              <p>v0.1</p>
            </MenubarItem>
            <MenubarItem @click="electronAPI.openExternal('https://discord.gg/jgRd77YN5T')"
              >Contact Support</MenubarItem
            >
            <template v-if="electronAPI.isDevelopment">
              <MenubarSeparator />
              <MenubarItem @click="electronAPI.openDevTools">Developer Tools</MenubarItem>
              <MenubarItem @click="electronAPI.reload">Reload</MenubarItem>
            </template>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <div class="grow" />
      <MenubarButton
        v-if="showDisconnectButton"
        class="app-titlebar-button border-2"
        @click="store.setConnected(!store.connected)"
      >
        {{ store.connected ? 'Disconnect' : 'Connect' }}
      </MenubarButton>
      <div v-if="!isMacOS" class="flex h-full">
        <button
          v-if="minimizable"
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="electronAPI.minimizeWindow"
        >
          <Minus class="size-5" />
        </button>
        <button
          v-if="maximizable"
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="electronAPI.toggleMaximizeWindow"
        >
          <Copy v-if="isMaximized" class="size-4" />
          <Square v-else class="mr-0.5 size-3.5" />
        </button>
        <button
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="electronAPI.closeWindow"
        >
          <X class="mr-0.5 size-5" />
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
  MenubarTrigger
} from '@renderer/components/ui/menubar'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { Minus, Square, Copy, X } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Separator } from '@renderer/components/ui/separator'
import { useStore } from '@renderer/store'
import MenubarButton from '@renderer/components/navbar/MenubarButton.vue'

const store = useStore()

const minimizable = ref(true)
const maximizable = ref(true)
const showDisconnectButton = ref(false)

const isMaximized = ref(false)

const { electronAPI } = window

const isMacOS = electronAPI.platform === 'darwin'
const zoomFactor = ref(1)

const previewDeviceNames = ref({
  nanoOne: 'One',
  nanoZero: 'Zero'
})

onMounted(() => {
  window.addEventListener('resize', () => {
    zoomFactor.value = window.outerWidth / window.innerWidth
  })
  electronAPI.onMaximized((maximized) => {
    console.log(maximized)
    isMaximized.value = true
  })

  electronAPI.onUnmaximized(() => {
    isMaximized.value = false
  })
})
</script>
<style scoped>
.app-titlebar {
  -webkit-app-region: drag;
}

.app-titlebar-button {
  -webkit-app-region: no-drag;
}
</style>
