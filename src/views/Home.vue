<template>
    <div class="home">
        <!-- <router-link class="cal-btn" to="/calendar" tag="div">日历</router-link> -->
        <div class="box">
            <router-link class="box-item" v-for="(item, index) in linkList" :key="index" :to="item.path" tag="div">{{item.title}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      linkList: [
        { path: '/calendar', title: '日历' },
        { path: '/carousel', title: '轮播' },
        { path: '/loadmore', title: '上滑' },
        { path: '/', title: '下拉' },
        { path: '/lottery', title: '抽奖' },
        { path: '/upload', title: '上传' },
        { path: '/', title: '时间' },
        { path: '/', title: '数据' },
        { path: '/vuex', title: '状态' }
      ]
    }
  },
  created () {
    // console.log(this)
    // this.$bus.$emit('loading', true)
    this.$bus.$emit('loading')
  }
}
</script>
<style lang="stylus" scoped>
.home
    height 100%
    .box
        display flex
        flex-wrap wrap
        .box-item
            background-color red
            width calc(33.33% - .8rem)
            height .8rem /* 40/50 */
            line-height .8rem
            text-align center
            margin .4rem /* 20/50 */
            border-radius 4px
            color #fff
</style>
