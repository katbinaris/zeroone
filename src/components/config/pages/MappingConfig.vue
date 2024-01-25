<template>
  <TabsContent value="map-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection :title="$t('config_options.mapping_configuration.key_mapping.title')" :icon-component="Keyboard">
          <Tabs default-value="fd">
            <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
              <TabsTrigger value="fd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center ">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-key-o.svg">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.mapping_configuration.key_mapping.switch.a') }}
                              <Badge class="bg-orange-400 mt-2">Shift</Badge>
                            </span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="cd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-key.svg">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.mapping_configuration.key_mapping.switch.b') }}
                              <Badge class="bg-zinc-400 mt-2">Fn1</Badge>
                            </span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="vr">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-key-g.svg">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.mapping_configuration.key_mapping.switch.c') }}
                              <Badge class="bg-zinc-400 mt-2">Fn2</Badge>
                            </span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="rt">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-key-d.svg">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.mapping_configuration.key_mapping.switch.d') }}
                              <Badge class="bg-zinc-400 mt-2">M0</Badge>
                            </span>
                </div>
              </TabsTrigger>
            </TabsList>

          </Tabs>

          <Separator />
          <Command>

            <CommandList>
              <CommandEmpty>{{ $t('config_options.mapping_configuration.key_mapping.not_found') }}

              </CommandEmpty>
              <CommandInput
                :placeholder="$t('config_options.mapping_configuration.key_mapping.search_placeholder')" />
              <CommandGroup heading="Common">
                <CommandItem value="backspace">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Backspace
                </CommandItem>
                <CommandItem value="delete">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Delete
                </CommandItem>
                <CommandItem value="enter">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Enter
                </CommandItem>
                <CommandItem value="end">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  End
                </CommandItem>
                <CommandItem value="arrow up">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Arrow Up
                </CommandItem>
                <CommandItem value="arrow down">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Arrow Down
                </CommandItem>
                <CommandItem value="arrow left">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Arrow Left
                </CommandItem>
                <CommandItem value="arrow right">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Arrow Right
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="MIDI Control Changes">
                <CommandItem value="cc0">
                  <KeyboardMusic color="grey" class="w-4 h-4 mr-2" />
                  Bank Select (CC0)
                </CommandItem>
                <CommandItem value="cc2">
                  <KeyboardMusic color="grey" class="w-4 h-4 mr-2" />
                  Modulation (CC1)
                </CommandItem>
                <CommandItem value="cc3">
                  <KeyboardMusic color="grey" class="w-4 h-4 mr-2" />
                  Foot Controller (CC4)
                </CommandItem>
                <CommandItem value="cc4">
                  <KeyboardMusic color="grey" class="w-4 h-4 mr-2" />
                  Portamento (CC5)
                </CommandItem>
                <CommandItem value="cc5">
                  <KeyboardMusic color="grey" class="w-4 h-4 mr-2" />
                  Volume (CC7)
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Macros">
                <CommandItem value="Page Scroll">
                  <Squircle color="grey" class="w-4 h-4 mr-2" />
                  Page Scroller (M0)
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandSeparator />

          </Command>
          <Separator />
        </ConfigSection>

        <ConfigSection
:title="$t('config_options.mapping_configuration.knob_mapping.title')"
                       :icon-component="GaugeCircle">
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
          <Separator />
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
          <Separator />
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
        </ConfigSection>
      </ScrollArea>
      <Separator />


    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Badge } from '@/components/ui/badge/index.js'
import { Tabs } from '@/components/ui/tabs/index.js'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator,
} from '@/components/ui/command/index.js'
import { Slider } from '@/components/ui/slider/index.js'
import { KeyboardMusic, Squircle, Keyboard, GaugeCircle, AudioLines, Power } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
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