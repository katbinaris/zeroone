export const useMessageHandlers = function (store) {
  return {
    handle_message: (jsonstr) => {
      const message = JSON.parse(jsonstr)
      if (message.hasOwnProperty('event')) {
        this.handle_event_message(message)
      }
      if (message.hasOwnProperty('p')) {
        this.handle_profile_message(message)
      }
      if (message.hasOwnProperty('profiles')) {
        this.handle_profiles_message(message)
      }
      if (message.hasOwnProperty('settings')) {
        this.handle_settings_message(message)
      }
      if (message.hasOwnProperty('error')) {
        this.handle_error_message(message)
      }
      if (message.hasOwnProperty('debug')) {
        console.log('Device: DEBUG: ', message.debug)
      }
      if (message.hasOwnProperty('idle')) {
        // TODO remove
        console.log('Device present, idle since: ', message.idle)
      }
    },

    handle_event_message: (event) => {
      if (event.ks) {
        store.update_keystates(event.ks)
      }
      if (event.hasOwnProperty('a')) {
        store.update_knob_position(event.t, event.a, event.v)
      }
    },

    handle_profile_message: (profile) => {
      // TODO update profile
    },

    handle_profiles_message: (profiles) => {
      // TODO update profiles
    },

    handle_settings_message: (settings) => {
      if (settings.hasOwnProperty('deviceName')) {
        store.update_device_name(settings.deviceName)
      }
      // TODO update other settings - maybe this should be in a separate store? Or in the main store, but move these ifs to a action method in the store?
    },

    handle_error_message: (error) => {
      console.error('Device: ERROR: ', error.error)
      // TODO show/handle error in UI?
    }
  }
}
