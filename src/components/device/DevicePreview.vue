<template>
  <div class="aspect-[800/1100]">
    <div
      class="bg-contain bg-top bg-no-repeat h-full w-full relative"
      :style="{backgroundImage: `linear-gradient(to bottom, black, rgba(0,0,0,0.2) 10%), url(${RenderNano})`}">
      <div class="flex px-4 pt-5 pb-3 items-baseline font-heading text-lg">
        {{ $t('preview.title') }}
      </div>
      <div
        class="rounded-full aspect-square absolute h-[30%] top-[30.5%]  left-0 right-0 mx-auto overflow-hidden"
        style="background: linear-gradient(45deg, black 30%, #252525 50%, #232323 60%, black)" />
    </div>
  </div>
</template>
<script setup>
import RenderNano from '@/assets/images/renderNano.png'
</script>