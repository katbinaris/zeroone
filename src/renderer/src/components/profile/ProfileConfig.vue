<template>
  <ConfigSection
    :title="$t('config_options.profile_settings.profile_properties.title')"
    :icon-component="Type"
  >
    <div class="my-4 px-8">
      <span class="font-mono text-sm text-muted-foreground">Title</span>
      <Input class="font-pixelsm mt-2 uppercase" default-value="Title text" />
    </div>
    <div class="my-4 px-8">
      <span class="font-mono text-sm text-muted-foreground">Description</span>
      <Textarea
        class="font-pixelsm mt-2 uppercase"
        default-value="Descriptive description describing the profile"
      />
    </div>
  </ConfigSection>
  <ConfigSection
    v-if="false"
    :title="$t('config_options.profile_settings.connection_type.title')"
    :icon-component="Cable"
  >
    <!-- TODO: Remove later if not needed -->
    <TabSelect v-model="connectionType" :options="connectionTypeOptions" />
  </ConfigSection>

  <ConfigSection
    :title="$t('config_options.profile_settings.internal_profile_toggle.title')"
    :icon-component="Replace"
    :show-toggle="true"
  >
    <p class="flex flex-col p-8 py-4 text-xs text-muted-foreground">
      {{ $t('config_options.profile_settings.internal_profile_toggle.subtitle') }}
      <Separator class="mt-4" />
      <span class="space-y-4 py-4"
        >{{ $t('config_options.profile_settings.internal_profile_toggle.operation') }}:<br />
        <Badge class="bg-orange-500">SHIFT</Badge> + <Badge class="bg-zinc-500">Fn3</Badge> +
        <Badge>Rotation</Badge></span
      >
      <Separator />
      <span class="pt-4">{{
        $t('config_options.profile_settings.internal_profile_toggle.warning')
      }}</span>
    </p>
  </ConfigSection>
</template>
<script setup>
import { Cable, Replace, Type } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { Separator } from '@renderer/components/ui/separator'
import { ref } from 'vue'
import UsbIcon from '@renderer/assets/logos/logoUsb.svg'
import MidiIcon from '@renderer/assets/logos/logoMidi.svg'
import { Badge } from '@renderer/components/ui/badge'
import TabSelect from '@renderer/components/common/TabSelect.vue'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'

const connectionType = ref('usb') // TODO: replace with actual value

const connectionTypeOptions = {
  usb: {
    icon: UsbIcon,
    titleKey: 'config_options.profile_settings.connection_type.usb'
  },
  midi: {
    icon: MidiIcon,
    titleKey: 'config_options.profile_settings.connection_type.midi'
  }
}
</script>
