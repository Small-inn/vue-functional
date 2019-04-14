<template>
  <div id="app" class="app">
    <router-view/>
    <loading></loading>
  </div>
</template>
<script>
import loading from '@/components/loading/loading.vue'
export default {
  components: {
    loading
  }
}
</script>
<style lang="stylus" scope>
  // &.router-link-exact-active
    // color #42b983
</style>
