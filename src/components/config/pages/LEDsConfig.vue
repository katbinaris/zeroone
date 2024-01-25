<template>
  <TabsContent value="led-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <ConfigSection title="TODO: THINK OF TITLE" :icon-component="Lightbulb" />
      </ScrollArea>
    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Lightbulb } from 'lucide-vue-next'
import ConfigSection from '@/components/config/ConfigSection.vue'
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
</style>