<script setup>
import ProfileManager from '@/components/ProfileManager.vue'
import DevicePreview from '@/DevicePreview.vue'
import ConfigPane from '@/ConfigPane.vue'
import Navbar from '@/Navbar.vue'
import ConfigSelect from '@/ConfigSelect.vue'
import { ref } from 'vue'

const currentConfigPage = ref('program_settings')

</script>
<template>
  <main class="select-none">
    <Navbar />
    <div class="flex flex-row">
      <ProfileManager class="border-solid border-0 border-r w-80 bg-zinc-900 bg-opacity-30" />
      <div class="border-solid border-0 border-r">
        <DevicePreview />
        <ConfigSelect v-model="currentConfigPage" />
      </div>
      <ConfigPane
        :page="currentConfigPage"
        class="border-solid border-0 border-r bg-zinc-900 bg-opacity-30" />
    </div>
  </main>
</template>