<script setup>
import ProfileManager from '@/components/profile/ProfileManager.vue'
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
    <div class="grid grid-cols-11">
      <ProfileManager class="col-span-3 border-solid border-0 border-r bg-zinc-900 bg-opacity-30" />
      <div class="col-span-4 border-solid border-0 border-r">
        <DevicePreview />
        <ConfigSection :title="$t('config_options.title')" :foldable="false" :icon-component="Bolt">
          <ConfigSelect v-model="currentConfigPage" />
        </ConfigSection>
      </div>
      <ConfigPane
        class="col-span-4 border-solid border-0 border-r bg-zinc-900 bg-opacity-30"
        :page="currentConfigPage" />
    </div>
  </main>
</template>