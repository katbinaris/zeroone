import { defineStore } from 'pinia'

interface Profile {
  version: number
  name: string
  desc: string
  profileTag: string
  profileType: number
  profile_type: number
  position_num: number
  attract_distance: number
  feedback_strength: number
  bounce_strength: number
  haptic_click_strength: number
  output_ramp: number
  ledEnable: boolean
  ledBrightness: number
  ledMode: number
  pointer: number
  primary: number
  secondary: number
  buttonAIdle: number
  buttonBIdle: number
  buttonCIdle: number
  buttonDIdle: number
  buttonAPress: number
  buttonBPress: number
  buttonCPress: number
  buttonDPress: number
  internalMacro: boolean
  knobMap: string
  switchA: string
  switchB: string
  switchC: string
  switchD: string
  guiEnable: boolean
}

const { nanoSerialApi } = window

export const useDeviceStore = defineStore('device', {
  state: () => ({
    attachedDeviceIds: [] as string[], // list of attached device ids
    currentDeviceId: null as string | null, // id of the current device
    profileNames: [] as string[], // list of profile names
    profiles: {} as Record<string, Profile>, // map of profiles by name
    currentProfileName: null as string | null, // name of the current profile
    orientation: 0 as number, // orientation of the device
    dirtyState: false as boolean, // whether the device state has changed
    angle: 0 as number, // angle of the knob
    turns: 0 as number, // number of turns of the knob
    velocity: 0 as number, // velocity of the knob
    keyStates: {} as Record<string, boolean> // state of the keys (true if pressed)
  }),
  getters: {
    connected: (state) => state.currentDeviceId !== null,
    currentProfile: (state) =>
      state.currentProfileName ? state.profiles[state.currentProfileName] : null
  },
  actions: {
    setAttachedDeviceIds(deviceIds: string[]) {
      this.attachedDeviceIds = deviceIds
    },
    setConnected(connected: boolean) {
      // TODO: This is here for compatibility, but it should be removed
      // Real connect calls would need to know the last device id
      // Maybe that should be stored here
      // Then connect connects to the last device id of falls back to the first
    },
    setCurrentProfile(profileName: string, updateDevice: boolean = true) {
      this.currentProfileName = profileName
      if (updateDevice) {
        nanoSerialApi.send(this.currentDeviceId!, JSON.stringify({ current: profileName }))
      }
    },
    setOrientation(orientation: number, updateDevice: boolean = true) {
      this.orientation = orientation
      if (updateDevice) {
        // TODO: send orientation to device
        console.log('No orientation API message yet! Orientation:', orientation)
      }
    },
    cycleOrientation() {
      this.setOrientation((this.orientation + 90) % 360)
    }
  }
})
