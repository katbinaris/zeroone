<script setup>
import ProfileManager from '@/components/ProfileManager.vue'
import DevicePreview from '@/components/device-gui/DevicePreview.vue'
import ConfigPane from '@/components/ConfigPane.vue'
import Navbar from '@/components/Navbar.vue'
import ConfigSelect from '@/components/ConfigSelect.vue'
import { ref } from 'vue'

const currentConfigPage = ref('program_settings')

</script>
<template>
  <main class="select-none">
    <Navbar />
    <div class="flex flex-row">
      <ProfileManager class="border-solid border-0 border-r bg-zinc-900 bg-opacity-30" style="width: 20rem"/>
      <div class="border-solid border-0 border-r" style="width: 25rem">
        <DevicePreview />
        <ConfigSelect v-model="currentConfigPage" />
      </div>
      <ConfigPane
        :page="currentConfigPage"
        class="border-solid border-0 border-r bg-zinc-900 bg-opacity-30"/>
    </div>
  </main>
</template>