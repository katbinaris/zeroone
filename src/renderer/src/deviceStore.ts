import { defineStore } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { useAppStore } from '@renderer/appStore'
import { randomName } from '@renderer/randomName'

// Generated from https://github.com/katbinaris/NanoD_RatchetH1/blob/runger/communications.md
// Using https://app.quicktype.io/
// WARNING: The tool does 80% of the work, but you need to make sure the types are correct
export interface Profile {
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
  guiEnable: boolean
  keys: Key[]
  knob: Value[]
}

export interface Key {
  pressed?: Action[]
  released?: Action[]
  held?: Action[]
}

export interface Action {
  type: string
  keyCodes?: number[]
  channel?: number
  cc?: number
  val?: number
  buttons?: number
}

export interface Value {
  keyState: number
  angleMin: number
  angleMax: number
  valueMin: number
  valueMax: number
  step: number
  wrap: boolean
  type: string
  channel: number
  cc: number
  haptic: HapticSettings
}

export interface HapticSettings {
  mode: number
  startPos: number
  endPos: number
  detentCount: number
  vernier: number
  kxForce: number
  outputRamp: number
  detentStrength: number
}

export interface DeviceSettings {
  debug: boolean
  ledMaxBrightness: number
  maxVelocity: number
  maxVoltage: number
  deviceOrientation: number
  deviceName: string
  serialNumber: string
  firmwareVersion: string
  midiUsb: MidiSettings
  midi2: MidiSettings
  idleTimeout: number
}

export interface MidiSettings {
  in: boolean
  out: boolean
  thru: boolean
  route: boolean
  nano: boolean
}

interface UpdateData {
  idle: number | undefined
  p: number | undefined
  profiles: string[] | undefined
  current: string | undefined
  profile: Profile | undefined
  ks: number | undefined
  kd: number | undefined
  ku: number | undefined
  settings: DeviceSettings | undefined
  error: string | undefined // TODO: Error messages have eventid 'update', change this once it's fixed
}

const { nanoIpc } = window

const messageCallbacks: ((title: string, message: string) => void)[] = []

export const useDeviceStore = defineStore('device', {
  state: () => ({
    attachedDeviceIds: [] as string[], // list of attached device ids
    currentDeviceId: null as string | null, // id of the current device
    profileNames: [] as string[], // list of profile names
    profiles: [] as Profile[], // list of profiles
    currentProfileName: null as string | null, // name of the current profile
    settings: null as DeviceSettings | null, // settings of the device
    dirtyState: false as boolean, // whether the device state has changed
    position: 0 as number, // current position of the knob
    velocity: 0 as number, // velocity of the knob
    keyLabels: ['a', 'b', 'c', 'd'] as string[], // labels for the keys
    keyStates: {} as Record<string, boolean>, // state of the keys (true if pressed)
    defaultKnobValue: {
      keyState: 0,
      angleMin: 0,
      angleMax: 360,
      valueMin: 0,
      valueMax: 127,
      step: 1,
      wrap: true,
      type: 'midi',
      channel: 1,
      cc: 1,
      haptic: {
        mode: 0,
        startPos: 0,
        endPos: Math.PI * 2,
        detentCount: 10,
        vernier: 10
      }
    } as Value,
    orientationLabels: [270, 0, 90, 180]
  }),
  getters: {
    connected: (state) => state.currentDeviceId !== null,
    currentProfile: (state): Profile | null =>
      state.profiles.find((profile) => profile.name === state.currentProfileName) || null,
    profileTags: (state) => [...new Set(state.profiles.map((profile) => profile.profileTag))],
    profilesByTag: (state) =>
      state.profiles.reduce((acc, profile) => {
        if (!acc[profile.profileTag]) {
          acc[profile.profileTag] = []
        }
        acc[profile.profileTag].push(profile)
        return acc
      }, {}),
    keyColor: (state) => (key: string, pressed: boolean) => {
      const propertyName = `button${key.toUpperCase()}${pressed ? 'Press' : 'Idle'}`
      return state.currentProfile ? state.currentProfile[propertyName] : 0
    },
    keyActions: (state) => (key: string) => {
      const keyIndex = state.keyLabels.indexOf(key)
      return (
        state.currentProfile?.keys[keyIndex] ||
        ({
          pressed: [],
          released: [],
          held: []
        } as Key)
      )
    },
    keyState: (state) => {
      // Calculate the key state number from the key states
      let keyState = 0
      if (state.keyStates.a) keyState += 1
      if (state.keyStates.b) keyState += 2
      if (state.keyStates.c) keyState += 4
      if (state.keyStates.d) keyState += 8
      return keyState
    },
    activeValue: (state) => {
      return state.currentProfile?.knob.find((value) => value.keyState === state.keyState) ||
        state.currentProfile?.knob.length > 0
        ? state.currentProfile?.knob[0]
        : null
    }
  },
  actions: {
    setAttachedDeviceIds(deviceIds: string[]) {
      this.attachedDeviceIds = deviceIds
    },
    attachDevice(deviceId: string) {
      if (!this.attachedDeviceIds.includes(deviceId)) {
        this.attachedDeviceIds.push(deviceId)
      }
    },
    selectProfile(profileName: string, updateDevice: boolean = true) {
      this.currentProfileName = profileName
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ current: profileName }))
        this.setDirtyState(true)
      }
    },
    createProfile() {
      let name = randomName()
      let count = 0
      while (this.profileNames.includes(name) && count < 10) {
        name = randomName()
        count++
      }
      if (this.profileNames.includes(name)) {
        let index = 0
        while (this.profileNames.includes(`name (${index})`)) {
          index++
        }
        name = `name (${index})`
      }
      nanoIpc.send(this.currentDeviceId!, JSON.stringify({ profile: name }))
      this.selectProfile(name)
      this.setDirtyState(true)
    },
    addProfile(profile: Profile, updateDevice: boolean = true) {
      if (!this.profileNames.includes(profile.name)) {
        this.profileNames.push(profile.name)
      }
      const existingProfile = this.profiles.find((p) => p.name === profile.name)
      if (existingProfile) {
        Object.assign(existingProfile, profile)
      } else {
        this.profiles.push(profile)
      }
      if (updateDevice) {
        const newProfile = JSON.parse(JSON.stringify(profile))
        delete newProfile.name
        console.log('Sending new profile:', newProfile)
        console.log('with name', profile.name)
        nanoIpc.send(
          this.currentDeviceId!,
          JSON.stringify({ profile: profile.name, updates: newProfile })
        )
        this.setDirtyState(true)
      }
    },
    renameProfile(oldName: string, newName: string, updateDevice: boolean = true) {
      if (this.profileNames.includes(newName)) {
        console.error('Profile name already exists:', newName)
      }
      const profile = this.profiles.find((p) => p.name === oldName)
      if (profile) {
        profile.name = newName
        if (updateDevice) {
          nanoIpc.send(
            this.currentDeviceId!,
            JSON.stringify({ profile: oldName, updates: { name: newName } })
          )
        }
        this.setDirtyState(true)
      }
    },
    deleteProfile(profileName: string, updateDevice: boolean = true) {
      const index = this.profileNames.indexOf(profileName)
      if (index !== -1) {
        this.profileNames.splice(index, 1)
      }
      const profile = this.profiles.find((p) => p.name === profileName)
      if (profile) {
        const profileIndex = this.profiles.indexOf(profile)
        this.profiles.splice(profileIndex, 1)
      }
      if (this.currentProfileName === profileName && this.profileNames.length > 0) {
        this.selectProfile(this.profileNames[0], updateDevice)
      }
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ profiles: this.profileNames }))
        this.setDirtyState(true)
      }
    },
    duplicateProfile(profileName: string, updateDevice: boolean = true) {
      const profile = this.profiles.find((p) => p.name === profileName)
      if (profile) {
        const newProfile = JSON.parse(JSON.stringify(profile))
        newProfile.name = profileName + ' Copy'
        this.addProfile(newProfile, updateDevice)
        if (this.currentProfileName === profileName) {
          this.selectProfile(newProfile.name, updateDevice)
        }
        this.setDirtyState(true)
      }
    },
    updateProfileDescription(
      profileName: string,
      description: string,
      updateDevice: boolean = true
    ) {
      const profile = this.profiles.find((p) => p.name === profileName)
      if (profile) {
        profile.desc = description
        if (updateDevice) {
          nanoIpc.send(
            this.currentDeviceId!,
            JSON.stringify({ profile: profileName, updates: { desc: description } })
          )
          this.setDirtyState(true)
        }
      }
    },
    detachDevice(deviceId: string) {
      const index = this.attachedDeviceIds.indexOf(deviceId)
      if (index !== -1) {
        this.attachedDeviceIds.splice(index, 1)
      }
    },
    connectDevice(deviceId: string | undefined = undefined, updateDevice: boolean = true) {
      if (deviceId) {
        this.currentDeviceId = deviceId
        this.setDirtyState(false)
        if (updateDevice) {
          nanoIpc.connect(deviceId)
        }
      } else if (this.attachedDeviceIds.length > 0) {
        this.connectDevice(this.attachedDeviceIds[0])
      }
    },
    disconnectDevice(deviceId: string, updateDevice: boolean = true) {
      this.currentDeviceId = null
      this.setDirtyState(false)
      if (updateDevice) {
        nanoIpc.disconnect(deviceId)
      }
    },
    setDirtyState(dirty: boolean) {
      this.dirtyState = dirty
    },
    saveChangesOnDevice() {
      nanoIpc.send(this.currentDeviceId!, JSON.stringify({ save: true }))
      this.setDirtyState(false)
    },
    setSettings(settings: DeviceSettings, updateDevice: boolean = true) {
      this.settings = settings
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ settings }))
        this.setDirtyState(true)
      }
    },
    setProfileNames(profileNames: string[], updateDevice: boolean = true) {
      this.profileNames = profileNames
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ profiles: profileNames }))
        this.setDirtyState(true)
      }
    },
    setCurrentProfile(profileName: string, updateDevice: boolean = true) {
      this.currentProfileName = profileName
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ current: profileName }))
        this.setDirtyState(true)
      }
    },
    setOrientation(orientation: number, updateDevice: boolean = true) {
      this.settings!.deviceOrientation = orientation
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ settings: { deviceOrientation: orientation } })
        )
        this.setDirtyState(true)
      }
    },
    cycleOrientation() {
      this.setOrientation((this.settings!.deviceOrientation + 1) % this.orientationLabels.length)
    },
    setIdleTimeout(timeout: number, updateDevice: boolean = true) {
      this.settings!.idleTimeout = timeout
      if (updateDevice) {
        sendDebounced(this.currentDeviceId!, JSON.stringify({ settings: { idleTimeout: timeout } }))
        this.setDirtyState(true)
      }
    },
    cycleIdleTimeout() {
      if (this.settings!.idleTimeout === 0) {
        this.setIdleTimeout(10000)
      } else if (this.settings!.idleTimeout === 10000) {
        this.setIdleTimeout(30000)
      } else if (this.settings!.idleTimeout === 30000) {
        this.setIdleTimeout(60000)
      } else {
        this.setIdleTimeout(0)
      }
    },
    setPosition(position: number) {
      this.position = position
    },
    setKeyColor(key: string, pressed: boolean, color: number, updateDevice: boolean = true) {
      const propertyName = `button${key.toUpperCase()}${pressed ? 'Press' : 'Idle'}`
      this.currentProfile![propertyName] = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { [propertyName]: color } })
        )
        this.setDirtyState(true)
      }
    },
    setPrimaryColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.primary = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { primary: color } })
        )
        this.setDirtyState(true)
      }
    },
    setSecondaryColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.secondary = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { secondary: color } })
        )
        this.setDirtyState(true)
      }
    },
    setPointerColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.pointer = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { pointer: color } })
        )
        this.setDirtyState(true)
      }
    },
    setKeyPressedActions(key: string, actions: Action[], updateDevice: boolean = true) {
      const keyIndex = this.keyLabels.indexOf(key)
      this.currentProfile!.keys[keyIndex].pressed = actions
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { keys: this.currentProfile!.keys }
          })
        )
        this.setDirtyState(true)
      }
    },
    setKeyReleasedActions(key: string, actions: Action[], updateDevice: boolean = true) {
      const keyIndex = this.keyLabels.indexOf(key)
      this.currentProfile!.keys[keyIndex].released = actions
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { keys: this.currentProfile!.keys }
          })
        )
        this.setDirtyState(true)
      }
    },
    setKeyHeldActions(key: string, actions: Action[], updateDevice: boolean = true) {
      const keyIndex = this.keyLabels.indexOf(key)
      this.currentProfile!.keys[keyIndex].held = actions
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { keys: this.currentProfile!.keys }
          })
        )
        this.setDirtyState(true)
      }
    },
    setKnobValues(values: Value[], updateDevice: boolean = true) {
      this.currentProfile!.knob = values
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { knob: values } })
        )
        this.setDirtyState(true)
      }
    },
    addKnobValue(value: Value | null = null, updateDevice: boolean = true) {
      if (!value) {
        value = JSON.parse(JSON.stringify(this.defaultKnobValue)) as Value
        let lowestKeyState = 0
        this.currentProfile!.knob.forEach((v) => {
          if (v.keyState > lowestKeyState) {
            lowestKeyState = v.keyState
          }
        })
        value.keyState = (lowestKeyState + 1) % 16
      }
      this.currentProfile!.knob.push(value)
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { knob: this.currentProfile!.knob }
          })
        )
        this.setDirtyState(true)
      }
    },
    removeKnobValue(index: number, updateDevice: boolean = true) {
      this.currentProfile!.knob.splice(index, 1)
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { knob: this.currentProfile!.knob }
          })
        )
        this.setDirtyState(true)
      }
    },
    updateKnobValueParameter(index: number, updates: object, updateDevice: boolean = true) {
      Object.assign(this.currentProfile!.knob[index], updates)
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { knob: this.currentProfile!.knob }
          })
        )
        this.setDirtyState(true)
      }
    },
    updateKeyActionParameter(index: number, updates: object, updateDevice: boolean = true) {
      Object.assign(this.currentProfile!.keys[index], updates)
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { keys: this.currentProfile!.keys }
          })
        )
        this.setDirtyState(true)
      }
    },
    setHapticOutputRamp(value: number, updateDevice: boolean = true) {
      this.currentProfile!.knob.forEach((v) => {
        v.haptic.outputRamp = value
      })
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({
            profile: this.currentProfileName,
            updates: { knob: this.currentProfile!.knob }
          })
        )
        this.setDirtyState(true)
      }
    }
  }
})

const sendDebounced = useDebounceFn((deviceid, jsonstr) => nanoIpc.send(deviceid, jsonstr), 5, {
  maxWait: 10
})

export const initializeDevices = () => {
  const deviceStore = useDeviceStore()
  const appStore = useAppStore()

  // register event handlers
  nanoIpc.on((eventid, deviceid, dataString) => {
    //console.log('Received event', eventid, deviceid, dataString)
    if (eventid === 'error' || (eventid === 'update' && dataString.includes('error'))) {
      // TODO: Error messages have eventid 'update', change this once it's fixed
      const data = JSON.parse(dataString) as UpdateData
      if (data.error) {
        messageCallbacks.forEach((callback) => callback('Error', data.error as string))
        console.error('Error:', data.error)
      }
    }
    if (eventid === 'saved') {
      deviceStore.setDirtyState(false)
      messageCallbacks.forEach((callback) => callback('Saved', 'Changes saved to device'))
    }
    if (eventid === 'device-attached') {
      deviceStore.attachDevice(deviceid)
      console.log('Attached device', deviceid)
      if (deviceStore.attachedDeviceIds.length === 1) {
        deviceStore.connectDevice(deviceid)
      }
    }
    if (eventid === 'device-detached') {
      deviceStore.detachDevice(deviceid)
      console.log('Detached device', deviceid)
    }
    if (eventid === 'connected') {
      deviceStore.connectDevice(deviceid, false)
      console.log('Connected device', deviceid)
      nanoIpc.send(deviceid, JSON.stringify({ profiles: '#all', settings: '?' }))
    }
    if (eventid === 'disconnected') {
      deviceStore.disconnectDevice(deviceid, false)
      console.log('Disconnected device', deviceid)
    }
    if (eventid === 'update') {
      let update: UpdateData = {} as UpdateData
      if (dataString) {
        try {
          update = JSON.parse(dataString) as UpdateData
        } catch (e) {
          console.error('Failed to parse update data:', e, dataString)
        }
      }
      if (!update.idle && !update.p && !update.ks) {
        console.log('Received update:', update)
      }
      if (update.p !== undefined) {
        deviceStore.setPosition(update.p)
        appStore.selectConfigFeature('knob')
      }
      if (update.kd !== undefined) {
        const keyLabel = deviceStore.keyLabels[update.kd]
        deviceStore.keyStates[keyLabel] = true
        appStore.selectKey(keyLabel)
      }
      if (update.ku !== undefined) {
        deviceStore.keyStates[deviceStore.keyLabels[update.ku]] = false
      }
      if (update.profiles !== undefined) {
        deviceStore.setProfileNames(update.profiles, false)
        for (const profileName of update.profiles) {
          console.log('Requesting profile', profileName)
          nanoIpc.send(deviceid, JSON.stringify({ profile: profileName }))
        }
      }
      if (update.current !== undefined) {
        deviceStore.setCurrentProfile(update.current, false)
      }
      if (update.profile !== undefined) {
        deviceStore.addProfile(update.profile, false)
      }
      if (update.settings !== undefined) {
        deviceStore.setSettings(update.settings, false)
      }
    }
  })

  // get initial device list
  nanoIpc.listAttachedDevices().then((deviceIds) => {
    deviceStore.setAttachedDeviceIds(deviceIds)
    if (!deviceStore.connected && deviceIds.length > 0) {
      nanoIpc.connect(deviceIds[0]).catch((e) => {
        console.error(e)
        console.log('Serial port might still be open, requesting profiles...')
        deviceStore.connectDevice(deviceIds[0], false)
        nanoIpc.send(deviceIds[0], JSON.stringify({ profiles: '#all', settings: '?' }))
      })
    }
  })
}

export const onDeviceMessage = (callback: (title: string, message: string) => void) => {
  messageCallbacks.push(callback)
}
