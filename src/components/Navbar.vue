<template>
  <div class="flex">
    <Menubar class="w-full h-20 rounded-none bg-zinc-950 border-l-0">
      <div class="p-8">
        <h1 class="text-3xl">ZERO/ONE</h1>
        <p class="text-xs text-muted-foreground">Haptic Configuration Tool</p>
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
</script>