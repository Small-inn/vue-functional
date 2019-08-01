<template>
  <div class="turntable">
    <!----------大转盘区域---------->
    <div :style="{transform:rotate_angle, transition:rotate_transition}" class="list-wrapper">
      <ul class="list">
        <li v-for="(item, index) in prizeList" :key="index">
          <p v-html="dealGraph(item.spuName)"></p>
          <!-- <p v-if="item.trophyName === '爱奇艺周卡'">爱奇艺7日VIP</p>
                    <p v-else>{{item.trophyName}}</p>
                    <em v-if="item.trophyType===2">开奖券</em>
                    <div>
                        <img :src="item.trophyImg" alt="">
          </div>-->
        </li>
      </ul>
    </div>
    <!-- <em class="turntable-pointer" @click="rotate_handle">开始<br/>抽奖</em> -->
    <em class="turntable-pointer" @click="rotate_handle"></em>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prizeList: [
        {
          id: 1,
          spuName: '1阿斯蒂芬'
        },
        {
          id: 2,
          spuName: '2发地方撒'
        },
        {
          id: 3,
          spuName: '3防守打法'
        },
        {
          id: 4,
          spuName: '4下次v在'
        },
        {
          id: 5,
          spuName: '5空间联合'
        },
        {
          id: 6,
          spuName: '6球衣'
        }
      ],
      reward_index: 0, // 中奖物品的下标
      rewardName: '', // 中奖物品的名字
      start_rotating_degree: 0, // 初始旋转角度
      rotate_angle: 0, // 将要旋转的角度
      rotate_transition: 'transform 6s ease-in-out', // 初始化选中的过度属性控制
      click_flag: true // 是否可以旋转抽奖
    }
  },
  methods: {
    // 文字处理
    dealGraph(p) {
      if (p.indexOf('+') !== -1) {
        let arr = p.split('+')
        return arr[0] + '<br/> + <br/>' + arr[1]
      } else {
        return p
      }
    },
    rotate_handle() {
      this.rotating(0)
      // 先判断是否抽过奖
      // this.$http.get('/merchant/tpjxb/raward/already').then(res => {})
      // 请求抽奖接口
    },
    rotating(index, spuName, rewardName) {
      let type = 0 // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      let during_time = 6 // 默认为1s
      let result_index = index // 最终要旋转到哪一块，对应prize_list的下标
      let result_angle = [330, 270, 210, 150, 90, 30] // 最终会旋转到下标的位置所需要的度数
      let rand_circle = 6 // 附加多转几圈，6
      // this.click_flag = false // 旋转结束前，不允许再次触发
      if (type === 0) {
        // 转动盘子
        let rotate_angle = this.start_rotating_degree + rand_circle * 360 + result_angle[result_index] - this.start_rotating_degree % 360 // 这里为计算旋转的角度，考虑第一次旋转后的结果
        this.start_rotating_degree = rotate_angle
        this.rotate_angle = 'rotate(' + rotate_angle + 'deg)'
        // 转动指针,默认只旋转转盘，用户体验较好
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        // let _this = this;
        // 旋转结束后，允许再次触发
        setTimeout(() => {
          // this.click_flag = true
          // _this.rotate_over(rewardName)
        }, during_time * 1000 + 500) // 延时，保证转盘转完
      } else {
        //
      }
    }
  }
}
</script>css

<style scoped lang="css">
/* ----------大转盘区域---------- */
.turntable {
  overflow: hidden;
  position: absolute;
  right: 0;
  left: 0;
  width: 6.68rem; /* 334/50 */
  height: 6.68rem; /* 334/50 */
  margin: 0 auto;
}

.turntable .list-wrapper {
  width: 100%;
  height: 100%;
  background: url('../../assets/image/turntable1.png') center;
  background-size: cover;
}

/* 大转盘区域的列表 */
.turntable .list {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 5.94rem; /* 297/50 */
  height: 5.94rem; /* 297/50 */
  margin: auto;
  border-radius: 50%;
}

.turntable .list li {
  position: absolute;
  width: 1.56rem; /* 78/50 */
  /* height: 1rem;
  line-height: 0.507rem; */
  text-align: center;
  font-size: 0.24rem; /* 12/50 */
  color: #222222;
}

/* .turntable .list li em{
    display: block;
    font-style: normal;
    font-weight: bold;
} */
/* .turntable .list li div{
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0.133rem auto 0;
}
.turntable .list li div img{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
} */
.turntable .list li:first-child {
  top: 0.6rem; /* 30/50 */
  right: 1.2rem; /* 60/50 */
  transform: rotate(30deg);
}

.turntable .list li:nth-child(2) {
  top: 2.7rem; /* 135/50 */
  right: -0.1rem; /* 5/50 */
  transform: rotate(90deg);
}

.turntable .list li:nth-child(3) {
  bottom: 0.7rem; /* 35/50 */
  right: 1.2rem; /* 60/50 */
  transform: rotate(150deg);
}

.turntable .list li:nth-child(4) {
  bottom: 0.8rem; /* 40/50 */
  right: 3.3rem; /* 165/50 */
  transform: rotate(-150deg);
}

.turntable .list li:nth-child(5) {
  bottom: 2.36rem; /* 118/50 */
  left: 0.2rem; /* 10/50 */
  transform: rotate(-90deg);
}

.turntable .list li:nth-child(6) {
  bottom: 4.7rem; /* 235/50 */
  left: 1.1rem; /* 55/50 */
  transform: rotate(-30deg);
}

/* .turntable .list li:nth-child(7){
    top: 2.15rem;
    left: -0.1rem;
    transform: rotate(-67deg);
}
.turntable .list li:nth-child(8){
    top: .6rem;
    left: 1.358rem;
    transform: rotate(-22deg);
} */
/* 大转盘区域的指针“开始抽奖” */
.turntable .turntable-pointer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.34rem; /* 17/50 */
  left: 0;
  width: 2.14rem; /* 107/50 */
  height: 2.46rem; /* 123/50 */
  margin: auto;
  background: url('../../assets/image/turntable_pointer1.png') center;
  background-size: cover;
  box-sizing: border-box;
}
</style>
