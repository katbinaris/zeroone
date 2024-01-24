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
    <div>
      <input
        type="text"
        aria-label="Add Profile"
        placeholder="Profile name"
        @keyup.enter="addNewProfile"
      >
      <Command>

        <CommandList>

          <CommandInput placeholder="Search Profile..." />
          <CommandEmpty>No profile found :(</CommandEmpty>
          <CommandGroup v-for="(profileTag, index) in tags" :key="index" :heading="profileTag">
            <CommandItem
              v-for="(name, id, innerIndex) in names(profileTag)" :key="innerIndex" class="cursor-pointer"
              :value="name.id">
              <FileDigit color="grey" class="w-4 h-4 mr-2" />
              {{ name.name }} <span class="text-xs pl-2 text-muted-foreground text-right">uID: {{ name.id }} </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator />

      </Command>
    </div>
    <SchemaTest />
  </div>
</template>
<script setup>
import SchemaTest from '@/components/SchemaTest.vue'
import { Separator } from '@/components/ui/separator/index.js'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput, CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command/index.js'
import { FileDigit } from 'lucide-vue-next'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const profiles = ref([])

const tags = computed(() => {
  const tags = new Set()
  profiles.value.forEach(tag => tags.add(tag.profileTag))
  return Array.from(tags)
})

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/profiles')
    profiles.value = res.data
  } catch (e) {
    console.error(e)
  }
})

const names = (profileTag) => {
  return profiles.value
    .filter(tag => tag.profileTag === profileTag)
    .map(tag => ({ name: tag.name, id: tag.id }))
}

const addNewProfile = async (event) => {
  console.log(event)
  const res = await axios.post('http://localhost:3001/profiles',
    {
      name: "TODO: CHANGE THIS",
      profileTag: 'Uncategorized',
      profileConfig: {
        profileDesc: '',
        profileType: 1,
        showDesc: true,
      },
      feedbackConfig: {
        feedbackEn: true,
        feedbackType: 'fd',
        multiRev: false,
        feedbackStrength: 1,
        endstopStrength: 1,
        outputRamp: 10000,
        minMaxPos: [0, 156],
        secondaryHaptic: true,
        secondaryVol: 5,
      },
      mappingConfig: {
        internalMacro: false,
        knobMap: 'arrL',
        switchA: 'shift',
        switchB: 'ctrl',
        switchC: 'alt',
        switchD: 'esc',
      },
      ledConfig: {
        ledEnable: true,
        ledMode: 1,
        primary: {
          h: 100,
          s: 100,
          l: 100,
        },
        secondary: {
          h: 120,
          s: 120,
          l: 120,
        },
        pointer: {
          h: 255,
          s: 255,
          l: 255,
        },
      },
      guiConfig: {
        guiEnable: true,
      },
    })

  profiles.value = [...profiles.value, res.data]
}
</script>