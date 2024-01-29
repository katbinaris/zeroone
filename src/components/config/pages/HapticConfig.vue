<template>
  <TabsContent value="haptic-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection
          :title="$t('config_options.feedback_designer.feedback_type.title')"
          :icon-component="GaugeCircle">
          <Tabs default-value="fd">
            <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
              <TabsTrigger value="fd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center ">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-fd.svg">
                  </div>
                  <span
                    class="text-xs leading-3 text-wrap">{{ $t('config_options.feedback_designer.feedback_type.fine_detents')
                    }}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="cd">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-cd.svg">
                  </div>
                  <span
                    class="text-xs leading-3 text-wrap">{{ $t('config_options.feedback_designer.feedback_type.coarse_detents')
                    }}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="vr">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-vf.svg">
                  </div>
                  <span
                    class="text-xs leading-3 text-wrap">{{ $t('config_options.feedback_designer.feedback_type.viscous_rotation')
                    }}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="rt">
                <div class="grid grid-flow-row auto-rows-max justify-items-center">
                  <div class="size-16 mb-2">
                    <img src="../../../assets/gui-ico/ico-rc.svg">
                  </div>
                  <span class="text-xs leading-3 text-wrap">
                              {{ $t('config_options.feedback_designer.feedback_type.return_to_center') }}
                            </span>
                </div>
              </TabsTrigger>
            </TabsList>

          </Tabs>

          <Separator />
          <div class="flex flex-col p-8 pt-4">
                      <span
                        class="text-sm text-muted-foreground font-mono h-8 text-center">{{ $t('config_options.feedback_designer.total_positions')
                        }}</span>

            <div class="flex w-full max-w-sm items-center gap-0">
              <Button
                type="submit" class="rounded-none text-xl font-pixellg align-middle font-bold"
                @click="count--">
                -
              </Button>
              <Input
                id="positions"
                v-model="count"
                class="rounded-none border-none text-5xl font-pixellg focus-visible:ring-0"
                type="number" placeholder="10" max="65535" min="10" />
              <Button
                type="submit" class="rounded-none text-xl font-pixellg font-bold"
                @click="count++">
                +
              </Button>
            </div>

          </div>
          <Separator />
        </ConfigSection>
        <ConfigSection
          :title="$t('config_options.feedback_designer.haptic_response.title')"
          :icon-component="AudioWaveform"
          :show-toggle="true">
          <SteppedSlider
            v-model="feedbackStrength"
            :label="$t('config_options.feedback_designer.haptic_response.feedback_strength')" />
          <Separator />
          <SteppedSlider
            v-model="bounceBackStrength"
            :label="$t('config_options.feedback_designer.haptic_response.bounce_back_strength')" />
          <Separator />
          <SteppedSlider
            v-model="outputRampDampening"
            :label="$t('config_options.feedback_designer.haptic_response.output_ramp_dampening')" />
        </ConfigSection>
        <ConfigSection
          :title="$t('config_options.feedback_designer.auditory_response.title')"
          :icon-component="AudioLines" :show-toggle="true">
          <div class="flex flex-col p-8 pt-4">
            <span
              class="text-sm text-muted-foreground font-mono">{{ $t('config_options.feedback_designer.auditory_response.haptic_level')
              }}</span>
            <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
            <div class="flex flex-row px-1 py-1.5">
              <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
              <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
              <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
              <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
              <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
            </div>
          </div>
          <Separator />
          <SteppedSlider
            v-model="auditoryMagnitude"
            :label="$t('config_options.feedback_designer.auditory_response.magnitude')"
            :max="3"
            :named-positions="[
              {value:0, label: 'Faint'},
              {value:1, label: 'Soft'},
              {value:2, label: 'Normal'},
              {value:3, label: 'Loud'}]" />
        </ConfigSection>
      </ScrollArea>
      <Separator />
    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Tabs } from '@/components/ui/tabs/index.js'
import { Slider } from '@/components/ui/slider/index.js'
import { AudioLines, AudioWaveform, GaugeCircle } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
import SteppedSlider from '@/components/config/SteppedSlider.vue'
import { ref } from 'vue'

const feedbackStrength = ref(2)
const bounceBackStrength = ref(2)
const outputRampDampening = ref(2)

const auditoryHapticLevel = ref(2)
const auditoryMagnitude = ref(2)

</script>