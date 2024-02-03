<template>
  <div class="aspect-[800/1100]">
    <div
      class="bg-contain bg-top bg-no-repeat h-full w-full relative"
      :style="{backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.3) 95%, black), url(${RenderNano})`}">
      <div class="px-4 h-12 flex justify-center items-center">
        <div v-if="store.selectedProfile" class="font-mono text-sm">
          <span class="text-muted-foreground">Profile: </span>
          <ScrambleText :text="store.selectedProfile.name" />
        </div>
      </div>
      <DeviceLEDRing :value="barValue" class="absolute h-[66%] top-[12.5%] left-0 right-0 mx-auto" />
      <div
        class="rounded-full aspect-square absolute h-[30%] top-[30.5%] left-0 right-0 mx-auto flex flex-col justify-center items-center overflow-hidden"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)">
        <div class="flex flex-col items-center text-center pb-2 mix-blend-screen">
          <img :src="LogoMidi" alt="midi-logo" class="opacity-50 h-4">
          <h2 class="font-pixellg text-5xl">{{ parseInt(value) }}</h2>
          <div class="font-pixelsm text-md">HIGH PASS</div>
          <DeviceBar v-model="barValue" :count="30" :width="120" />
          <span
            class="w-36 font-pixelsm text-[7pt] text-muted-foreground">
            KORG MINILOGUE HIGH PASS FILTER 0-127
        </span>
        </div>
      </div>
      <div
        class="rounded-full outline-2 absolute h-[41.5%] top-[24.5%] aspect-square left-0 right-0 mx-auto"
        :class="{'outline outline-white': selected==='ring',
        'hover:outline outline-zinc-400': selected!=='ring'}"
        @click="selected='ring'" />
      <DeviceKeys
        :selected="selected" class="absolute w-[72.7%] top-[77.2%] gap-[2.8%] left-0 right-0 mx-auto"
        @select="args => selected=args" />
    </div>
  </div>
</template>
<script setup>
import RenderNano from '@/assets/images/renderNano.png'
import LogoMidi from '@/assets/logos/logoMidi.svg'
import DeviceBar from '@/components/device/DeviceBar.vue'
import { useStore } from '@/store'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { computed, onMounted, ref } from 'vue'
import DeviceLEDRing from '@/components/device/DeviceLEDRing.vue'
import gsap from 'gsap'
import DeviceKeys from '@/components/device/DeviceKeys.vue'

const selected = ref('a')

const value = ref(69)

const barValue = computed(() => value.value / 127 * 100)

const store = useStore()

const targetValue = ref(69)
const animateValue = () => {
  targetValue.value = Math.floor(Math.random() * 127)
  gsap.to(value, { duration: 1, value: targetValue.value, ease: 'power2.inOut' })
  setTimeout(animateValue, 1500 + Math.random() * 2000)
}

onMounted(() => {
  animateValue()
})
</script>