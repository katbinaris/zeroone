<template>
  <div class="aspect-[800/1100]">
    <div
      class="bg-contain bg-top bg-no-repeat h-full w-full relative"
      :style="{backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.35) 95%, black), url(${previewDeviceImage})`,
      backgroundBlendMode: 'multiply'}">
      <Transition name="fade">
        <div v-if="store.connected" class="px-10 h-12 flex justify-between items-center">
          <h2>
            <ScrambleText :delay="100" scramble-on-mount :fill-interval="50" :replace-interval="50" text="Nano_D++" />
          </h2>
          <div class="font-mono text-sm">
            <span class="text-muted-foreground">Firmware: </span>
            <ScrambleText :delay="100" scramble-on-mount :fill-interval="50" :replace-interval="50" text="v1.3.2a" />
          </div>
        </div>
      </Transition>
      <Transition name="fade-delayed">
        <DeviceLEDRing
          v-if="store.connected" :value="barValue"
          class="absolute h-[66%] top-[12.5%] left-0 right-0 mx-auto" />
      </Transition>

      <div
        class="rounded-full aspect-square absolute h-[30%] top-[30.5%] left-0 right-0 mx-auto flex flex-col justify-center items-center overflow-hidden"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)">
        <TransitionGroup name="fade-display">
          <div
            v-if="store.connected"
            class="absolute flex flex-col items-center text-center pb-2 mix-blend-screen">
            <img :src="LogoMidi" alt="midi-logo" class="opacity-50 h-4">
            <h2 class="font-pixellg text-5xl">{{ parseInt(value) }}</h2>
            <div class="font-pixelsm text-md">HIGH PASS</div>
            <DeviceBar v-model="barValue" :count="30" :width="120" />
            <span class="w-36 font-pixelsm text-[7pt] text-muted-foreground uppercase">
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
              class="uppercase font-pixelsm text-[7pt] text-muted-foreground"
              @finish="nextOfflineText" />
          </div>
        </TransitionGroup>
      </div>
      <Transition name="fade-delayed">
        <button
          v-if="store.connected"
          class="rounded-full outline-2 absolute h-[41.5%] top-[24.5%] aspect-square left-0 right-0 mx-auto transition-all"
          :class="{'outline outline-white': store.selectedFeature==='knob',
        'hover:outline outline-zinc-400': store.selectedFeature!=='knob'}"
          @click="store.selectConfigFeature('knob')" />
      </Transition>
      <Transition name="fade-delayed">
        <DeviceKeys
          v-if="store.connected"
          class="absolute w-[72.7%] top-[77.5%] gap-[2.2%] left-0 right-0 mx-auto"
          :selected="store.selectedFeature === 'key' ? store.selectedKey : ''"
          @select="store.selectKey" />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import RenderNanoOne from '@renderer/assets/images/renderNanoOneTransparent.png'
import RenderNanoZero from '@renderer/assets/images/renderNanoZeroTransparent.png'
import LogoMidi from '@renderer/assets/logos/logoMidi.svg'
import DeviceBar from '@renderer/components/device/DeviceBar.vue'
import { useStore } from '@renderer/store'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { computed, onMounted, ref } from 'vue'
import DeviceLEDRing from '@renderer/components/device/DeviceLEDRing.vue'
import gsap from 'gsap'
import DeviceKeys from '@renderer/components/device/DeviceKeys.vue'

const value = ref(69)

const barValue = computed(() => value.value / 127 * 100)

const store = useStore()

const previewDeviceImages = {
  nanoOne: RenderNanoOne,
  nanoZero: RenderNanoZero,
}

const previewDeviceImage = computed(() => previewDeviceImages[store.previewDeviceModel || 'nanoOne'])

const targetValue = ref(69)
const animateValue = () => {
  targetValue.value = Math.floor(Math.random() * 127)
  gsap.to(value, { duration: 1, value: targetValue.value, ease: 'power2.inOut' })
  setTimeout(animateValue, 1500 + Math.random() * 2000)
}

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
  'NO DEVICE CONNECTED',
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

onMounted(() => {
  animateValue()
})
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