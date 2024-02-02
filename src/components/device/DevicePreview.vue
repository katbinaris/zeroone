<template>
  <div class="aspect-[800/1100]">
    <div
      class="bg-contain bg-top bg-no-repeat h-full w-full relative"
      :style="{backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.2) 95%, black), url(${RenderNano})`}">
      <div class="px-4 h-12 flex justify-between items-center">
        <h2>
          {{ $t('preview.title') }}
        </h2>
        <div v-if="store.selectedProfile" class="font-mono text-sm">
          <span class="text-muted-foreground">Profile: </span>
          <ScrambleText :text="store.selectedProfile.name" />
        </div>
      </div>
      <div
        class="rounded-full aspect-square absolute h-[30%] top-[30.5%]  left-0 right-0 mx-auto flex flex-col justify-center items-center overflow-hidden"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)">
        <div class="flex flex-col items-center text-center pb-2 mix-blend-screen">
          <img :src="LogoMidi" alt="midi-logo" class="opacity-50 h-4">
          <h2 class="font-pixellg text-5xl">{{ value }}</h2>
          <div class="font-pixelsm text-md">HIGH PASS</div>
          <DeviceBar v-model="value" :count="30" :width="120" />
          <span
            class="w-36 font-pixelsm text-[7pt] text-muted-foreground">
            KORG MINILOGUE HIGH PASS FILTER 0-127
        </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import RenderNano from '@/assets/images/renderNano.png'
import LogoMidi from '@/assets/logos/logoMidi.svg'
import DeviceBar from '@/components/device/DeviceBar.vue'
import { useStore } from '@/store'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { ref } from 'vue'

const value = ref(69)

const store = useStore()
</script>