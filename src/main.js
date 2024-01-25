import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createI18n } from 'vue-i18n'

import en from './lang/en.json'

import App from './App.vue'

import Ajv from 'ajv'

// Create a new store instance
const store = createStore({
  state() {
    return {
      device: {
        connected: false,
        profiles: [],
      },
    }
  },
  mutations: {},
})

// Create VueI18n instance with locales loaded from /lang directory
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: en },
})

const app = createApp(App)

app.use(i18n)
app.use(store)

app.provide('ajv', new Ajv())

app.mount('#app')