<template>
  <div>
    <div
      class="px-4 h-20 flex items-center">
      <div>
        <h1 class="text-lg">
          {{ $t(`profiles.title`) }}
        </h1>
        <p class="text-xs text-muted-foreground">
          {{ $t(`profiles.subtitle`) }}
        </p>
      </div>
    </div>
    <Separator />
    <div>
      <MagnifyingGlassIcon class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <Input :placeholder="$t('profiles.filter_placeholder')" class="border-none outline-none rounded-none" />
    </div>
    <SchemaTest />
  </div>
</template>
<script setup>
import SchemaTest from '@/components/SchemaTest.vue'
import { Separator } from '@/components/ui/separator/index.js'
import { Input } from '@/components/ui/input'
import { FileDigit } from 'lucide-vue-next'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { MagnifyingGlassIcon } from '@radix-icons/vue'

const profiles = ref([])

const profilesByTag = computed(() => {
  const map = new Map()
  profiles.value.forEach(profile => {
    const tag = profile.profileTag || 'Uncategorized'
    if (!map.has(tag)) {
      map.set(tag, [])
    }
    map.get(tag).push(profile)
  })
  return map
})

function fetchProfiles() {
  axios.get('http://localhost:3001/profiles').then(res => {
    profiles.value = res.data
  }).catch(err => {
    console.error(err)
  })
}

onMounted(() => {
  fetchProfiles()
})
</script>