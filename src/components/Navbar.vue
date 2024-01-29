<template>
  <div class="flex app-titlebar">
    <Menubar class="w-full h-20 rounded-none bg-zinc-950 border-l-0">
      <div
        class="p-2 min-w-48 app-titlebar-button"
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
            text="Haptic Configuration Tool" scramble-on-mount :scramble-amount="1" :fill-interval="35"
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
      <button
        class="absolute top-0 right-0 py-2 px-3 app-titlebar-button  text-muted-foreground hover:bg-orange-600 hover:text-black"
        @click="oi('Not implemented ¯\\_(ツ)_/¯')">
        <X class="h-5 w-5 mr-0.5" />
      </button>
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
import { X } from 'lucide-vue-next'

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