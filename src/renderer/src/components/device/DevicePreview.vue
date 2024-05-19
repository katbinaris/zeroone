<template>
  <div class="aspect-[800/1100]">
    <div
      class="relative size-full bg-contain bg-top bg-no-repeat"
      :style="{
        backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.35) 95%, black), url(${previewDeviceImage})`,
        backgroundBlendMode: 'multiply'
      }"
    >
      <Transition name="fade">
        <div v-if="deviceStore.connected" class="flex h-12 items-center justify-between px-10">
          <h2>
            <ScrambleText
              :delay="100"
              scramble-on-mount
              :fill-interval="50"
              :replace-interval="50"
              text="Nano_D++"
            />
          </h2>
          <div class="font-mono text-sm">
            <span class="text-muted-foreground">Firmware: </span>
            <ScrambleText
              :delay="100"
              scramble-on-mount
              :fill-interval="50"
              :replace-interval="50"
              text="v1.3.2a"
            />
          </div>
        </div>
      </Transition>
      <Transition name="fade-delayed">
        <DeviceLEDRing
          v-if="deviceStore.connected"
          :value="ringValue"
          class="absolute inset-x-0 top-[12.5%] mx-auto h-[66%]"
        />
      </Transition>

      <div
        class="absolute inset-x-0 top-[30.5%] mx-auto flex aspect-square h-[30%] flex-col items-center justify-center overflow-hidden rounded-full"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)"
      >
        <TransitionGroup name="fade-display">
          <div
            v-if="deviceStore.connected"
            class="absolute flex scale-[80%] flex-col items-center pb-2 text-center opacity-90 mix-blend-screen"
          >
            <img :src="LogoMidi" alt="midi-logo" class="h-4 opacity-50" />
            <h2 class="font-pixellg text-5xl">
              {{ deviceStore.position }}
            </h2>
            <div class="font-pixelsm text-md">HIGH PASS</div>
            <span class="font-pixelsm w-36 text-[7pt] uppercase text-muted-foreground">
              KORG MINILOGUE HIGH PASS FILTER 0-127
            </span>
          </div>
          <div v-else class="flex flex-col items-center text-center mix-blend-screen">
            <ScrambleText
              :text="offlineText"
              character-set="_()*=0011"
              scramble-on-mount
              :delay="1000"
              :fill-interval="50"
              :replace-interval="50"
              class="font-pixelsm text-[7pt] uppercase text-muted-foreground"
              @finish="nextOfflineText"
            />
          </div>
        </TransitionGroup>
      </div>
      <Transition name="fade-delayed">
        <button
          v-if="deviceStore.connected"
          class="absolute inset-x-0 top-[24.5%] mx-auto aspect-square h-[41.5%] rounded-full outline-2 transition-all"
          :class="{
            'outline outline-white': appStore.selectedFeature === 'knob',
            'outline-zinc-400 hover:outline': appStore.selectedFeature !== 'knob'
          }"
          @click="appStore.selectConfigFeature('knob')"
        />
      </Transition>
      <Transition name="fade-delayed">
        <DeviceKeys
          v-if="deviceStore.connected"
          :keys="keyColors"
          class="absolute inset-x-0 top-[75.35%] mx-auto w-[78%] gap-[2.2%] overflow-hidden rounded-lg px-[2.5%] py-[2.8%]"
          :selected="appStore.selectedFeature === 'key' ? appStore.selectedKey : ''"
          @select="appStore.selectKey"
        />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import RenderNanoOne from '@renderer/assets/images/renderNanoOneTransparent.png'
import RenderNanoZero from '@renderer/assets/images/renderNanoZeroTransparent.png'
import LogoMidi from '@renderer/assets/logos/logoMidi.svg'
import DeviceBar from '@renderer/components/device/DeviceBar.vue'
import { useAppStore } from '@renderer/appStore'
import { useDeviceStore } from '@renderer/deviceStore'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { computed, ref } from 'vue'
import DeviceLEDRing from '@renderer/components/device/DeviceLEDRing.vue'
import DeviceKeys from '@renderer/components/device/DeviceKeys.vue'
import { storeToRefs } from 'pinia'
import Color from 'color'

const appStore = useAppStore()
const deviceStore = useDeviceStore()

const devicePosition = computed(() => deviceStore.position || 0)
const minValue = computed(() => deviceStore.activeValue?.valueMin || 0)
const maxValue = computed(() => deviceStore.activeValue?.valueMax || 100)
const ringValue = computed(
  () => ((devicePosition.value - minValue.value) / (maxValue.value - minValue.value)) * 100
)

const previewDeviceImages = {
  nanoOne: RenderNanoOne,
  nanoZero: RenderNanoZero
}

const previewDeviceImage = computed(
  () => previewDeviceImages[appStore.previewDeviceModel || 'nanoOne']
)

const { keyColor } = storeToRefs(deviceStore)

const keyColors = computed(() => {
  return {
    a: {
      color: Color(keyColor.value('a', deviceStore.keyStates.a)),
      pressed: deviceStore.keyStates.a
    },
    b: {
      color: Color(keyColor.value('b', deviceStore.keyStates.b)),
      pressed: deviceStore.keyStates.b
    },
    c: {
      color: Color(keyColor.value('c', deviceStore.keyStates.c)),
      pressed: deviceStore.keyStates.c
    },
    d: {
      color: Color(keyColor.value('d', deviceStore.keyStates.d)),
      pressed: deviceStore.keyStates.d
    }
  }
})

const offlineText = ref('NO DEVICE CONNECTED')
const offlineTexts = [
  'AWAITING CONNECTION',
  'ARE YOU STILL THERE?',
  'DEVICE OFFLINE',
  'AWAITING CONNECTION',
  'I MISS YOU',
  'AWAITING CONNECTION',
  'NO DEVICE CONNECTED',
  'IS ANYONE THERE?',
  'AWAITING CONNECTION',
  'DEVICE OFFLINE',
  'NAP TIME',
  'NO DEVICE CONNECTED'
]

let offlineTextIndex = 0
const nextOfflineText = () => {
  if (offlineText.value === '') {
    offlineText.value = offlineTexts[offlineTextIndex]
    offlineTextIndex = (offlineTextIndex + 1) % offlineTexts.length
  } else {
    setTimeout(() => {
      offlineText.value = ''
    }, 3500)
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease;
}

.fade-slow-enter-active,
.fade-slow-leave-active,
.fade-delayed-enter-active,
.fade-delayed-leave-active {
  transition: opacity 1000ms ease;
}

.fade-delayed-enter-active,
.fade-slow-enter-active {
  transition-delay: 150ms;
}

.fade-display-enter-active,
.fade-display-leave-active {
  transition: opacity 500ms ease;
}

.fade-display-enter-active {
  transition-delay: 1000ms;
}

.fade-enter-from,
.fade-leave-to,
.fade-slow-enter-from,
.fade-slow-leave-to,
.fade-delayed-enter-from,
.fade-delayed-leave-to,
.fade-display-enter-from,
.fade-display-leave-to {
  opacity: 0;
}
</style>
