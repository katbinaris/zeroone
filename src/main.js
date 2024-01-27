import './assets/main.css'
import Axios from 'axios'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import en from '@/lang/en.json'

import App from '@/App.vue'

import { store } from '@/store.js'

import Ajv from 'ajv'
import schema from '@/data/profileSchema.json'

const ajv = new Ajv()

Axios.get('http://localhost:3001/profiles').then((res) => {
  const profiles = res.data
  console.log(profiles)
  const ids = new Set()
  const validate = ajv.compile(schema)
  store.device.profiles = profiles.filter((profile) => {
    if (!validate(profile)) {
      console.error('Failed to validate profile: ' + profile.name, validate.errors)
      return false
    }
    if (ids.has(profile.id)) {
      console.error('Duplicate profile id: ' + profile.id + ' for profile: ' + profile.name)
      return false
    }
    ids.add(profile.id)
    return true
  })
}).catch((err) => {
  console.error(err)
})

// Create VueI18n instance with locales loaded from /lang directory
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: en },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')