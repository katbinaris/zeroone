<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { computed } from 'vue';
import { Replace, Type, Cable, KeyboardMusic, Squircle, Keyboard, Bolt, GaugeCircle, AudioLines, AudioWaveform, Binary, Power, Bold, Italic, Underline, FileDigit, FileX } from 'lucide-vue-next'

import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import Pop from '@/components/patterns/Pop.vue'
import QuickPreview from '@/components/patterns/QuickPreview.vue' 

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

import { ref } from 'vue'
import { reactive } from 'vue'
const state = reactive({ count: 12 });
 

 


// Import JSON make it available for all components and views

</script>

<template>
  
 
  <main>
  
  <div class="w-screen select-none ">
  <div class="flex">
  <Menubar class="w-full rounded-none bg-zinc-950">
    <MenubarMenu>
      <MenubarTrigger v-t="'navbar.device.title'"></MenubarTrigger>
      <MenubarContent>
        <!-- TODO: Switch keyboard shortcut icons based on platform -->
        <MenubarItem>
          {{$t('navbar.device.disconnect')}} <MenubarShortcut>⌘D</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>{{ $t('navbar.device.about') }}</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>{{ $t('navbar.device.preferences') }}</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>{{ $t('navbar.device.export') }}<MenubarShortcut>⌘E</MenubarShortcut></MenubarItem>
        <MenubarItem>{{ $t('navbar.device.import') }}<MenubarShortcut>⌘I</MenubarShortcut></MenubarItem>
        <MenubarSeparator />
        <MenubarItem>{{ $t('navbar.device.quit') }}<MenubarShortcut>⌘Q</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
  </div>
  <div class="flex flex-row">
  <div class="border-solid border-0 border-r w-80 flex-none bg-zinc-900 bg-opacity-30">
   <div>
    <div class="space-y-1 p-6 pb-0">
      <h2 class="text-md leading-none">
       Profiles
      </h2>
      <p class="text-xs text-muted-foreground">
        An open-source UI component library.
      </p>
    </div>
    <Separator class="my-4" />
  </div>
  <Pop/>

  </div>
  <div class="border-0 shrink-0 border-r bg-zinc-900 bg-opacity-30">
    

    <Tabs default-value="haptic-config" orientation="vertical" class="flex flex-row">

    
  <!-- Tab Col 1 -->
  <div id="tablistmid" class="flex">
    <TabsList class="flex flex-col px-0 gap-0 w-96 py-0">
    <div class="flex flex-col">
      <div class="space-y-1 p-6">
        <h1 class="leading-none text-lg">
         Quick Preview
        </h1>
        <!-- <p class="text-xs text-muted-foreground">
          Pre-rendered preview with live feedback from current position.
        </p> -->
      </div>
      <QuickPreview/>
      
    </div>
      <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><Bolt class="h-4 w-4" /></div>
    <div clas="flex-initial"><h2 class="text-sm px-2 py-4">Configuration Options</h2></div>
    
    </div>

      <TabsTrigger value="prog-config" class="text-left rounded-none border-solid border-t data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900 data-[state=active]:ring-none">
        <div class="p-4">
        <h1 class="leading-none text-lg">
         Program Settings
        </h1>
        <p class="text-xs text-muted-foreground">
          Operation mode and Profile Naming
        </p>
        
      </div>
      </TabsTrigger>

      <TabsTrigger value="haptic-config" class="text-left rounded-none border-solid border-t data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900 data-[state=active]:ring-none">
        <div class="p-4">
        <h1 class="leading-none text-lg pb-1">
         Feedback Designer
        </h1>
        <p class="text-xs text-muted-foreground">
          Feedback mode selector and parameter adjustment
        </p>
        
      </div>
      </TabsTrigger>
      <TabsTrigger value="map-config" class="text-left rounded-none border-solid border-t data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900 data-[state=active]:ring-none">
        <div class="p-4">
        <h1 class="leading-none text-lg">
         Mapping Configuration
        </h1>
        <p class="text-xs text-muted-foreground">
          Assign function to Knob and Keys
        </p>
        
      </div>
      </TabsTrigger>

      

      <TabsTrigger value="led-config" class="text-left rounded-none border-solid border-t data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900 data-[state=active]:ring-none">
        <div class="p-4">
        <h1 class="leading-none text-lg">
         Light Designer
        </h1>
        <p class="text-xs text-muted-foreground">
          Adjust behavior of LED Ring. Turn On/Off.
        </p>
        
      </div>
      </TabsTrigger>
      <TabsTrigger value="gui-config" class="text-left rounded-none border-solid border-t data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900 data-[state=active]:ring-none" disabled="true">
        <div class="p-4">
        <Badge class="font-mono h-4 mb-1 rounded-full">COMING SOON</badge>
        <h1 class="leading-none text-muted-foreground text-lg">
         GUI Designer 
        </h1>
        <p class="text-xs text-muted-foreground">
          Adjust graphic interface parameters
        </p>
        
      </div>
      </TabsTrigger>
    </TabsList>
    </div>
    <!-- End Tab Col 1 -->
    <!-- Tab Col 2 -->
    <div id="tabcontentend" class="flex border-l-1 border-solid border-l">
    <TabsContent value="haptic-config" class="mt-0">
      <div class="w-96 bg-zinc-900 bg-opacity-40">
  
      <div class="space-y-1 p-6">
        <h1 class="leading-none text-lg">
         Feedback Designer
        </h1>
        <p class="text-xs text-muted-foreground">
          Create or tune device haptic response
        </p>
        
      </div>
    
    <Separator/>
    <ScrollArea class="h-[720px]">
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><GaugeCircle class="h-4 w-4" /></div>
    <div clas="flex-initial"><h2 class="text-sm px-2 py-4">Feedback Type</h2></div>
    
    </div>
    <Separator/>
  
      <Tabs default-value="fd">
    <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
      <TabsTrigger value="fd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center ">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-fd.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Fine Detents
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="cd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-cd.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Coarse Detents
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="vr">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-vf.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Viscous Rotation
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="rt">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-rc.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Return to Center
      </span>
        </div>
      </TabsTrigger>
    </TabsList>
    
  </Tabs>

    <Separator/>
  <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono h-8 text-center">Total Positions</span>
    
      <div class="flex w-full max-w-sm items-center gap-0">
      <Button @click="state.count--" type="submit" class="rounded-none text-xl font-pixellg align-middle font-bold">
      -
    </Button>
    <Input id="positions" class="rounded-none border-none text-5xl font-pixellg focus-visible:ring-0" type="number" placeholder="10" max="65535" min="10" v-model="state.count"/>
    <Button @click="state.count++" type="submit" class="rounded-none text-xl font-pixellg font-bold">
      +
    </Button>
  </div>
      
    </div>
    <Separator/>
    
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><AudioWaveform class="h-4 w-4" /></div>
    <div class="grow">
      <h2 class="text-sm px-2 py-4">Haptic Response</h2>
    </div>
    <div class="flex-none">
      <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    
    </div>
    <Separator/>
    
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Feedback Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Bounce Back Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Output Ramp Dampening</span>
      <Slider :default-value="[4]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><AudioLines class="h-4 w-4" /></div>
    <div class="grow"><h2 class="text-sm px-2 py-4">  Auditory Response</h2></div>
    <div class="flex-none">
    <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Auditory Haptic Level</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    
    <span class="text-sm text-muted-foreground font-mono">Auditory Magnitude</span>
    <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
        <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Faint</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-2">Soft</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-7">Medium</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Hard</div>
      </div>
      
      
    </div>
    </ScrollArea>
    <Separator/>
      
    
    
    
 
  </div>
    </TabsContent>
    <TabsContent value="map-config" class="mt-0">
      <div class="w-96 bg-zinc-900 bg-opacity-40">
  
      <div class="space-y-1 p-6">
        <h1 class="leading-none text-lg">
         Mapping Configuration
        </h1>
        <p class="text-xs text-muted-foreground">
          Create or tune device haptic response
        </p>
        
      </div>
    
    <Separator/>
    <ScrollArea class="h-[720px]">
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><Keyboard class="h-4 w-4" /></div>
    <div clas="flex-initial"><h2 class="text-sm px-2 py-4">Key Mapping</h2></div>
    
    </div>
    <Separator/>
  
      <Tabs default-value="fd">
    <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
      <TabsTrigger value="fd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center ">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-key-o.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Switch A
        <Badge class="bg-orange-400 mt-2">Shift</Badge>
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="cd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-key.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Switch B
        <Badge class="bg-zinc-400 mt-2">Fn1</Badge>
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="vr">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-key-g.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Switch C
        <Badge class="bg-zinc-400 mt-2">Fn2</Badge>
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="rt">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-key-d.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Switch D
        <Badge class="bg-zinc-400 mt-2">M0</Badge>
      </span>
        </div>
      </TabsTrigger>
    </TabsList>
    
  </Tabs>

    <Separator/>
  <Command>
    
    <CommandList>
      <CommandEmpty>Key or function not found :(
          
        </CommandEmpty>
      <CommandInput placeholder="Find Key, Function or Macro..." />
      <CommandGroup heading="Common">
        <CommandItem value="backspace">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Backspace
        </CommandItem>
        <CommandItem value="delete">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Delete
        </CommandItem>
        <CommandItem value="enter">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Enter
        </CommandItem>
        <CommandItem value="end">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> End
        </CommandItem>
        <CommandItem value="arrow up">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Arrow Up
        </CommandItem>
        <CommandItem value="arrow down">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Arrow Down
        </CommandItem>
        <CommandItem value="arrow left">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Arrow Left
        </CommandItem>
        <CommandItem value="arrow right">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Arrow Right
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="MIDI Control Changes">
        <CommandItem value="cc0">
          <KeyboardMusic color="grey" class="w-4 h-4 mr-2"/> Bank Select (CC0)
        </CommandItem>
        <CommandItem value="cc2">
          <KeyboardMusic color="grey" class="w-4 h-4 mr-2"/> Modulation (CC1)
        </CommandItem>
        <CommandItem value="cc3">
          <KeyboardMusic color="grey" class="w-4 h-4 mr-2"/> Foot Controller (CC4)
        </CommandItem>
        <CommandItem value="cc4">
          <KeyboardMusic color="grey" class="w-4 h-4 mr-2"/> Portamento (CC5)
        </CommandItem>
        <CommandItem value="cc5">
          <KeyboardMusic color="grey" class="w-4 h-4 mr-2"/> Volume (CC7)
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Macros">
        <CommandItem value="Page Scroll">
          <Squircle color="grey" class="w-4 h-4 mr-2"/> Page Scroller (M0)
        </CommandItem>
      </CommandGroup>
    </CommandList>
    <CommandSeparator/>
    
  </Command>
    <Separator/>
    
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><GaugeCircle class="h-4 w-4" /></div>
    <div class="grow">
      <h2 class="text-sm px-2 py-4">Knob Mapping</h2>
    </div>
    <div class="flex-none">
      <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    
    </div>
    <Separator/>
    
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Feedback Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Bounce Back Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Output Ramp Dampening</span>
      <Slider :default-value="[4]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><AudioLines class="h-4 w-4" /></div>
    <div class="grow"><h2 class="text-sm px-2 py-4">  Auditory Response</h2></div>
    <div class="flex-none">
    <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Auditory Haptic Level</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    
    <span class="text-sm text-muted-foreground font-mono">Auditory Magnitude</span>
    <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
        <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Faint</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-2">Soft</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-7">Medium</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Hard</div>
      </div>
      
      
    </div>
    </ScrollArea>
    <Separator/>
      
    
    
    
 
  </div>
    </TabsContent>
    <TabsContent value="prog-config" class="mt-0">
      <div class="w-96 bg-zinc-900 bg-opacity-40">
  
      <div class="space-y-1 p-6">
        <h1 class="leading-none text-lg">
         Program Settings
        </h1>
        <p class="text-xs text-muted-foreground">
          Create or tune device haptic response
        </p>
        
      </div>
    
    <Separator/>
    <ScrollArea class="h-[720px]">
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><Cable class="h-4 w-4" /></div>
    <div clas="flex-initial"><h2 class="text-sm px-2 py-4">Connection Type</h2></div>
    
    </div>
    <Separator/>
  
      <Tabs default-value="fd">
    <TabsList class="grid grid-cols-2 h-auto text-muted-foreground">
      <TabsTrigger value="fd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center ">
      <div class="w-24 size-w mb-2">
      <img src="@/assets/gui-ico/ico-usb-logo.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        USB (Virtual HID)
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="cd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="w-24 size-w mb-2">
      <img src="@/assets/gui-ico/ico-midi-logo.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Standalone MIDI I/O
      </span>
        </div>
      </TabsTrigger>
    </TabsList>
    
  </Tabs>


    <Separator/>
    
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><Type class="h-4 w-4" /></div>
    <div class="grow">
      <h2 class="text-sm px-2 py-4">Profile Properties</h2>
    </div>
    
    
    </div>
    <Separator/>
    
    <div class="flex flex-col p-8 py-4">
      <span class="text-sm text-muted-foreground font-mono pb-4">Program Name</span>
      <Input type="text" placeholder="Program Name" class="text-xl border-0 text-center border-b rounded-none focus-visible:ring-0 focus-visible:border-emerald-500 font-pixelsm uppercase" defaultValue="Oscillator 1" maxlength="20"/>
      
      <Label for="text" class="text-muted-foreground text-right mt-1 text-xs">16/20</Label>
   </div>
    <Separator/>
    <div class="flex flex-col p-8 py-4">
      <span class="text-sm text-muted-foreground font-mono pb-4">Program Description</span>
      <Textarea class="text-lg px-3 bg-inherit text-center focus-visible:outline-none border-b focus-visible:border-emerald-500 resize-none font-pixelsm text-muted-foreground uppercase" placeholder="Program Description" defaultValue="Adjust Korg Oscillator Waveform " rows="2" maxlength="50"/>
      <Label for="textarea" class="text-muted-foreground text-right mt-1 text-xs">24/50</Label>
      <div class="flex items-center space-x-4 space-y-1">
    <Switch id="airplane-mode" defaultChecked="true"/>
    <Label for="airplane-mode" class="text-xs text-muted-foreground">Show Description in GUI</Label>
  </div>
      </div>
    <Separator/>
    
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><Replace class="h-4 w-4" /></div>
    <div class="grow"><h2 class="text-sm px-2 py-4">Internal Profile Toggle</h2></div>
    <div class="flex-none">
    <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>

    
    </div>
    <p class="flex flex-col p-8 py-4 text-muted-foreground text-xs">
    Hardcoded macro that allows you to quickly toggle between stored profiles , comes handy if you want to operate device in Standalone mode.
    <Separator class="mt-4"/>
    <span class="space-y-4">Operation: <Badge class="bg-orange-500">SHIFT</Badge> + <Badge class="bg-zinc-500">Fn3</Badge> + <Badge>Rotation</Badge></span>
    <Separator class="my-4"/>
    <span>Warning: Overrides software defined macro if combination is the same</span>
    </p>
    
    
    </ScrollArea>
    <Separator/>
      
    
    
    
 
  </div>
    </TabsContent>
    <TabsContent value="led-config" class="mt-0">
      <div class="w-96 bg-zinc-900 bg-opacity-40">
  
      <div class="space-y-1 p-6">
        <h1 class="leading-none text-lg">
         Light Designer
        </h1>
        <p class="text-xs text-muted-foreground">
          Create or tune device haptic response
        </p>
        
      </div>
    
    <Separator/>
    <ScrollArea class="h-[720px]">
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><GaugeCircle class="h-4 w-4" /></div>
    <div clas="flex-initial"><h2 class="text-sm px-2 py-4">Feedback Type</h2></div>
    
    </div>
    <Separator/>
  
      <Tabs default-value="fd">
    <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
      <TabsTrigger value="fd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center ">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-fd.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Fine Detents
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="cd">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-cd.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Coarse Detents
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="vr">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-vf.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Viscous Rotation
      </span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="rt">
        <div class="grid grid-flow-row auto-rows-max justify-items-center">
      <div class="size-16 mb-2">
      <img src="@/assets/gui-ico/ico-rc.svg"/>
      </div>
      <span class="text-xs leading-3 text-wrap">
        Return to Center
      </span>
        </div>
      </TabsTrigger>
    </TabsList>
    
  </Tabs>

    <Separator/>
  <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono h-8 text-center">Total Positions</span>
    
      <div class="flex w-full max-w-sm items-center gap-0">
      <Button type="submit" class="rounded-l-full text-xl font-mono align-middle font-bold">
      -
    </Button>
    <Input id="positions" class="rounded-none text-xl font-pixellg" type="number" placeholder="10" defaultValue="60" max="65535" min="10"/>
    <Button type="submit" class="rounded-r-full text-xl font-mono font-bold">
      +
    </Button>
  </div>
      
    </div>
    <Separator/>
    
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><AudioWaveform class="h-4 w-4" /></div>
    <div class="grow">
      <h2 class="text-sm px-2 py-4">Haptic Response</h2>
    </div>
    <div class="flex-none">
      <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    
    </div>
    <Separator/>
    
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Feedback Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Bounce Back Strength</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Output Ramp Dampening</span>
      <Slider :default-value="[4]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
      
    </div>
    <Separator/>
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
    
    <div class="flex-none"><AudioLines class="h-4 w-4" /></div>
    <div class="grow"><h2 class="text-sm px-2 py-4">  Auditory Response</h2></div>
    <div class="flex-none">
    <Toggle class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline" size="sm" defaultValue="true" aria-label="EnablePrimary">
        <Power class="w-4 h-4" />
      </Toggle>
    </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    <span class="text-sm text-muted-foreground font-mono">Auditory Haptic Level</span>
      <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
      <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
      </div>
    </div>
    <Separator/>
    <div class="flex flex-col p-8 pt-4">
    
    <span class="text-sm text-muted-foreground font-mono">Auditory Magnitude</span>
    <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
        <div class="flex flex-row px-1 py-1.5">
        <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Faint</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-2">Soft</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono indent-7">Medium</div>
        <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Hard</div>
      </div>
      
      
    </div>
    </ScrollArea>
    <Separator/>
      
    
    
    
 
  </div>
    </TabsContent>
    </div>
  </Tabs>
    
  </div>
  
  
</div>
</div>
   
  </main>
</template>

<script>
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
</style>
