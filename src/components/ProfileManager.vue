<template>
  <div>
    <div class="p-4">
      <h1 class="text-lg">
        <ScrambleReveal :text="$t('profiles.title')" />
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ $t('profiles.subtitle') }}
      </p>
    </div>
    <Separator />
    <Pop />
  </div>
</template>
<script>
import Pop from '@/components/patterns/Pop.vue'
import ScrambleReveal from '@/components/ScrambleText.vue'
import { Separator } from '@/components/ui/separator/index.js'

export default {
  name: 'ProfileManager',
  components: { Separator, Pop, ScrambleReveal },
}
</script>