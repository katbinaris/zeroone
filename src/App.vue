<script setup>
import ProfileManager from '@/components/ProfileManager.vue'
import DevicePreview from '@/components/device/DevicePreview.vue'
import ConfigPane from '@/components/config/ConfigPane.vue'
import Navbar from '@/components/Navbar.vue'
import ConfigSelect from '@/components/config/ConfigSelect.vue'
import { ref } from 'vue'
import ConfigSection from '@/components/config/ConfigSection.vue'
import { Bolt } from 'lucide-vue-next'

const currentConfigPage = ref('profile_settings')

</script>
<template>
  <main class="select-none">
    <Navbar />
    <div class="flex flex-row">
      <ProfileManager class="border-solid border-0 border-r bg-zinc-900 bg-opacity-30" style="width: 20rem" />
      <div class="border-solid border-0 border-r" style="width: 25rem">
        <DevicePreview />
        <ConfigSection :title="$t('config_options.title')" :foldable="false" :icon-component="Bolt">
          <ConfigSelect v-model="currentConfigPage" />
        </ConfigSection>
      </div>
      <ConfigPane
        :page="currentConfigPage"
        class="border-solid border-0 border-r bg-zinc-900 bg-opacity-30" />
    </div>
  </main>
</template>