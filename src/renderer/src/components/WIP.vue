<template>
  <div class="bg-wip w-full p-8 text-center text-zinc-600">
    <span class="font-heading bg-black p-1">WORK IN PROGRESS</span>
  </div>
</template>

<style scoped>
.bg-wip {
  --stripe-color-a: rgb(82 82 91);
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
