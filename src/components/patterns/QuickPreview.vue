<script setup>

</script>

<template>
  <div class="flex self-center bg-cover w-72 h-72 mb-7" style="background-image: url(src/assets/gui-ico/xl-bg-ico.svg)">
    <div v-if="profiles" class="flex flex-col w-full justify-center p-10 rounded-full overflow-hidden">
      <div class="self-center w-8 mb-1 opacity-50">
        <img src="@/assets/gui-ico/ico-midi-logo.svg" alt="midi-logo" />
      </div>
      <h2 v-for="feedbackConfig in profiles" :key="feedbackConfig" class="self-center font-pixellg text-5xl ">
        {{ feedbackConfig.pos }}</h2>

      <div class="self-center font-pixelsm text-md pt-1 pb-2">{{ profiles.name }}</div>
      <div id="scales" class="flex self-center text-xs py-0"></div>

      <div
        v-for="profileConfig in profiles"
        :key="profileConfig"
        class="self-center text-center text-muted-foreground font-pixelsm text-xs pt-0.5 w-40">
        {{ profileConfig.profileDesc }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NanoConfig',
  props: ['id'],
  data() {
    return {
      profiles: [],
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3001/profiles/5867')
      this.profiles = res.data
    } catch (e) {
      console.error(e)
    }
  },
}


// var startPos = 0;
// var totalPos = 340;
// var currentPos = 156;
// var minRange = 0;
// var maxRange = 40;  


// document.addEventListener("DOMContentLoaded", function(){
//     //....


// // Quick Preview GUI indicator Render
// var scale = document.getElementById("scale");

// Number.prototype.map = function (in_min, in_max, out_min, out_max) {
//   return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }

// var guiCurrentPos = Math.round(currentPos.map(startPos, totalPos, minRange, maxRange));

// for(var i = 0; i < 40; i=i+1){
// 	scale.innerHTML += "<div class='bg-white'></div>";
// 	if (i - 1 < guiCurrentPos) {
//   scale.getElementsByTagName("div")[i].classList.add("active");
//   	if (i == guiCurrentPos) {
//     scale.getElementsByTagName("div")[guiCurrentPos].classList.add("current");
//     }
//   }   


// }
// });
</script>