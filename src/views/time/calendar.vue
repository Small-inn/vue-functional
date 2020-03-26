<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="year">
        <el-select class="el_select" v-model="header.year" placeholder="请选择">
          <el-option
            v-for="item in header.yearList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="month">
        <span class="arrow" @click="increase">></span>
        <el-select class="el_select" v-model="header.month" placeholder="请选择">
          <el-option
            v-for="item in header.monthList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="arrow" @click="add">></span>
      </div>
      <div class="time">
        <span>时间段：</span>
        <el-select v-model="header.time" placeholder="请选择">
          <el-option
            v-for="item in header.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="refresh" @click="refresh">
        <el-button type="primary">刷新</el-button>
      </div>
    </div>
    <div class="calendar-body" v-loading="loading">
      <table class="calendar-table">
        <thead>
          <tr v-for="(week, index) in weeks" :key="index">{{week}}</tr>
        </thead>
        <tbody>
          <!-- 上个月后几天 -->
          <div
            class="calendar-day"
            @click="change(pre)"
            :class="pre.type"
            v-for="(pre, pIndex) in prevDays"
            :key="pIndex"
          >
            <span v-if="pre.lunar.isTody" class="is-today">今天</span>
            <span>{{pre.text}}</span>
            <span v-if="pre.festival" class="festival">{{pre.festival}}</span>
            <span v-else-if="pre.term" class="term">{{pre.term}}</span>
            <span
              v-else
              class="lunar-day"
            >{{pre.lunar.lunarDay === 1 ? pre.lunar.lunarMonthChiness : pre.lunar.lunarDayChiness}}</span>
            <div class="not-appoint" v-show="true">不可预约</div>
            <div class="visit-res" v-show="false">参观剩余{{pIndex}}人</div>
            <div class="experience-res" v-show="false">体验剩余{{pIndex}}人</div>
            <div class="fulled" v-show="false">已满</div>
          </div>
          <!-- 当前月 -->
          <div
            class="calendar-day"
            :class="[curr.type,
              curr.lunar.isTody ? 'today' : '',
              curr.isChecked ? 'actived' : '']"
            v-for="(curr, cIndex) in currentDays"
            :key="cIndex + 10"
            @click="select(curr)"
          >
            <span v-if="curr.lunar.isTody" class="is-today">今天</span>
            <span>{{curr.text}}</span>
            <span v-if="curr.festival" class="festival">{{curr.festival}}</span>
            <span v-else-if="curr.term" class="term">{{curr.term}}</span>
            <span
              v-else
              class="lunar-day"
            >{{curr.lunar.lunarDay === 1 ? curr.lunar.lunarMonthChiness : curr.lunar.lunarDayChiness}}</span>

            <div class="not-appoint" v-show="false">不可预约</div>
            <div class="visit-res">参观剩余{{cIndex}}人</div>
            <div class="experience-res">体验剩余{{cIndex}}人</div>
            <div class="fulled" v-show="false">已满</div>
          </div>
          <!-- 下个月前几天 -->
          <div
            class="calendar-day"
            @click="change(next)"
            :class="next.type"
            v-for="(next, nIndex) in nextDays"
            :key="nIndex + 50"
          >
            <span v-if="next.lunar.isTody" class="is-today">今天</span>
            <span>{{next.text}}</span>
            <span v-if="next.festival" class="festival">{{next.festival}}</span>
            <span v-else-if="next.term" class="term">{{next.term}}</span>
            <span
              v-else
              class="lunar-day"
            >{{next.lunar.lunarDay === 1 ? next.lunar.lunarMonthChiness : next.lunar.lunarDayChiness}}</span>

            <div class="not-appoint" v-show="false">不可预约</div>
            <div class="visit-res" v-show="false">参观剩余{{nIndex}}人</div>
            <div class="experience-res" v-show="false">体验剩余{{nIndex}}人</div>
            <div class="fulled" v-show="true">已满</div>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ChineseCalendar from '@/assets/js/ChineseCalendar.js'
export default {
  data() {
    return {
      header: {
        year: '2019年',
        yearList: [],
        month: `${new Date().getMonth() + 1}月`,
        monthList: [{
          value: 1,
          label: '1月'
        }, {
          value: 2,
          label: '2月'
        }, {
          value: 3,
          label: '3月'
        }, {
          value: 4,
          label: '4月'
        }, {
          value: 5,
          label: '5月'
        }, {
          value: 6,
          label: '6月'
        }, {
          value: 7,
          label: '7月'
        }, {
          value: 8,
          label: '8月'
        }, {
          value: 9,
          label: '9月'
        }, {
          value: 10,
          label: '10月'
        }, {
          value: 11,
          label: '11月'
        }, {
          value: 12,
          label: '12月'
        }],
        time: 1,
        options: [{
          value: 1,
          label: '08:30'
        }, {
          value: 2,
          label: '13:30'
        }]
      },
      loading: false,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      prevDays: [], // 补角，上个月的最后几天补到当前个月的1号
      currentDays: [], // 当前月的天数
      nextDays: [], // 补角，下个月的前几天补剩余的空格
      firstDayOfWeek: 0, // 判断这个月的1号是周几
      rows: 5, // 默认为5列
      prevMonthDays: 0,
      nextMonthDays: 0,
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth() + 1,
      currDay: new Date().getDate(), // 几号
      startTime: '', // 选择开始时间
      endTime: '' // 选择结束时间
    }
  },
  created() {
    this.header.yearList = this.afterTwyears()
  },
  mounted() {
    this.init(this.currYear, this.currMonth)
  },
  methods: {
    // 年往后推20年
    afterTwyears(num = 20) {
      let res = []
      for (let i = 0; i < num; i++) {
        res.push({
          value: new Date().getFullYear() + i,
          label: `${new Date().getFullYear() + i}年`
        })
      }
      return res
    },
    init(years = 2019, months = 8) {
      this.refresh()
      // 对参数进行处理，类型转换
      let year = parseInt(years.toString().match(/^年/) ? years.slice(0, -1) : years)
      let month = parseInt(months.toString().match(/^月/) ? months.slice(0, -1) : months)

      this.currentDays = []
      let currentMonthDays = new Date(year, month, 0).getDate()

      // 获取当前月份天数
      for (let i = 0; i < currentMonthDays; i++) {
        this.currentDays.push({
          date: moment(new Date(`${year}-${month}-${i + 1}`)).format('YYYY-MM-DD'),
          text: i + 1,
          lunar: ChineseCalendar.date2lunar(new Date(`${year}-${month}-${i + 1}`)), // 农历
          festival: ChineseCalendar.lunarFestival(new Date(`${year}-${month}-${i + 1}`)), // 节日
          term: ChineseCalendar.lunarTerm(new Date(`${year}-${month}-${i + 1}`)), // 节气
          type: 'current'
        })
      }

      // 获取上个月的天数, 这里有问题， 假如2019-01呢？
      this.prevMonthDays = new Date(year, month - 1, 0).getDate()
      // 判断当前月的1号是周几
      this.firstDayOfWeek = new Date(`${year}-${month}-01`).getDay()

      // 补角 前几天
      let prevDays = []
      for (let i = 0; i < this.firstDayOfWeek; i++) {
        let days = this.prevMonthDays - this.firstDayOfWeek + i + 1
        if (month - 1 === 0) {
          year -= 1
          month = 13
        }
        prevDays.push({
          date: moment(new Date(`${year}-${month - 1}-${days}`)).format('YYYY-MM-DD'),
          text: this.prevMonthDays - this.firstDayOfWeek + i + 1,
          lunar: ChineseCalendar.date2lunar(new Date(`${year}-${month - 1}-${days}`)), // 农历
          festival: ChineseCalendar.lunarFestival(new Date(`${year}-${month - 1}-${days}`)), // 节日
          term: ChineseCalendar.lunarTerm(new Date(`${year}-${month - 1}-${days}`)), // 节气
          type: 'prev'
        })
      }
      this.prevDays = prevDays

      // 补角后几天，这里要判断rows
      this.rows = this.prevDays.length + this.currentDays.length > this.rows * 7 ? 6 : 5
      let nextDays = []
      for (let i = 0; i < this.rows * 7 - this.firstDayOfWeek - this.currentDays.length; i++) {
        let days = i + 1
        if (month + 1 > 12) {
          year += 1
          month = 0
        }

        nextDays.push({
          text: i + 1,
          date: moment(new Date(`${year}-${month + 1}-${days}`)).format('YYYY-MM-DD'),
          lunar: ChineseCalendar.date2lunar(new Date(`${year}-${month + 1}-${days}`)), // 农历
          festival: ChineseCalendar.lunarFestival(new Date(`${year}-${month + 1}-${days}`)), // 节日
          term: ChineseCalendar.lunarTerm(new Date(`${year}-${month + 1}-${days}`)), // 节气
          type: 'next'
        })
      }
      this.nextDays = nextDays
    },

    increase() {
      let countMonth = this.header.month.toString().match(/月/) ? this.header.month.slice(0, -1) : this.header.month
      this.header.month = `${countMonth-- === 1 ? 12 : countMonth}月`

      if (countMonth === 0) {
        let year = parseInt(this.header.year.toString().match(/年/) ? this.header.year.slice(0, -1) : this.header.year)
        year--
        this.header.year = `${year}年`
      }
    },

    add() {
      let countMonth = this.header.month.toString().match(/月/) ? this.header.month.slice(0, -1) : this.header.month
      this.header.month = `${countMonth++ === 12 ? 1 : countMonth}月`

      if (countMonth === 13) {
        let year = parseInt(this.header.year.toString().match(/年/) ? this.header.year.slice(0, -1) : this.header.year)
        year++
        this.header.year = `${year}年`
      }
    },
    refresh() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    change(item) {
      console.log(item)
      let year = item.date.split('-')[0]
      let month = item.date.split('-')[1]
      this.header.year = `${year}年`
      this.header.month = `${parseInt(month)}月`
      this.init(year, month)
    },
    select(curr) {
      console.log(curr)
      this.currentDays.map(item => {
        if (curr.date === item.date) {
          this.$set(item, 'isChecked', true)
        } else {
          this.$set(item, 'isChecked', false)
        }
      })
    }
  },
  watch: {
    'header.year': function (value) {
      this.init(value, this.header.month)
    },
    'header.month': function (value) {
      this.init(this.header.year, value)
    },
    'header.time': function (value) {
      this.init(this.header.year, this.header.month)
    }
  }
}
</script>
<style lang="stylus">
common() {
  width: 88%;
  height: 0.24rem; /* 12/50 */
  line-height: 0.24rem; /* 12/50 */
  text-align: center;
  border-radius: 0.16rem; /* 8/50 */
  color: #FFFFFF;
  font-size: 14px;
}

.calendar {
  background-color: #fff;
  width: 100%;
  border: 1px solid #E8E8E8;

  .calendar-header {
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .month {
      .el_select {
        width: 120px;
      }

      .el-input__inner {
        border-radius: 0;
        border-left: 0;
        border-right: 0;
      }

      .arrow {
        display: inline-block;
        width: 36px;
        height: 38px;
        line-height: 36px;
        text-align: center;
        border: 1px solid #E8E8E8;
        font-family: consolas;
        font-size: 18px;

        &:first-child {
          transform: rotate(180deg);
        }
      }
    }
  }

  .calendar-table {
    width: 100%;
    border-top: 1px solid #E8E8E8;

    thead {
      display: flex;

      tr {
        flex: 1;
        text-align: center;
        padding: 20px 0;
        border-right: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;

        &:first-child, &:last-child {
          background-color: #EAF4FF;
        }
      }
    }

    tbody {
      display: flex;
      flex-wrap: wrap;

      .calendar-day {
        width: calc((100% / 7));
        height: 1rem; /* 50/50 */
        box-sizing: border-box;
        text-align: right;
        border-right: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;

        &:hover {
          border: 1px solid #3296FF;
          box-shadow: 0 0 5px #3296FF;
          position: relative;
        }

        span {
          padding: 0 0.08rem; /* 4/50 */
          width: 0.4rem; /* 20/50 */
          line-height: 0.36rem; /* 18/50 */
        }

        .is-today {
          background-color: #3296FF;
          color: #fff;
          border-radius: 4px;
        }

        .term, .festival {
          color: #49BAA2;
        }

        .lunar-day {
          color: #909090;
        }

        .not-appoint {
          common();
          margin: 0.2rem /* 10/50 */ auto;
          background-color: #C6C6C6;
        }

        .visit-res {
          common();
          margin: auto;
          background-color: #FFB17F;
        }

        .experience-res {
          common();
          margin: 0.08rem auto 0; /* 4/50 */
          background-color: #FF8C8C;
        }

        .fulled {
          margin: 0.2rem /* 10/50 */ auto 0;
          width: 88%;
          height: 0.32rem; /* 16/50 */
          line-height: 0.32rem; /* 16/50 */
          text-align: center;
          background-color: #C6C6C6;
          color: #fff;
          border-radius: 0.06rem; /* 3/50 */
        }
      }

      .prev {
        background-color: #F7F7F7;
      }

      .current {
        background-color: #fff;
      }

      .today {
        color: #3296FF;
        background-color: #EBF5FF;
      }

      .actived {
        color: #3296FF;
        background-color: #EBF5FF;
        // background-color: #3296FF;
        border: 1px solid #3296FF;
      }

      .next {
        background-color: #F7F7F7;
      }
    }
  }
}
</style>
