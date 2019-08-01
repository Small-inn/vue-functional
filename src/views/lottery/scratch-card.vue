<template>
  <div class="scratch-card" id="top">
    <img class="img" id="img" src="../../assets/image/mask.png" alt />
    <div class="msg">
      <p class="text">{{desc}}</p>
      <p class="text">{{awardName}}</p>
    </div>
    <canvas id="canvas" class="canvas" v-show="isCanvas"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      desc: 'ads',
      awardName: 'fsasfdas',
      c: null,
      ctx: null,
      fontem: null,
      isCanvas: true, // 控制canvas的显示与隐藏
      timerClear: null
    }
  },
  mounted () {
    // this._isTryToGet();
  },
  created () {
    this.$nextTick(() => {
      this.fontem = parseInt(
        window.getComputedStyle(document.documentElement, null)['font-size']
      )
      // 初始化抽奖界面
      this.init()
      this._listener()
    })
  },
  methods: {
    // 添加事件监听
    _listener () {
      this.c.addEventListener('touchstart', this.eventDown)
      this.c.addEventListener('touchmove', this.eventMove)
      this.c.addEventListener('touchend', this.eventUp)
      // this.c.addEventListener('mousemove', this.eventMove)
      // this.c.addEventListener('mousedown', this.eventDown)
      // this.c.addEventListener('mouseup', this.eventUp)
    },
    // 去除事件监听
    _removeListener () {
      this.c.removeEventListener('touchstart', this.eventDown)
      this.c.removeEventListener('touchmove', this.eventMove)
      this.c.removeEventListener('touchend', this.eventUp)
    },
    // 初始化画布
    init () {
      this.c = document.querySelector('#canvas')
      this.ctx = this.c.getContext('2d')
      this.initCanvas()
    },
    // 初始化画布
    initCanvas () {
      // 遮罩层 放图片
      this.ctx.globalCompositeOperation = 'source-over'
      const img = document.querySelector('#img')
      let that = this
      img.onload = function () {
        // that.ctx.drawImage(img, 0, 0, that.c.clientWidth, that.c.clientHeight)
        that.ctx.drawImage(img, 0, 0, 320, 151)
      }

      this.ctx.drawImage(img, 0, 0, 320, 151)
      // this.ctx.globalCompositeOperation = 'destination-out'
      // 绘制自定义的遮罩层
      // this.ctx.globalCompositeOperation = 'source-over'
      // this.ctx.fillStyle = '#aaaaaa'
      // this.ctx.fillRect(0, 0, this.c.clientWidth, this.c.clientHeight)
      // this.ctx.fill()

      // this.ctx.font = 'Bold 30px Arial'
      // this.ctx.textAlign = 'center'
      // this.ctx.fillStyle = '#999999'
      // this.ctx.fillText('刮一刮', this.c.clientWidth / 2, this.c.clientHeight / 2)
      // this.ctx.globalCompositeOperation = 'destination-out'
    },
    eventDown (e) {
      e.preventDefault()
      // 改变合成属性使得可以使用橡皮擦功能
      this.ctx.globalCompositeOperation = 'destination-out'
    },
    eventUp (e) {
      e.preventDefault()
      // 这里判断刮去一半时做处理
      const a = this.ctx.getImageData(0, 0, 320, 150)
      let j = 0
      for (let i = 3; i < a.data.length; i += 4) {
        if (a.data[i] === 0) {
          j++
        }
      }
      // 当被刮开的区域等于一半时，则可以开始处理结果
      if (j >= a.data.length / 8) {
        // 请求接口判断是否可以抽奖
        // this._isTryToGet();
        // 当刮到一半时，剩余的自动刮开
        this.ctx.fillStyle = ''
        this.ctx.fillRect(0, 0, 320, 150)
      }
    },
    eventMove (e) {
      if (e.changedTouches) {
        e = e.changedTouches[e.changedTouches.length - 1]
      }
      const topY = document.getElementById('top').offsetTop
      const oX = this.c.offsetLeft
      const oY = this.c.offsetTop + topY
      const x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0
      const y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0
      this.ctx.beginPath()
      this.ctx.arc(x, y, this.fontem * 0.8, 0, Math.PI * 2, true)
      // 下面3行代码是为了修复部分手机浏览器不支持destination-out
      this.c.style.display = 'none'
      this.c.style.display = 'inherit'
      this.ctx.fill()
    }
  },
  destroyed () {
    clearInterval(this.timerClear)
    this._removeListener()
  }
}
</script>

<style lang="stylus" scoped>
.scratch-card {
  margin: 0.4rem /* 20/50 */ auto;
  width: 6.8rem; /* 340/50 */
  height: 3.36rem; /* 168/50 */
  background-image: url('http://cntaipingapp.oss-cn-hangzhou.aliyuncs.com/lxjk/luckyEleplant/index/card_bg.png');
  background-size: 100% 100%;
  position: relative;

  // text-align center
  // line-height 3.36rem
  .img {
    display: none;
    width: 6.4rem; /* 320/50 */
    height: 3rem; /* 150/50 */
  }

  .msg {
    margin-top: 0.6rem; /* 30/50 */
    width: 6.4rem; /* 340/50 */
    position: absolute;
    top: 0.12rem; /* 6/50 */
    left: 0.2rem; /* 10/50 */
    color: #ffffff;

    .text {
      text-align: center;
      font-size: 0.4rem; /* 20/50 */
      line-height: 0.6rem; /* 30/50 */
      font-weight: 550;
    }

    .center {
      margin-top: 0.6rem; /* 30/50 */
    }

    .btn {
      margin: 0.2rem /* 10/50 */ auto;
      width: 3.2rem; /* 160/50 */
      height: 0.8rem; /* 40/50 */
      line-height: 0.8rem; /* 40/50 */
      text-align: center;
      font-size: 0.36rem; /* 18/50 */
      background-color: rgba(255, 0, 0, 0.2);
      border-radius: 22px;
    }
  }

  .canvas {
    width: 6.4rem; /* 320/50 */
    height: 3.02rem; /* 151/50 */
    position: absolute;
    top: 0.12rem; /* 6/50 */
    left: 0.2rem; /* 10/50 */
  }
}
</style>
