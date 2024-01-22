import './assets/main.css'

import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'

import en from './lang/en.json'

import App from './App.vue'

// Create VueI18n instance with locales loaded from /lang directory
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {en: en}
})

const app = createApp(App)

app.use(i18n)
app.mount('#app')

var startPos = 0;
var totalPos = 360;
var currentPos = 156;
var minRange = 0;
var maxRange = 40;

document.addEventListener("DOMContentLoaded", function () {
    //....

// Quick Preview GUI indicator Render
    var scale = document.getElementById("scale");

    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    var guiCurrentPos = Math.round(currentPos.map(startPos, totalPos, minRange, maxRange));

    for (var i = 0; i < 40; i = i + 1) {
        scale.innerHTML += "<div class='bg-white'></div>";
        if (i - 1 < guiCurrentPos) {
            scale.getElementsByTagName("div")[i].classList.add("active");
            if (i == guiCurrentPos) {
                scale.getElementsByTagName("div")[guiCurrentPos].classList.add("current");
            }
        }

    }
});