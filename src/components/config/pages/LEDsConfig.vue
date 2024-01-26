<template>
  <TabsContent value="led-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection
          :title="$t('config_options.light_designer.led_feedback')" :icon-component="Lightbulb"
          :show-toggle="true">
          <h2 class="p-6">{{ $t('config_options.light_designer.led_mode') }}</h2>
        </ConfigSection>
        <div class="h-6" />
        <!-- TODO: Instead of 3 color pickers, add a context select above -->
        <ConfigSection :title="$t('config_options.light_designer.led_colors')" :icon-component="Palette">
          <PaletteInput />
        </ConfigSection>
      </ScrollArea>
    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Lightbulb, Palette } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import PaletteInput from '@/components/config/pages/PaletteInput.vue'
</script>