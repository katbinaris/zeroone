<template>
  <ConfigSection :title="$t('config_options.profile_settings.profile_properties.title')" :icon-component="Type">
    <WIP />
  </ConfigSection>
  <ConfigSection :title="$t('config_options.profile_settings.connection_type.title')" :icon-component="Cable">
    <TabSelect v-model="connectionType" :options="connectionTypeOptions" />
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
</template>
<script setup>
import { Cable, Replace, Type } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import { Separator } from '@/components/ui/separator/index.js'
import { ref } from 'vue'
import UsbIcon from '@/assets/logos/logoUsb.svg'
import MidiIcon from '@/assets/logos/logoMidi.svg'
import { Badge } from '@/components/ui/badge'
import WIP from '@/components/WIP.vue'
import TabSelect from '@/components/config/TabSelect.vue'

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