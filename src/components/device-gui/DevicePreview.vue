<template>
  <div>
    <div>
      <div class="px-4 py-5">
        <h1 class="text-lg">
          {{ $t('preview.title')}}
        </h1>
      </div>
      <div class="flex justify-center">
        <div
          class="flex bg-cover w-72 h-72 mb-7"
          style="background-image: url(src/assets/gui-ico/xl-bg-ico.svg)">
          <div v-if="profiles" class="flex flex-col w-full justify-center p-10 rounded-full overflow-hidden">
            <div class="self-center w-8 mb-1 opacity-50">
              <img src="@/assets/gui-ico/ico-midi-logo.svg" alt="midi-logo">
            </div>
            <h2 v-for="feedbackConfig in profiles" :key="feedbackConfig" class="self-center font-pixellg text-5xl ">
              {{ feedbackConfig.pos }}</h2>

            <div class="self-center font-pixelsm text-md pt-1 pb-2">{{ profiles.name }}</div>
            <DeviceBar class="self-center"/>
            <div id="scales" class="flex self-center text-xs py-0" />

            <div
              v-for="profileConfig in profiles"
              :key="profileConfig"
              class="self-center text-center text-muted-foreground font-pixelsm text-xs pt-0.5 w-40">
              {{ profileConfig.profileDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
      <h2>{{ $t('config_options.title') }}</h2>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import DeviceBar from '@/components/device-gui/DeviceBar.vue'

export default {
  name: 'DevicePreview',
  components: { DeviceBar },
  data() {
    return {
      profiles: [],
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3001/profiles/5867')
      this.profiles = res.data
    } catch (e) {
      console.error(e)
    }
  },
}
</script>