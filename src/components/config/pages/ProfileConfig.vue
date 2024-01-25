<template>
  <TabsContent value="prog-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection :title="$t('config_options.profile_settings.connection_type.title')" :icon-component="Cable">
          <Tabs default-value="fd">
            <TabsList class="grid grid-cols-2 h-auto text-muted-foreground">
              <TabsTrigger value="fd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center ">
                  <div class="w-24 size-w mb-2">
                    <img src="../../../assets/gui-ico/ico-usb-logo.svg" alt="usb-logo">
                  </div>
                  <span
                    class="text-xs leading-3 text-wrap">{{ $t('config_options.profile_settings.connection_type.usb')
                    }}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="cd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="w-24 size-w mb-2">
                    <img src="../../../assets/gui-ico/ico-midi-logo.svg" alt="midi-logo">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.profile_settings.connection_type.midi') }}
                            </span>
                </div>
              </TabsTrigger>
            </TabsList>

          </Tabs>
        </ConfigSection>
        <ConfigSection :title="$t('config_options.profile_settings.profile_properties.title')" :icon-component="Type">
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
              <Switch id="airplane-mode" default-checked="true" />
              <Label
                for="airplane-mode"
                class="text-xs text-muted-foreground">{{
                  $t('config_options.profile_settings.profile_properties.show_description')
                }}</Label>
            </div>
          </div>
        </ConfigSection>

        <ConfigSection
          :title="$t('config_options.profile_settings.internal_profile_toggle.title')"
          :icon-component="Replace" :show-toggle="true">
          <p class="flex flex-col p-8 py-4 text-muted-foreground text-xs">
            {{ $t('config_options.profile_settings.internal_profile_toggle.subtitle') }}
            <Separator class="mt-4" />
            <span class="space-y-4">{{ $t('config_options.profile_settings.internal_profile_toggle.operation')
              }}: <Badge class="bg-orange-500">SHIFT</Badge> + <Badge
                class="bg-zinc-500">Fn3</Badge> + <Badge>Rotation</Badge></span>
            <Separator class="my-4" />
            <span>{{ $t('config_options.profile_settings.internal_profile_toggle.warning') }}</span>
          </p>
        </ConfigSection>


      </ScrollArea>
      <Separator />


    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Tabs } from '@/components/ui/tabs/index.js'
import { Label } from '@/components/ui/label/index.js'
import { Switch } from '@/components/ui/switch/index.js'
import { Replace, Type, Cable, Power } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import { Separator } from '@/components/ui/separator/index.js'
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