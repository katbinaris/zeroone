<template>
  <div>
    <div>
      <div class="p-4">
        <h1 class="text-lg">
          <ScrambleReveal :text="$t('preview.title')" />
        </h1>
      </div>
      <QuickPreview />
    </div>
    <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">
      <h2>{{ $t('config_options.title') }}</h2>
    </div>
  </div>
</template>
<script>
import QuickPreview from '@/components/patterns/QuickPreview.vue'
import ScrambleReveal from '@/components/ScrambleText.vue'
import ConfigSelect from '@/ConfigSelect.vue'

export default {
  name: 'DevicePreview',
  components: { ConfigSelect, ScrambleReveal, QuickPreview },
}
</script>