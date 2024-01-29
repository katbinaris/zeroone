<template>
  <div class="bg-wip w-full text-center p-8 text-zinc-200">
    <span class="bg-black font-heading p-1">WORK IN PROGRESS</span>
  </div>
</template>

<style scoped>
.bg-wip {
  --stripe-color-a: rgb(228 228 231);
  --stripe-color-b: black;
  --stripe-width: 1em;
  background: repeating-linear-gradient(
    45deg,
    var(--stripe-color-a),
    var(--stripe-color-a) var(--stripe-width),
    var(--stripe-color-b) var(--stripe-width),
    var(--stripe-color-b) calc(var(--stripe-width) * 2)
  );
}
</style>