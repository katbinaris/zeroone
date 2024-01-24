<template>
  <TabsContent value="prog-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <Cable class="h-4 w-4" />
          </div>
          <div class="flex-initial"><h2 class="text-sm px-2 py-4">
            {{ $t('config_options.program_settings.connection_type.title') }}</h2></div>

        </div>
        <Separator />

        <Tabs default-value="fd">
          <TabsList class="grid grid-cols-2 h-auto text-muted-foreground">
            <TabsTrigger value="fd">
              <div class="grid grid-flow-row auto-rows-max justify-items-center ">
                <div class="w-24 size-w mb-2">
                  <img src="../../assets/gui-ico/ico-usb-logo.svg" alt="usb-logo">
                </div>
                <span
                  class="text-xs leading-3 text-wrap">{{ $t('config_options.program_settings.connection_type.usb')
                    }}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cd">
              <div class="grid grid-flow-row auto-rows-max justify-items-center">
                <div class="w-24 size-w mb-2">
                  <img src="../../assets/gui-ico/ico-midi-logo.svg" alt="midi-logo">
                </div>
                <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.program_settings.connection_type.midi') }}
                            </span>
              </div>
            </TabsTrigger>
          </TabsList>

        </Tabs>


        <Separator />

        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <Type class="h-4 w-4" />
          </div>
          <div class="grow">
            <h2 class="text-sm px-2 py-4">{{ $t('config_options.program_settings.profile_properties.title')
              }}</h2>
          </div>


        </div>
        <Separator />

        <div class="flex flex-col p-8 py-4">
                      <span
                        class="text-sm text-muted-foreground font-mono pb-4">{{ $t('config_options.program_settings.profile_properties.program_name')
                        }}</span>
          <Input
            type="text" :placeholder="$t('config_options.program_settings.profile_properties.program_name')"
            class="text-xl border-0 text-center border-b rounded-none focus-visible:ring-0 focus-visible:border-emerald-500 font-pixelsm uppercase"
            default-value="Oscillator 1" maxlength="20" />

          <Label for="text" class="text-muted-foreground text-right mt-1 text-xs">16/20</Label>
        </div>
        <Separator />
        <div class="flex flex-col p-8 py-4">
                      <span
                        class="text-sm text-muted-foreground font-mono pb-4">{{ $t('config_options.program_settings.profile_properties.program_description')
                        }}</span>
          <Textarea
            class="text-lg px-3 bg-inherit text-center focus-visible:outline-none border-b focus-visible:border-emerald-500 resize-none font-pixelsm text-muted-foreground uppercase"
            :placeholder="$t('config_options.program_settings.profile_properties.program_description')"
            default-value="Adjust Korg Oscillator Waveform " rows="2"
            maxlength="50" />
          <Label for="textarea" class="text-muted-foreground text-right mt-1 text-xs">24/50</Label>
          <div class="flex items-center space-x-4 space-y-1">
            <Switch id="airplane-mode" default-checked="true" />
            <Label
              for="airplane-mode"
              class="text-xs text-muted-foreground">{{
              $t('config_options.program_settings.profile_properties.show_description')
              }}</Label>
          </div>
        </div>
        <Separator />

        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <Replace class="h-4 w-4" />
          </div>
          <div class="grow"><h2 class="text-sm px-2 py-4">
            {{ $t('config_options.program_settings.internal_profile_toggle.title') }}</h2></div>
          <div class="flex-none">
            <Toggle
              class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline"
              size="sm" :default-value="true" aria-label="EnablePrimary">
              <Power class="w-4 h-4" />
            </Toggle>
          </div>


        </div>
        <p class="flex flex-col p-8 py-4 text-muted-foreground text-xs">
          {{ $t('config_options.program_settings.internal_profile_toggle.subtitle') }}
          <Separator class="mt-4" />
          <span class="space-y-4">{{ $t('config_options.program_settings.internal_profile_toggle.operation')
              }}: <Badge class="bg-orange-500">SHIFT</Badge> + <Badge
              class="bg-zinc-500">Fn3</Badge> + <Badge>Rotation</Badge></span>
          <Separator class="my-4" />
          <span>{{ $t('config_options.program_settings.internal_profile_toggle.warning') }}</span>
        </p>


      </ScrollArea>
      <Separator />


    </div>
  </TabsContent>
</template>
<script>
export default {
  name: 'ProgramConfig',
}
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