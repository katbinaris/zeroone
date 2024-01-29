<template>
  <div class="w-96">
    <ConfigSection :title="$t('config_options.profile_settings.profile_properties.title')" :icon-component="Type">
      <WIP />
      <div class="hidden">
        <div class="flex flex-col p-8 py-4">
                      <span
                        class="text-sm text-muted-foreground font-mono pb-4">{{ $t('config_options.profile_settings.profile_properties.profile_name')
                        }}</span>
          <Input
            type="text" :placeholder="$t('config_options.profile_settings.profile_properties.profile_name')"
            class="text-xl border-0 text-center border-b rounded-none focus-visible:ring-0 focus-visible:border-emerald-500 font-pixelsm uppercase"
            default-value="Oscillator 1" maxlength="20" />

          <Label for="text" class="text-muted-foreground text-right mt-1 text-xs">16/20</Label>
        </div>
        <Separator />
        <div class="flex flex-col p-8 py-4">
                      <span
                        class="text-sm text-muted-foreground font-mono pb-4">{{ $t('config_options.profile_settings.profile_properties.profile_description')
                        }}</span>
          <Textarea
            class="text-lg px-3 bg-inherit text-center focus-visible:outline-none border-b focus-visible:border-emerald-500 resize-none font-pixelsm text-muted-foreground uppercase"
            :placeholder="$t('config_options.profile_settings.profile_properties.profile_description')"
            default-value="Adjust Korg Oscillator Waveform " rows="2"
            maxlength="50" />
          <Label for="textarea" class="text-muted-foreground text-right mt-1 text-xs">24/50</Label>
          <div class="flex items-center space-x-4 space-y-1">
            <Switch id="airplane-mode" :default-checked="true" />
            <Label
              for="airplane-mode"
              class="text-xs text-muted-foreground">{{
                $t('config_options.profile_settings.profile_properties.show_description')
              }}</Label>
          </div>
        </div>
      </div>
    </ConfigSection>
    <ConfigSection :title="$t('config_options.profile_settings.connection_type.title')" :icon-component="Cable">
      <div class="flex font-heading">
        <ConnectionTypeButton
          v-for="(option, key) in connectionTypeOptions" :key="key" :title="$t(option.titleKey)"
          :icon="option.icon" :selected="connectionType===key" @select="connectionType=key" />
      </div>
    </ConfigSection>

    <ConfigSection
      :title="$t('config_options.profile_settings.internal_profile_toggle.title')"
      :icon-component="Replace" :show-toggle="true">
      <p class="flex flex-col p-8 py-4 text-muted-foreground text-xs">
        {{ $t('config_options.profile_settings.internal_profile_toggle.subtitle') }}
        <Separator class="mt-4" />
        <span class="py-4 space-y-4">{{ $t('config_options.profile_settings.internal_profile_toggle.operation')
          }}:<br>
          <Badge class="bg-orange-500">SHIFT</Badge> + <Badge
            class="bg-zinc-500">Fn3</Badge> + <Badge>Rotation</Badge></span>
        <Separator />
        <span class="pt-4">{{ $t('config_options.profile_settings.internal_profile_toggle.warning') }}</span>
      </p>
    </ConfigSection>
  </div>
</template>
<script setup>
import { Label } from '@/components/ui/label/index.js'
import { Switch } from '@/components/ui/switch/index.js'
import { Cable, Replace, Type } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import { Separator } from '@/components/ui/separator/index.js'
import { ref } from 'vue'
import UsbIcon from '@/assets/gui-ico/ico-usb-logo.svg'
import MidiIcon from '@/assets/gui-ico/ico-midi-logo.svg'
import ConnectionTypeButton from '@/components/config/ConnectionTypeButton.vue'
import { Badge } from '@/components/ui/badge'
import WIP from '@/components/WIP.vue'

const connectionType = ref('usb') // TODO: replace with actual value

const connectionTypeOptions = {
  usb: {
    icon: UsbIcon,
    titleKey: 'config_options.profile_settings.connection_type.usb',
  },
  midi: {
    icon: MidiIcon,
    titleKey: 'config_options.profile_settings.connection_type.midi',
  },
}

</script>