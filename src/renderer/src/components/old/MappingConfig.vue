<template>
  <ConfigSection title="Map some stuff idk" :icon-component="Keyboard">
    <div v-if="false" class="flex font-heading">
      <KeySelectButton
        v-for="(option, key) in keySelectOptions" :key="key" :title="$t(option.titleKey)"
        :invert="option.invert" :badge="option.badge"
        :icon="option.icon" :selected="selectedKey===key" @select="selectedKey=key" />
    </div>
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
</template>
<script setup>
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator,
} from '@renderer/components/ui/command'
import { KeyboardMusic, Squircle, Keyboard } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import KeyO from '@renderer/assets/icons/iconKeyOrange.svg'
import Key from '@renderer/assets/icons/iconKeyWhite.svg'
import KeyG from '@renderer/assets/icons/iconKeyGrey.svg'
import KeyD from '@renderer/assets/icons/iconKeyDark.svg'
import { ref } from 'vue'
import KeySelectButton from '@renderer/components/old/KeySelectButton.vue'

const selectedKey = ref('a') // TODO: replace with actual value

const keySelectOptions = {
  a: {
    icon: KeyO,
    titleKey: 'config_options.mapping_configuration.key_mapping.switch.a',
    invert: false,
  },
  b: {
    icon: Key,
    titleKey: 'config_options.mapping_configuration.key_mapping.switch.b',
    invert: true,
  },
  c: {
    icon: KeyG,
    titleKey: 'config_options.mapping_configuration.key_mapping.switch.c',
    invert: true,
  },
  d: {
    icon: KeyD,
    titleKey: 'config_options.mapping_configuration.key_mapping.switch.d',
    invert: true,
  },
}
</script>