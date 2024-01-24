<template>
  <div>
    <div class="p-4">
      <h1 class="text-lg">
        <ScrambleText :text="$t('profiles.title')" />
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ $t('profiles.subtitle') }}
      </p>
    </div>
    <Separator />
    <Pop />
    <DeviceBar />
    <SchemaTest />
  </div>
</template>
<script>
import Pop from '@/components/old/Pop.vue'
import ScrambleReveal from '@/components/effects/ScrambleText.vue'
import { Separator } from '@/components/ui/separator/index.js'
import SchemaTest from '@/components/SchemaTest.vue'
import DeviceBar from '@/components/device-gui/DeviceBar.vue'

export default {
  name: 'ProfileManager',
  components: { DeviceBar: DeviceBar, SchemaTest, Separator, Pop, ScrambleText: ScrambleReveal },
}
</script>