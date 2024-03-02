import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import { pinia } from '@renderer/store'

import en from '@renderer/lang/en.json'

// Create VueI18n instance with locales loaded from /lang directory
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: en }
})

const app = createApp(App)

app.use(pinia)
app.use(i18n)

// TODO remove this
window.nanoDevicesAPI.on_event('*', (eventid, deviceid, ...data) => {
  console.log('Event on window ', eventid, deviceid, data)
})

app.mount('#app')
