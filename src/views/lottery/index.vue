<template>
  <div class="lottery">
    <section class="zzp">
      <lottery></lottery>
    </section>
    <section class="ggl">
      <scratch-card></scratch-card>
    </section>
  </div>
</template>

<script>
import lottery from './child'
import scratchCard from './scratch-card'
export default {
  components: {
    lottery,
    scratchCard
  }
}
</script>

<style>
.lottery {
  width: 100%;
  height: 100%;
  position: relative;
}
.zzp {
  width: 100%;
  height: 6.68rem; /* 334/50 */
}
.ggl {
}
</style>
