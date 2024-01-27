/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */


import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from '@/lang/en.json'

import './assets/main.css'
import './assets/index.css'

import { store } from '@/store.js'
import Ajv from 'ajv'
import schema from '@/data/profileSchema.json'
import Axios from 'axios'

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
});

const app = createApp(App);
app.use(i18n)
app.mount('#app');