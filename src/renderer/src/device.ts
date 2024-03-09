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
      // Moved these two up from handle_event_message
      // Event messages don't include the event key atm, so handle_event_message was never called
      if (message.hasOwnProperty('ks')) {
        store.update_keystates(message.ks)
      }
      if (message.hasOwnProperty('a')) {
        store.update_knob_position(message.t, message.a, message.v)
      }
    },

    handle_event_message: (event) => {},

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
