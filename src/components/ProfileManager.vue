<template>
  <div>
    <div
      class="w-full px-4 h-20 flex items-center">
      <div>
        <h1 class="text-lg">
          {{ $t(`profiles.title`) }}<span class="text-sm text-zinc-600"> ({{ profiles.length }}/{{ maxProfiles
          }})</span>
        </h1>
        <p class="text-xs text-muted-foreground">
          {{ $t(`profiles.subtitle`) }}
        </p>
      </div>
    </div>
    <Separator />
    <div>
      <div class="flex w-full h-12 items-center">
        <label for="filter" class="flex h-full items-center cursor-text">
          <Search class="ml-4 mr-2 mb-0.5 h-4 w-4 shrink-0 opacity-50 float-left" />
        </label>
        <input
          id="filter"
          v-model="filter"
          :placeholder="$t('profiles.filter_placeholder')"
          class="grow h-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50">
        <button
          class="h-full flex text-zinc-200 bg-zinc-900 justify-center items-center aspect-square border-solid border-0 border-l hover:bg-zinc-800">
          <Plus />
        </button>
      </div>
      <Separator />
      <div v-if="filteredProfiles.length === 0">
        <div class="flex flex-col items-center justify-center h-32">
          <ScrambleText
            scramble-on-mount fill-interval="5" class="text-sm text-muted-foreground"
            :text="$t('profiles.not_found')" />
        </div>
      </div>
      <div>
        <Collapsible
          v-for="[profileTag, tagProfiles] in filteredProfilesByTag" :key="profileTag"
          v-model:open="collapse[profileTag]"
          :default-open="true">
          <CollapsibleTrigger
            class="w-full h-12 py-2 text-left text-muted-foreground text-sm hover:bg-zinc-900">
            <ChevronRight class="chevrot h-4 w-4 mb-0.5 ml-4 inline-block transition-transform" />
            {{ profileTag }}<span class="font-heading text-sm text-zinc-600"> ({{ tagProfiles.length }})</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ProfileButton
              v-for="(profile, index) in tagProfiles" :key="profile.id" v-model="tagProfiles[index]"
              :selected="currentProfileId===profile.id"
              @select="currentProfileId=profile.id"
              @duplicate="duplicateProfile(profile.id)"
              @delete="deleteProfile(profile.id)" />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Separator } from '@/components/ui/separator/index.js'
import { ChevronRight, Plus, Search } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { store } from '@/store.js'
import ProfileButton from '@/components/ProfileButton.vue'

const maxProfiles = 32

const profiles = computed({
  get: () => store.device.profiles,
  set: val => store.device.profiles = val,
})
const currentProfileId = computed({
  get: () => store.currentProfileId,
  set: val => store.currentProfileId = val,
})
const filter = ref('')
const collapse = ref({})

const filteredProfiles = computed(() => {
  if (!filter.value) {
    return profiles.value
  }
  const filterLower = filter.value.toLowerCase()
  return profiles.value.filter(profile => {
    const nameLower = profile.name.toLowerCase()
    const idLower = profile.id.toLowerCase()
    const tagLower = profile.profileTag.toLowerCase()
    return nameLower.includes(filterLower) || idLower.includes(filterLower) || tagLower.includes(filterLower)
  })
})

function newProfileId() {
  let id = ''
  do {
    id = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  } while (store.profileIds.includes(id))
  return id
}

function newProfileName(originalName) {
  let name = originalName
  let i = 1
  while (profiles.value.find(p => p.name === name)) {
    name = `${originalName}-${i++}`
  }
  return name
}

const duplicateProfile = (id) => {
  const profile = profiles.value.find(p => p.id === id)
  const profileIndex = profiles.value.indexOf(profile)
  const newProfile = JSON.parse(JSON.stringify(profile))
  newProfile.id = newProfileId()
  newProfile.name = newProfileName(profile.name)
  profiles.value.splice(profileIndex + 1, 0, newProfile)
}

const deleteProfile = (id) => {
  const profile = profiles.value.find(p => p.id === id)
  const profileIndex = profiles.value.indexOf(profile)
  profiles.value.splice(profileIndex, 1)
  if (currentProfileId.value === id && profiles.value.length > 0) {
    currentProfileId.value = profiles.value[0].id
  }
}

const filteredProfilesByTag = computed(() => {
  const map = new Map()
  filteredProfiles.value.forEach(profile => {
    const tag = profile.profileTag || 'Uncategorized'
    if (!map.has(tag)) {
      map.set(tag, [])
    }
    map.get(tag).push(profile)
  })
  return map
})

watch(profiles, () => {
  if (!currentProfileId.value && profiles.value.length > 0)
    currentProfileId.value = profiles.value[0].id
})

</script>
<style scoped>
[data-state=open] > .chevrot {
  transform: rotate(90deg);
}
</style>