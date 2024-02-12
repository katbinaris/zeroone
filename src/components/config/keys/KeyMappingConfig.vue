<template>
  <ConfigSection title="Key Mapping" :icon-component="PlusSquare">
    <template #title><span class="text-zinc-500"> ({{ store.selectedKey}})</span></template>
    <div class="px-8 my-4">
      <span class="text-sm text-muted-foreground font-mono">Action:</span>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            ref="comboboxButton"
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="my-2 w-full justify-between">
            <ScrambleText :text="value ? actionOptions[value] : 'Select an action...'" />
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
                  v-for="(action, key) in actionOptions"
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
import { PlusSquare, ChevronsUpDown, Check } from 'lucide-vue-next'
import ConfigSection from '@/components/common/ConfigSection.vue'
import WIP from '@/components/WIP.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { useStore } from '@/store'

const store = useStore()

const actionOptions = ref({
  sendKey: 'Press Key or Combination',
  sendString: 'Type a String',
  sendMouse: 'Move, Scroll or Click',
  sendGamepad: 'Send a Gamepad Input',
  sendMidi: 'Send a MIDI Message',
  sendOsc: 'Send an OSC Message',
  sendSerial: 'Send a Serial Message',
  controlMedia: 'Control Media Playback',
  controlSystem: 'Control your OS',
  runProgram: 'Start a Program',
})

const comboboxButton = ref(null)

const open = ref(false)
const value = ref('')

</script>