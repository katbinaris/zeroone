<template>
  <div class="aspect-[800/1100]">
    <div
      class="bg-contain bg-top bg-no-repeat h-full w-full relative"
      :style="{backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.2) 10%), url(${RenderNano})`}">
      <div class="flex px-4 pt-5 pb-3 items-baseline font-heading text-lg">
        {{ $t('preview.title') }}
      </div>
      <div
        class="rounded-full aspect-square absolute h-[30%] top-[30.5%]  left-0 right-0 mx-auto flex flex-col justify-center items-center overflow-hidden"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)">
        <div class="flex flex-col items-center text-center pb-2 mix-blend-screen">
          <img :src="LogoMidi" alt="midi-logo" class="opacity-50 h-4">
          <h2 class="font-pixellg text-5xl">101</h2>
          <div class="font-pixelsm text-md">HIGH PASS</div>
          <DeviceBar />
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
</script>