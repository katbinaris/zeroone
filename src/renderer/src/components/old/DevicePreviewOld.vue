<template>
  <div>
    <div class="flex px-4 pt-5 pb-3 items-baseline font-heading">
      <span class="text-lg">{{ $t('preview.title') }}</span>
      &nbsp;
      <span class="text-zinc-600">(Nano_D++)</span>
    </div>
    <div class="flex justify-center">
      <div
        class="flex bg-cover mb-6 w-72 aspect-square"
        style="background-image: url(../../assets/old/xl-bg-ico.svg)">
        <div class="flex flex-col w-full justify-center m-9 rounded-full overflow-hidden">
          <div class="self-center w-8 mb-1 opacity-50">
            <img src="../../assets/logos/logoMidi.svg" alt="midi-logo">
          </div>
          <h2 class="self-center font-pixellg text-5xl ">1337</h2>
          <div class="self-center font-pixelsm text-md pt-1 pb-2">Profile name</div>
          <DeviceBar class="self-center" />
          <span
            class="self-center text-center w-48 font-pixelsm text-xs text-muted-foreground">
            Profile description will go here! And hopefully it will be a long one! Much longer than this one! Actually, this is probably long enough. I don't think we need to make it any longer...
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DeviceBar from '@renderer/components/device/DeviceBar.vue'
import DeviceBackground from '@renderer/assets/old/xl-bg-ico.svg'
</script>