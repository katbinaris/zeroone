import { reactive } from 'vue'

export const store = reactive({
  device: {
    profiles: [],
    activeProfile: null,
  },
  currentProfile: null,
})