<template>
    <div class="swiper" @touchstart="touchstartHandler($event)" @touchmove="touchmoveHandler($event)" @touchend="touchendHandler($event)">
        <ul class="img-wrapper" ref="ul">
            <li v-for="(item, index) in list" :key="index" ref="lis">
                <img :src="item.url" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import { widthScreen } from '@/assets/js/util.js'
const imgList = [
  { url: require('@/assets/image/banner01.jpg'), https: '', text: '1' },
  { url: require('@/assets/image/banner02.jpg'), https: '', text: '2' },
  { url: require('@/assets/image/banner03.jpg'), https: '', text: '3' },
  { url: require('@/assets/image/banner04.jpg'), https: '', text: '4' },
  { url: require('@/assets/image/banner05.jpg'), https: '', text: '5' }
]
export default {
  data () {
    return {
      // 位置
      position: {
        left: -1,
        center: 0,
        right: 1
      },
      // 距离
      distance: {
        screenWidth: widthScreen,
        startX: 0,
        startTime: 0,
        disX: 0,
        endTime: 0
      },
      carourTimer: null,
      list: imgList
    }
  },
  created () {
    this.position.left = this.list.length - 1
    clearInterval(this.carourTimer)
    // console.log(this.position)
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.lis[this.position.center].style.transform = `translateX(0px)`
      this.$refs.lis[this.position.left].style.transform = `translateX(-${this.distance.screenWidth}px)`
      this.$refs.lis[this.position.right].style.transform = `translateX(${this.distance.screenWidth}px)`
      this.$refs.ul.style.height = this.$refs.lis[0].offsetHeight + 'px'
      this.autoPlay()
    })
  },
  methods: {
    // 自动轮播
    autoPlay () {
      this.carourTimer = setInterval(() => {
        this.nextShow()
      }, 2000)
    },
    touchstartHandler (e) {
      this.distance.startX = e.touches[0].pageX
      this.distance.startTime = new Date()
      clearInterval(this.carourTimer)
      this.setTransition(false, false, false)
    },
    touchmoveHandler (e) {
      this.distance.disX = e.touches[0].pageX - this.distance.startX
      this.setTranslateX(this.distance.disX)
    },
    touchendHandler (e) {
      this.endTime = new Date() - this.distance.startTime
      this.disX = e.changedTouches[0].pageX - this.distance.startX
      // 当滑动的距离大于1/3的值的时候或者滑动时间小于500毫秒且滑动区间大于30像素，则滑动成功
      if (this.distance.disX < -(this.position.screenWidth / 3) || (this.distance.endTime < 500 && this.distance.disX < -30)) {
        this.nextShow()
      } else if (this.distance.disX > this.position.screenWidth / 3 || (this.distance.endTime < 500 && this.distance.disX > 30)) {
        this.preShow()
      } else {
        this.setTransition(true, true, true)
        this.setTranslateX()
      }
    },
    // 下一张逻辑
    nextShow () {
      // 位置轮换
      this.position.left = this.position.center
      this.position.center = this.position.right
      this.position.right++
      if (this.position.right > this.list.length - 1) {
        this.position.right = 0
      }

      this.setTransition(true, true, false)
      this.setTranslateX()
      // console.log(this.position.center)
    },
    // 上一张逻辑
    preShow () {
      this.position.right = this.position.center
      this.position.center = this.position.left
      this.position.left--
      if (this.position.left < 0) {
        this.position.left = this.list.length - 1
      }

      this.setTransition(false, true, true)
      this.setTranslateX()
      // console.log(this.position.center)
    },
    // 移动
    setTranslateX (dx = 0) {
      // console.log(dx)
      this.$refs.lis[this.position.center].style.transform = `translateX(${dx}px)`
      this.$refs.lis[this.position.left].style.transform = `translateX(${-this.distance.screenWidth + dx}px)`
      this.$refs.lis[this.position.right].style.transform = `translateX(${this.distance.screenWidth + dx}px)`
    },
    // 过渡效果
    setTransition (a, b, c) {
      if (a) {
        this.$refs.lis[this.position.left].classList.add('transitionAll')
      } else {
        this.$refs.lis[this.position.left].classList.remove('transitionAll')
      }
      if (b) {
        this.$refs.lis[this.position.center].classList.add('transitionAll')
      } else {
        this.$refs.lis[this.position.center].classList.remove('transitionAll')
      }
      if (c) {
        this.$refs.lis[this.position.right].classList.add('transitionAll')
      } else {
        this.$refs.lis[this.position.right].classList.remove('transitionAll')
      }
    }
  },
  destroyed () {
    clearInterval(this.carourTimer)
  }
}
</script>
<style lang="stylus" scoped>
.swiper
    width 100%
    overflow hidden
    position relative
    .img-wrapper
        width 100%
        position relative
        li
            width 100%
            position absolute
            left 0
            top 0
            transform translateX(-100%)
            img
                width 100%
                height 170px
    .transitionAll
        transition all .3s ease-out
</style>
