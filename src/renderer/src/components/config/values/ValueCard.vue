<template>
  <div class="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
    <div class="p-4">
      <span class="font-mono text-sm text-muted-foreground"
        >Value{{ valueIndex ? ` ${valueIndex}` : '' }}:</span
      >
      <span class="float-end mx-2 w-4 cursor-grab">
        <GripHorizontal class="value-handle mb-0.5 inline-block size-4 text-zinc-600" />
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
                :text="valueType?.label || 'Select a value type...'"
              />
              <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" :style="{ width: `${width + 35}px` }">
            <Command>
              <CommandInput class="h-9" placeholder="Search value types..." />
              <CommandEmpty>
                <ScrambleText scramble-on-mount text="No value types found." />
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="(valueType, key) in valueTypeOptions"
                    :key="key"
                    :value="valueType"
                    @select="
                      () => {
                        inputValue = key
                        open = false
                        deviceStore.updateKnobValueParameter(valueIndex - 1, { type: key })
                      }
                    "
                  >
                    {{ valueType.label }}
                    <Check
                      :class="
                        cn('ml-auto h-4 w-4', inputValue === key ? 'opacity-100' : 'opacity-0')
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
            @click="$emit('delete')"
            ><Check class="size-4"
          /></Button>
          <Button
            class="aspect-square border border-zinc-800 bg-transparent p-1 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
            @click="confirmDelete = false"
            ><X class="size-4"
          /></Button>
        </template>
      </div>
      <span class="font-mono text-sm text-muted-foreground">Conditions:</span>
      <div class="flex gap-2 py-2">
        <Button
          v-for="(condition, key) in conditions"
          :key="key"
          class="font-heading flex flex-1 basis-1/4 items-center justify-center"
          :class="{
            'border border-zinc-200 bg-zinc-300': condition === true,
            'border border-zinc-800 bg-transparent text-muted-foreground hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300':
              condition === false
          }"
          @click="cycleCondition(key)"
        >
          <span class="mr-0.5">{{ key.toUpperCase() }}:</span>
          <PanelBottomClose v-if="condition === true" class="size-4" />
          <PanelBottomOpen v-else-if="condition === false" class="size-4" />
          <HelpCircle v-else class="size-4" />
        </Button>
      </div>
    </div>
    <Separator />
    <component
      :is="
        inputValue && valueTypeOptions[inputValue]?.component
          ? valueTypeOptions[inputValue]?.component
          : WIP
      "
      :value="value"
      @update="(updates) => deviceStore.updateKnobValueParameter(valueIndex - 1, updates)"
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
import { computed, ref } from 'vue'
import { cn } from '@renderer/lib/utils'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import {
  ChevronsUpDown,
  Check,
  GripHorizontal,
  Trash2,
  X,
  PanelBottomClose,
  PanelBottomOpen,
  HelpCircle
} from 'lucide-vue-next'
import { useElementSize } from '@vueuse/core'
import TriggerActionsValue from '@renderer/components/config/values/TriggerActionsValue.vue'
import ControlMidiValue from './ControlMidiValue.vue'
import { useDeviceStore } from '@renderer/deviceStore'

const deviceStore = useDeviceStore()

defineEmits(['delete'])

const props = defineProps({
  value: {
    type: Object,
    required: true
  },
  valueIndex: {
    type: Number,
    required: true
  }
})

const valueTypeOptions = ref({
  mouse: { label: 'Move or Scroll the Mouse', component: 'ControlMouseValue' },
  gamepad: { label: 'Control a Gamepad Axis', component: 'ControlGamepadValue' },
  midi: { label: 'Control a MIDI CC Value', component: ControlMidiValue },
  action: { label: 'Trigger Actions on Rotation', component: TriggerActionsValue },
  profiles: { label: 'Switch Profiles', component: 'SwitchProfilesValue' }
})

const valueType = computed(() => {
  if (inputValue.value in valueTypeOptions.value) {
    return valueTypeOptions.value[inputValue.value]
  }
  return null
})

const conditions = ref({
  a: true,
  b: false,
  c: false,
  d: false
})

const cycleCondition = (key: string) => {
  const condition = conditions.value[key]
  if (condition === true) conditions.value[key] = false
  else conditions.value[key] = true
}

const comboboxButton = ref(null)
const { width } = useElementSize(comboboxButton)

const open = ref(false)
const inputValue = ref(props.value.type || null)
const confirmDelete = ref(false)
</script>
