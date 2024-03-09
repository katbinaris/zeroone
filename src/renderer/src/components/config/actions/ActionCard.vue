<template>
  <div class="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
    <div class="p-4">
      <span class="font-mono text-sm text-muted-foreground"
        >Action{{ actionIndex ? ` ${actionIndex}` : '' }}:</span
      >
      <span class="float-end mx-2 w-4 cursor-grab">
        <GripHorizontal class="action-handle mb-0.5 inline-block size-4 text-zinc-600" />
      </span>
      <div class="flex items-center gap-2">
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              ref="comboboxButton"
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="my-2 w-full justify-between"
            >
              <ScrambleText :text="value ? actionOptions[value].label : 'Select an action...'" />
              <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" :style="{ width: `${width * 1.125}px` }">
            <Command>
              <CommandInput class="h-9" placeholder="Search actions..." />
              <CommandEmpty>
                <ScrambleText scramble-on-mount text="No actions found." />
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="(action, key) in actionOptions"
                    :key="key"
                    :value="action"
                    @select="
                      () => {
                        value = key
                        open = false
                      }
                    "
                  >
                    {{ action.label }}
                    <Check
                      :class="cn('ml-auto h-4 w-4', value === key ? 'opacity-100' : 'opacity-0')"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          v-if="!confirmDelete"
          class="aspect-square border border-zinc-800 bg-transparent p-1 text-muted-foreground hover:bg-orange-900 hover:text-zinc-100"
          @click="confirmDelete = true"
          ><Trash2 class="size-4"
        /></Button>
        <template v-else>
          <Button
            class="aspect-square bg-orange-950 p-1 text-zinc-200 hover:bg-orange-900 hover:text-zinc-100"
            ><Check class="size-4"
          /></Button>
          <Button
            class="aspect-square border border-zinc-800 bg-transparent p-1 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
            @click="confirmDelete = false"
            ><X class="size-4"
          /></Button>
        </template>
      </div>
    </div>
    <Separator />
    <component :is="actionOptions[value]?.component ? actionOptions[value]?.component : WIP" />
  </div>
</template>

<script setup lang="ts">
import WIP from '@renderer/components/WIP.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@renderer/components/ui/popover'
import { Button } from '@renderer/components/ui/button'
import { Separator } from '@renderer/components/ui/separator'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { ref } from 'vue'
import { cn } from '@renderer/lib/utils'
import SendKeyAction from '@renderer/components/config/actions/SendKeyAction.vue'
import SendStringAction from '@renderer/components/config/actions/SendStringAction.vue'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { ChevronsUpDown, Check, GripHorizontal, Trash2, X } from 'lucide-vue-next'
import { useElementSize } from '@vueuse/core'

defineProps({
  actionIndex: {
    type: Number,
    required: false
  }
})

const actionOptions = ref({
  sendKey: { label: 'Press Key or Combination', component: SendKeyAction },
  sendString: { label: 'Type a String', component: SendStringAction },
  sendMouse: { label: 'Move, Scroll or Click', component: 'SendMouseAction' },
  sendGamepad: { label: 'Send a Gamepad Input', component: 'SendGamepadAction' },
  sendMidi: { label: 'Send a MIDI Message', component: 'SendMidiAction' },
  sendOsc: { label: 'Send an OSC Message', component: 'SendOscAction' },
  sendSerial: { label: 'Send a Serial Message', component: 'SendSerialAction' },
  controlMedia: { label: 'Control Media Playback', component: 'ControlMediaAction' },
  controlSystem: { label: 'Control your OS', component: 'ControlSystemAction' },
  runProgram: { label: 'Start a Program', component: 'RunProgramAction' },
  changeProfile: { label: 'Change Device Profile', component: 'ChangeProfileAction' }
})

const comboboxButton = ref(null)
const { width } = useElementSize(comboboxButton)

const open = ref(false)
const value = ref('')
const confirmDelete = ref(false)
</script>
