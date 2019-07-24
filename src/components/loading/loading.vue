<template>

    <div class="loading-wrapper" v-show="loading">
        <div class="loading">
            <img src="./loading.gif" alt="">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.$bus.$on('loading', (data) => {
      this.loading = !!data
    })
  }
}
</script>
<style lang="stylus" scoped>
.loading-wrapper
    position absolute
    left 0
    top 0
    z-index 999
    width 100%
    height 100%
    .loading
        display flex
        justify-content center
        align-items center
        flex-direction column
        width 100%
        height 100%
        color #ffffff
        background-color rgba(0, 0, 0, .5)
        img
            width .4rem /* 20/50 */
            height .4rem /* 20/50 */
</style>
