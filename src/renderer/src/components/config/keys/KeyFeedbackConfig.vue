<template>
  <ConfigSection
    :title="$t('config_options.feedback_designer.auditory_response.title')"
    :icon-component="AudioLines"
    :show-toggle="true"
  >
    <template v-if="false">
      <SteppedSlider
        v-model="auditoryHapticLevel"
        :label="$t('config_options.feedback_designer.auditory_response.haptic_level')"
      />
      <Separator />
      <SteppedSlider
        v-model="auditoryMagnitude"
        :label="$t('config_options.feedback_designer.auditory_response.magnitude')"
        :max="3"
        :named-positions="[
          { value: 0, label: 'Faint' },
          { value: 1, label: 'Soft' },
          { value: 2, label: 'Normal' },
          { value: 3, label: 'Loud' }
        ]"
      />
    </template>
    <template v-else>
      <WIP />
    </template>
  </ConfigSection>
</template>
<script setup>
import { AudioLines, AudioWaveform, GaugeCircle } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { Separator } from '@renderer/components/ui/separator'
import { ref } from 'vue'
import TabSelect from '@renderer/components/common/TabSelect.vue'
import FdIcon from '@renderer/assets/icons/iconFineDetents.svg'
import CdIcon from '@renderer/assets/icons/iconCoarseDetents.svg'
import VfIcon from '@renderer/assets/icons/iconViscousRotation.svg'
import RcIcon from '@renderer/assets/icons/iconReturnToCenter.svg'
import SteppedSlider from '@renderer/components/common/SteppedSlider.vue'
import WIP from '@renderer/components/WIP.vue'

const feedbackType = ref('fineDetents') // TODO: replace with actual value

const feedbackTypeOptions = {
  fineDetents: {
    icon: FdIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.fine_detents'
  },
  coarseDetents: {
    icon: CdIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.coarse_detents'
  },
  viscousRotation: {
    icon: VfIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.viscous_rotation'
  },
  returnToCenter: {
    icon: RcIcon,
    titleKey: 'config_options.feedback_designer.feedback_type.return_to_center'
  }
}

const feedbackStrength = ref(2)
const bounceBackStrength = ref(2)
const outputRampDampening = ref(2)

const auditoryHapticLevel = ref(2)
const auditoryMagnitude = ref(2)
</script>
