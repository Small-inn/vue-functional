<template>
    <div class="more"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend">
        <slot/>
        <p class="load-more">{{tip}}</p>
    </div>
</template>
<script>
import { scrollToBottom } from '@/assets/js/util.js'
export default {
  data () {
    return {
      list: [], // 数据
      sy: 0, // y轴落点位置
      dy: 0, // 滑动之后的y轴距离
      trgY: 50, // 触发距离
      status: 0, // 控制文字变量
      page: 1 // 页码
    }
  },
  computed: {
    tip () {
      switch (this.status) {
        case 0:
          return '向上滚动加载更多...'
        case 1:
          return '加载中...'
        case 2:
          return '我是有底线的---'
        default:
          return '向上滚动加载更多...'
      }
    }
  },
  methods: {
    touchstart (e) {
      e = e || window.event
      this.sy = e.touches[0].pageY
    },
    touchmove (e) {
      this.dy = e.touches[0].pageY
    },
    touchend (e) {
      console.log(this.sy - this.dy);
      if (this.sy - this.dy > this.trgY && scrollToBottom && this.status === 0) {
        this.page++
        this.load()
      }
    },
    load() {
      this.status = 1
      let para = { page: this.page, size: 10 }
      // getData(para).then(res => {
      //   if (res.status === 'OK') {
      //     this.status = 0
      //     this.list = [...this.list, ...res.data]
      //     if (res.data.length === 0) {
      //       this.status = 2
      //     }
      //   }
      // }).catch(e => {
      //   this.status = 2
      // })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .more
    width 100%
    min-height 100%
</style>
