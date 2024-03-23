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
              class="my-2 w-full min-w-0 justify-between"
            >
              <ScrambleText
                class="overflow-hidden text-ellipsis text-nowrap"
                :text="
                  typeInputValue
                    ? actionTypeOptions[typeInputValue].label
                    : 'Select an action type...'
                "
              />
              <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" :style="{ width: `${width + 35}px` }">
            <Command>
              <CommandInput class="h-9" placeholder="Search action types..." />
              <CommandEmpty>
                <ScrambleText scramble-on-mount text="No action types found." />
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="(actionType, key) in actionTypeOptions"
                    :key="key"
                    :value="actionType"
                    @select="
                      () => {
                        typeInputValue = key
                        open = false
                      }
                    "
                  >
                    {{ actionType.label }}
                    <Check
                      :class="
                        cn('ml-auto h-4 w-4', typeInputValue === key ? 'opacity-100' : 'opacity-0')
                      "
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
    <component
      :is="
        actionTypeOptions[typeInputValue]?.component
          ? actionTypeOptions[typeInputValue]?.component
          : WIP
      "
      :action="action"
    />
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
import SendMidiCCAction from '@renderer/components/config/actions/SendMidiCCAction.vue'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { ChevronsUpDown, Check, GripHorizontal, Trash2, X } from 'lucide-vue-next'
import { useElementSize } from '@vueuse/core'
import { Action } from '@renderer/deviceStore'

const props = defineProps({
  actionIndex: {
    type: Number,
    required: false
  },
  action: {
    type: Object as () => Action,
    required: true
  }
})

const actionTypeOptions = ref({
  key: { label: 'Press a Keyboard Key', component: SendKeyAction },
  midi: { label: 'Send a MIDI Control Change', component: SendMidiCCAction }
})

const comboboxButton = ref(null)
const { width } = useElementSize(comboboxButton)

const open = ref(false)
const typeInputValue = ref(props.action.type)
const confirmDelete = ref(false)
</script>
