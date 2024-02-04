<template>
  <ConfigSection
    :title="$t('config_options.feedback_designer.feedback_type.title')"
    :icon-component="GaugeCircle">
    <TabSelect v-model="feedbackType" :options="feedbackTypeOptions" />
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
    <SteppedSlider
      v-model="auditoryHapticLevel"
      :label="$t('config_options.feedback_designer.auditory_response.haptic_level')" />
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
  <ConfigSection title="Ring Light" :icon-component="Lightbulb">
    <PaletteInput v-model="ringColors" />
  </ConfigSection>
</template>
<script setup>
import { AudioLines, AudioWaveform, GaugeCircle, Lightbulb } from 'lucide-vue-next'
import ConfigSection from '@/components/common/ConfigSection.vue'
import PaletteInput from '@/components/common/PaletteInput.vue'
import Color from 'color'
import { ref } from 'vue'
import TabSelect from '@/components/common/TabSelect.vue'
import FdIcon from '@/assets/icons/iconFineDetents.svg'
import CdIcon from '@/assets/icons/iconCoarseDetents.svg'
import VfIcon from '@/assets/icons/iconViscousRotation.svg'
import RcIcon from '@/assets/icons/iconReturnToCenter.svg'
import SteppedSlider from '@/components/common/SteppedSlider.vue'

const feedbackType = ref('fineDetents') // TODO: replace with actual value

const feedbackTypeOptions = {
  fineDetents: {
    icon: FdIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.fine_detents',
  },
  coarseDetents: {
    icon: CdIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.coarse_detents',
  },
  viscousRotation: {
    icon: VfIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.viscous_rotation',
  },
  returnToCenter: {
    icon: RcIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.return_to_center',
  },
}

const feedbackStrength = ref(2)
const bounceBackStrength = ref(2)
const outputRampDampening = ref(2)

const auditoryHapticLevel = ref(2)
const auditoryMagnitude = ref(2)

const ringColors = ref({
  primary: {
    titleKey: 'config_options.light_designer.primary_color',
    color: Color('#4f25ef'),
  },
  secondary: {
    titleKey: 'config_options.light_designer.secondary_color',
    color: Color('#1a1498'),
  },
  pointer: {
    titleKey: 'config_options.light_designer.pointer_color',
    color: Color('#ffa346'),
  },
})
</script>