<template>
  <div class="flex">
    <Menubar class="w-full h-20 rounded-none bg-zinc-950 border-l-0">
      <div class="p-2 min-w-48">
        <h1 class="text-3xl">
          <ScrambleText
            text="ZERO/ONE" scramble-on-mount :scramble-amount="1" :fill-interval="100"
            :replace-interval="100" />
        </h1>
        <p class="text-xs text-muted-foreground">
          <ScrambleText  text="Haptic Configuration Tool" scramble-on-mount scramble-amount="1" fill-interval="35" replace-interval="40" />
        </p>
      </div>
      <MenubarMenu>
        <MenubarTrigger v-t="'navbar.device.title'" />
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
</script>