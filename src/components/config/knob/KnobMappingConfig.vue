<template>
  <ConfigSection title="Knob Mapping" :icon-component="PlusCircle">
    <div class="px-8 my-4">
      <span class="text-sm text-muted-foreground font-mono">Control:</span>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            ref="comboboxButton"
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="my-2 w-full justify-between">
            <ScrambleText :text="value ? knobMappingOptions[value] : 'Select an action...'" />
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0" :style="{width: $refs.comboboxButton?.$el.offsetWidth}">
          <Command>
            <CommandInput class="h-9" placeholder="Search actions..." />
            <CommandEmpty>
              <ScrambleText
                scramble-on-mount
                text="No actions found." />
            </CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="(action, key) in knobMappingOptions"
                  :key="key"
                  :value="action"
                  @select="() => {
                    value = key
                    open = false
                  }">
                  {{ action }}
                  <Check
                    :class="cn('ml-auto h-4 w-4',value === key ? 'opacity-100' : 'opacity-0')" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    <WIP />
  </ConfigSection>
</template>
<script setup>
import { PlusCircle, ChevronsUpDown, Check } from 'lucide-vue-next'
import ConfigSection from '@/components/common/ConfigSection.vue'
import WIP from '@/components/WIP.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import ScrambleText from '@/components/common/ScrambleText.vue'

const knobMappingOptions = ref({
  sendKey: 'Send a Key for each Step',
  controlMidi: 'Control a MIDI Value',
  controlOsc: 'Control an OSC Value',
  controlVolume: 'Control your OS Volume',
  moveMouse: 'Move the Mouse',
  scrollMouse: 'Scroll the Mouse',
})

const comboboxButton = ref(null)

const open = ref(false)
const value = ref('')
</script>