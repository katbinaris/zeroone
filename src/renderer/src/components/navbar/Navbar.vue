<template>
  <div class="app-titlebar flex">
    <Menubar
      class="h-14 w-full justify-between rounded-none bg-zinc-900 px-3 font-mono text-muted-foreground"
    >
      <div v-if="isMacOS" :style="{ width: 80 / zoomFactor + 'px' }" />
      <div class="flex items-center">
        <h1
          class="app-titlebar-button min-w-32 text-nowrap text-2xl text-zinc-100"
          @click="scrambleTitle"
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
            <template v-if="deviceStore.attachedDeviceIds.length !== 1">
              Devices<span class="text-zinc-500"
                >&nbsp;({{ '' + deviceStore.attachedDeviceIds.length }})</span
              >
            </template>
            <template v-else> Device </template>
          </MenubarTrigger>
          <MenubarContent>
            <!-- TODO: Switch keyboard shortcut icons based on platform -->
            <MenubarItem @click="deviceStore.setConnected(!deviceStore.connected)">
              {{
                deviceStore.connected ? $t('navbar.device.disconnect') : $t('navbar.device.connect')
              }}
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem v-if="deviceStore.attachedDeviceIds.length > 1"
              >Next Device
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="deviceStore.cycleOrientation">
              <p>Orientation:&nbsp;</p>
              <p>{{ deviceStore.orientation }}°</p>
              <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem class="flex justify-between" @click="appStore.switchPreviewDeviceModel">
              <p>Skin:&nbsp;</p>
              <p>{{ previewDeviceNames[appStore.previewDeviceModel || 'nanoOne'] }}</p>
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
          @click="appIpc.openExternal('https://discord.gg/jgRd77YN5T')"
        >
          Community
        </MenubarButton>
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button">Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem @click="appIpc.openExternal('https://github.com/katbinaris/zeroone')"
              >Software Source</MenubarItem
            >
            <MenubarItem
              @click="appIpc.openExternal('https://github.com/katbinaris/NanoD_RatchetH1')"
              >Firmware Source</MenubarItem
            >
            <MenubarItem
              @click="appIpc.openExternal('https://github.com/katbinaris/Nano_D_PlusPlus')"
              >Hardware Source</MenubarItem
            >
            <MenubarSeparator />
            <MenubarItem
              @click="appIpc.openExternal('https://github.com/katbinaris/zeroone/issues/new')"
              >Report Software Issue</MenubarItem
            >
            <MenubarItem
              @click="
                appIpc.openExternal('https://github.com/katbinaris/NanoD_RatchetH1/issues/new')
              "
              >Report Device Issue</MenubarItem
            >
            <MenubarSeparator />
            <MenubarItem class="flex justify-between">
              <p>Software Version:&nbsp;</p>
              <p>v0.1</p>
            </MenubarItem>
            <MenubarItem @click="appIpc.openExternal('https://discord.gg/jgRd77YN5T')"
              >Contact Support</MenubarItem
            >
            <template v-if="appIpc.isDevelopment">
              <MenubarSeparator />
              <MenubarItem @click="appIpc.openDevTools">Developer Tools</MenubarItem>
              <MenubarItem @click="appIpc.reload">Reload</MenubarItem>
            </template>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <div class="grow" />
      <Transition name="fade">
        <div v-if="deviceStore.connected" class="flex items-center gap-2 px-2">
          <div v-if="numberOfChanges" class="text-sm">
            <PenLine class="inline-block h-4" />{{ numberOfChanges }} Changes
          </div>
          <MenubarButton class="app-titlebar-button border-2"> Revert </MenubarButton>
          <MenubarButton
            :class="
              numberOfChanges
                ? 'border border-zinc-100 bg-zinc-300 text-zinc-950 hover:bg-zinc-200 hover:text-zinc-950'
                : 'border-2'
            "
            class="app-titlebar-button"
            @click="deviceStore.saveChangesOnDevice"
          >
            Save
          </MenubarButton>
        </div>
      </Transition>
      <MenubarButton
        v-if="showDisconnectButton"
        class="app-titlebar-button border-2"
        @click="deviceStore.setConnected(!deviceStore.connected)"
      >
        {{ deviceStore.connected ? 'Disconnect' : 'Connect' }}
      </MenubarButton>
      <div v-if="!isMacOS" class="flex h-full">
        <button
          v-if="minimizable"
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="appIpc.minimizeWindow"
        >
          <Minus class="size-5" />
        </button>
        <button
          v-if="maximizable"
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="appIpc.toggleMaximizeWindow"
        >
          <Copy v-if="isMaximized" class="size-4" />
          <Square v-else class="mr-0.5 size-3.5" />
        </button>
        <button
          class="app-titlebar-button flex grow items-center justify-center px-2 hover:text-white"
          @click="appIpc.closeWindow"
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
import { Minus, Square, Copy, X, PenLine } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { Separator } from '@renderer/components/ui/separator'
import MenubarButton from '@renderer/components/navbar/MenubarButton.vue'
import { useAppStore } from '@renderer/appStore'
import { useDeviceStore } from '@renderer/deviceStore'

const appStore = useAppStore()
const deviceStore = useDeviceStore()

const minimizable = ref(true)
const maximizable = ref(true)
const showDisconnectButton = ref(false)

const isMaximized = ref(false)

const { appIpc } = window

const isMacOS = appIpc.platform === 'darwin'
const zoomFactor = ref(1)

const numberOfChanges = ref(27)

const previewDeviceNames = ref({
  nanoOne: 'One',
  nanoZero: 'Zero'
})

const zerooneTitle = ref(null)
const zerooneSubtitle = ref(null)

const scrambleTitle = () => {
  zerooneTitle.value.scramble(1, 100, 0)
  zerooneSubtitle.value.scramble(1, 75, 30)
}

window.addEventListener('resize', () => {
  zoomFactor.value = window.outerWidth / window.innerWidth
})
appIpc.onMaximized((maximized) => {
  console.log(maximized)
  isMaximized.value = true
})

appIpc.onUnmaximized(() => {
  isMaximized.value = false
})

watch(() => deviceStore.connected, scrambleTitle)
</script>
<style scoped>
.app-titlebar {
  -webkit-app-region: drag;
}

.app-titlebar-button {
  -webkit-app-region: no-drag;
}
.fade-enter-active {
  transition: transform 500ms ease;
  transition-delay: 1000ms;
}
.fade-leave-active {
  transition: transform 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-3.5rem);
}
</style>
