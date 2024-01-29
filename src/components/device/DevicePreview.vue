<template>
  <div>
    <div class="px-4 py-5">
      <h1 class="text-lg">
        {{ $t('preview.title') }}
      </h1>
    </div>
    <div class="flex justify-center">
      <div
        class="flex bg-cover m-6 w-full aspect-square"
        style="background-image: url(src/assets/gui-ico/xl-bg-ico.svg)">
        <div class="flex flex-col w-full justify-center p-10 rounded-full overflow-hidden">
          <div class="self-center w-8 mb-1 opacity-50">
            <img src="@/assets/gui-ico/ico-midi-logo.svg" alt="midi-logo">
          </div>
          <h2 class="self-center font-pixellg text-5xl ">1337</h2>
          <div class="self-center font-pixelsm text-md pt-1 pb-2">Profile name</div>
          <DeviceBar class="self-center" />
          <span
            class="self-center text-center w-48 font-pixelsm text-xs text-muted-foreground">
            Profile description will go here!
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DeviceBar from '@/components/device/DeviceBar.vue'
</script>