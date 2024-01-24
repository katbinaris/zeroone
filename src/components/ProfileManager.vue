<template>
  <div>
    <div
      class="px-4 h-20 flex items-center"
      @mouseenter="$refs.configPaneTitle.scramble(0.15, 100)">
      <div>
        <h1 class="text-lg">
          <ScrambleText ref="configPaneTitle" class="align-middle" :text="$t(`profiles.title`)" />
        </h1>
        <p class="text-xs text-muted-foreground">
          {{ $t(`profiles.subtitle`) }}
        </p>
      </div>
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