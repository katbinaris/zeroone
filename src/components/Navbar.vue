<template>
  <div class="flex app-titlebar">
    <Menubar class="w-full h-20 rounded-none bg-zinc-950">
      <div
        class="p-3 min-w-48 app-titlebar-button"
        @click="$refs.zerooneSubtitle.scramble(1,100,0); $refs.zerooneTitle.scramble(1,100,0)">
        <h1 class="text-3xl">
          <ScrambleText
            ref="zerooneTitle"
            text=" ZERO/ONE" scramble-on-mount :scramble-amount="1" :fill-interval="100"
            :replace-interval="100"
          />
        </h1>
        <p class="text-xs text-muted-foreground">
          <ScrambleText
            ref="zerooneSubtitle"
            text="Haptics Configurator" scramble-on-mount :scramble-amount="1" :fill-interval="35"
            :replace-interval="40" />
        </p>
      </div>
      <MenubarMenu>
        <MenubarTrigger v-t="'navbar.device.title'" class="app-titlebar-button" />
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
      <span class="pl-14 inline-block">STATUS: <b class="font-heading text-lg">CONNECTED</b></span>
      <span class="text-muted-foreground px-5 inline-block">///</span>
      <p>SYNCING...</p>
      <div class="absolute top-0 right-0 flex h-9 w-32">
        <button
          class="grow flex justify-center items-center app-titlebar-button hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50"
          @click="oi('Not implemented ¯\\_(ツ)_/¯')">
          <Minus class="h-5 w-5 mr-0.5" />
        </button>
        <button
          class="grow flex justify-center items-center app-titlebar-button hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50"
          @click="oi('Not implemented ¯\\_(ツ)_/¯')">
          <Square class="h-4 w-4 mr-0.5" />
        </button>
        <button
          class="grow flex justify-center items-center app-titlebar-button bg-orange-950 hover:bg-orange-900"
          @click="oi('Not implemented ¯\\_(ツ)_/¯')">
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
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { X, Square, Minus } from 'lucide-vue-next'

const oi = (msg) => alert(msg)

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