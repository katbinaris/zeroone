<template>
  <ConfigSection
    :title="$t('config_options.feedback_designer.haptic_response.title')"
    :icon-component="AudioWaveform"
    :show-toggle="true"
  >
    <SteppedSlider
      v-model="feedbackStrength"
      :max="feedbackStrengthValues.length - 1"
      :named-positions="[
        {
          label: 'Min',
          value: 0
        },
        {
          label: 'Max',
          value: feedbackStrengthValues.length - 1
        }
      ]"
      :label="$t('config_options.feedback_designer.haptic_response.feedback_strength')"
    />
    <Separator />
    <SteppedSlider
      v-model="outputRampDampening"
      :max="outputRampValues.length - 1"
      :named-positions="[
        {
          label: 'Min',
          value: 0
        },
        {
          label: 'Max',
          value: outputRampValues.length - 1
        }
      ]"
      :label="$t('config_options.feedback_designer.haptic_response.output_ramp_dampening')"
    />
  </ConfigSection>
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
import { AudioLines, AudioWaveform } from 'lucide-vue-next'
import ConfigSection from '@renderer/components/common/ConfigSection.vue'
import { ref, watch } from 'vue'
// import TabSelect from '@renderer/components/common/TabSelect.vue'
// import FdIcon from '@renderer/assets/icons/iconFineDetents.svg'
// import CdIcon from '@renderer/assets/icons/iconCoarseDetents.svg'
// import VfIcon from '@renderer/assets/icons/iconViscousRotation.svg'
// import RcIcon from '@renderer/assets/icons/iconReturnToCenter.svg'
import SteppedSlider from '@renderer/components/common/SteppedSlider.vue'
import { Separator } from '@renderer/components/ui/separator'
import WIP from '@renderer/components/WIP.vue'
import { useDeviceStore } from '@renderer/deviceStore'

const deviceStore = useDeviceStore()

// const feedbackType = ref('fineDetents') // TODO: replace with actual value

// const feedbackTypeOptions = {
//   fineDetents: {
//     icon: FdIcon,
//     titleKey: 'config_options.feedback_designer.feedback_type.fine_detents'
//   },
//   coarseDetents: {
//     icon: CdIcon,
//     titleKey: 'config_options.feedback_designer.feedback_type.coarse_detents'
//   },
//   viscousRotation: {
//     icon: VfIcon,
//     titleKey: 'config_options.feedback_designer.feedback_type.viscous_rotation'
//   },
//   returnToCenter: {
//     icon: RcIcon,
//     titleKey: 'config_options.feedback_designer.feedback_type.return_to_center'
//   }
// }

const outputRampValues = ref([25, 40, 80, 200, 10000])

const outputRampIndex = outputRampValues.value.indexOf(deviceStore.activeValue?.haptic?.outputRamp)
const outputRampDampening = ref(outputRampIndex === -1 ? 2 : outputRampIndex)

watch(outputRampDampening, (value) => {
  deviceStore.setHapticOutputRamp(outputRampValues.value[value])
})

const feedbackStrengthValues = ref([0, 2, 5, 7, 10])

const feedbackStrengthIndex = feedbackStrengthValues.value.indexOf(
  deviceStore.activeValue?.haptic?.detentStrength
)
const feedbackStrength = ref(feedbackStrengthIndex === -1 ? 5 : feedbackStrengthIndex)

watch(feedbackStrength, (value) => {
  deviceStore.setHapticFeedbackStrength(feedbackStrengthValues.value[value])
})

const auditoryHapticLevel = ref(2)
const auditoryMagnitude = ref(2)
</script>
