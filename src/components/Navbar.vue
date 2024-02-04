<template>
  <div class="flex app-titlebar">
    <Menubar class="w-full h-14 rounded-none bg-zinc-900 justify-between text-muted-foreground font-mono">
      <div class="flex items-center">
        <h1
          class="text-2xl min-w-32 app-titlebar-button ml-3 text-zinc-100"
          @click="$refs.zerooneTitle.scramble(1,100,0); $refs.zerooneSubtitle.scramble(1,75,30)">
          <ScrambleText
            ref="zerooneTitle"
            text=" ZERO/ONE" scramble-on-mount :scramble-amount="1" :fill-interval="100"
            :replace-interval="100"
          />
        </h1>
        <h2 class="text-sm min-w-[188px] text-muted-foreground font-mono">
          ::
          <ScrambleText
            ref="zerooneSubtitle"
            text="Haptics Configurator" scramble-on-mount :scramble-amount="1" :fill-interval="35"
            :replace-interval="40" />
        </h2>
      </div>
      <div class="h-8 px-2">
        <Separator orientation="vertical" />
      </div>
      <div class="flex gap-2">
        <MenubarMenu>
          <MenubarTrigger v-t="'navbar.device.title'" class="app-titlebar-button text-muted-foreground" />
          <MenubarContent>
            <!-- TODO: Switch keyboard shortcut icons based on platform -->
            <MenubarItem>
              {{ $t('navbar.device.disconnect') }}
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>{{ $t('navbar.device.about') }}</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>{{ $t('navbar.device.preferences') }}</MenubarItem>
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
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button text-muted-foreground">About</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger class="app-titlebar-button text-muted-foreground">Help</MenubarTrigger>
        </MenubarMenu>
      </div>
      <div class="grow" />
      <MenubarMenu>
        <MenubarTrigger
          class="app-titlebar-button text-muted-foreground border-2"
          @click="store.setConnected(!store.connected)">
          {{ store.connected ? 'Disconnect' : 'Connect' }}
        </MenubarTrigger>
      </MenubarMenu>
      <div class="flex h-full">
        <button
          v-if="resizeable"
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2">
          <Minus class="h-5 w-5" />
        </button>
        <button
          v-if="resizeable"
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2">
          <Square class="h-3.5 w-3.5 mr-0.5" />
        </button>
        <button
          class="grow flex justify-center items-center app-titlebar-button hover:text-white px-2"
          @click="window.close">
          <X class="h-5 w-5 mr-0.5" />
        </button>
      </div>
    </Menubar>
  </div>
</template>
<script setup>
import {
  Menubar,
  MenubarMenu,
  MenubarShortcut,
  MenubarSeparator,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
} from '@/components/ui/menubar/index.js'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { X, Square, Minus } from 'lucide-vue-next'
import { ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'

const store = useStore()

const resizeable = ref(false)

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