import { computed, reactive } from 'vue'

export const store = reactive({
  device: {
    profiles: [],
    activeProfileId: null,
    activeProfile: computed(() => {
      return store.device.profiles.find(p => p.id === store.device.activeProfileId)
    }),
  },
  currentProfileId: null,
  currentProfile: computed(() => {
    return store.device.profiles.find(p => p.id === store.currentProfileId)
  }),
})