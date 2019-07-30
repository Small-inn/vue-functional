<template>
  <div class="calendar">
    <div class="calendar-header"></div>
    <div class="calendar-body">
      <table class="calendar-table">
        <thead>
          <tr v-for="(week, index) in weeks" :key="index">{{week}}</tr>
        </thead>
        <tbody>
          <div
            class="calendar-day"
            :class="pre.type"
            v-for="(pre, pIndex) in prevDays"
            :key="pIndex"
          >{{pre.text}}</div>
          <div
            class="calendar-day"
            :class="[curr.type,
              curr.lunar.isTody ? 'today' : '',
              curr.startTime ? 'start-time' : '',
              curr.endTime ? 'end-time' : '',
              curr.inRange ? 'in-range' : '']"
            v-for="(curr, cIndex) in currentDays"
            :key="cIndex + 10"
            @click="select(curr)"
          >
            <span v-if="curr.lunar.isTody">今天</span>
            {{curr.text}}
            <span v-if="curr.festival">{{curr.festival}}</span>
            <span v-else-if="curr.term">{{curr.term}}</span>
            <span
              v-else
            >{{curr.lunar.lunarDay === 1 ? curr.lunar.lunarMonthChiness : curr.lunar.lunarDayChiness}}</span>
          </div>
          <div
            class="calendar-day"
            :class="next.type"
            v-for="(next, nIndex) in nextDays"
            :key="nIndex + 50"
          >{{next.text}}</div>
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
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      prevDays: [], // 补角，上个月的最后几天补到当前个月的1号
      currentDays: [], // 当前月的天数
      nextDays: [], // 补角，下个月的前几天补剩余的空格
      firstDayOfWeek: 0, // 判断这个月的1号是周几
      rows: 6, // 默认为6列
      prevMonthDays: 0,
      nextMonthDays: 0,
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth() + 1,
      currDay: new Date().getDate(), // 几号
      startTime: '', // 选择开始时间
      endTime: '', // 选择结束时间
    }
  },
  mounted() {
    this.init(this.currYear, this.currMonth)
  },
  methods: {
    init(year = 2019, month = 7) {
      let currentMonthDays = new Date(year, month, 0).getDate()

      // 获取当前月份天数
      for (let i = 0; i < currentMonthDays; i++) {
        // let isToday = (new Date().getFullYear() == new Date(`${year}-${month}-${i + 1}`).getFullYear()) &&
        //   (new Date().getMonth() == new Date(`${year}-${month}-${i + 1}`).getMonth()) &&
        //   (new Date().getDate() == new Date(`${year}-${month}-${i + 1}`).getDate())
        this.currentDays.push({
          date: moment(new Date(`${year}-${month}-${i + 1}`)).format('YYYY-MM-DD'),
          text: i + 1,
          lunar: ChineseCalendar.date2lunar(new Date(`${year}-${month}-${i + 1}`)), //农历
          festival: ChineseCalendar.lunarFestival(new Date(`${year}-${month}-${i + 1}`)), // 节日
          term: ChineseCalendar.lunarTerm(new Date(`${year}-${month}-${i + 1}`)), // 节气
          // isToday: new Date(`${year}-${month}-${i + 1}`) === new Date(), // 是今天？
          // isToday, // 是今天？
          type: 'current'
        })
      }

      // 获取上个月的天数, 这里有问题， 假如2019-01呢？
      this.prevMonthDays = new Date(year, month - 1, 0).getDate()
      // 判断这个月的1号是周几
      this.firstDayOfWeek = new Date(`${year}-${month}-01`).getDay()
      // 补角 前几天
      for (let i = 0; i < this.firstDayOfWeek; i++) {
        this.prevDays.push({
          text: this.prevMonthDays - this.firstDayOfWeek + i + 1,
          type: 'prev'
        })
      }

      // 补角后几天，这里要判断rows
      this.rows = this.prevDays.length + this.currentDays.length > this.rows * 7 ? 6 : 5
      for (let i = 0; i < this.rows * 7 - this.firstDayOfWeek - this.currentDays.length; i++) {
        this.nextDays.push({
          text: i + 1,
          type: 'next'
        })
      }
    },
    select(curr) {
      console.log(curr)
      // this.$set(curr, 'start', true)
      if (!this.startTime && !this.endTime) {
        this.startTime = curr.date
      }
      if (this.startTime && curr.date > this.startTime) {
        this.endTime = curr.date
      } else {
        this.startTime = curr.date
        this.endTime = ''
      }
      // 动态改变样式
      this.currentDays.map(item => {
        if (item.date === this.startTime) {
          this.$set(item, 'startTime', true)
        } else {
          this.$set(item, 'startTime', false)
        }
        if (item.date === this.endTime) {
          this.$set(item, 'endTime', true)
        } else {
          this.$set(item, 'endTime', false)
        }
      })
      // range范围上色
      if (this.startTime && this.endTime) {
        for (let i = 0; i < this.currentDays.length; i++) {
          if (this.startTime < this.currentDays[i].date && this.endTime > this.currentDays[i].date) {
            this.currentDays[i].inRange = true
          } else {
            this.currentDays[i].inRange = false
          }
          // if (this.endTime === this.currentDays[i + 1].date) {
          //   break
          // }
        }
      }
      console.log(this.currentDays)
      // console.log(this.startTime + '===' + this.endTime)
    }
  }
}
</script>
<style lang="stylus" scoped>
.calendar {
  background-color: #fff;
  width: 100%;
  border: 1px solid #E8E8E8;

  .calendar-table {
    width: 100%;

    thead {
      display: flex;

      tr {
        flex: 1;
        text-align: center;
        padding: 20px 0;
        border-right: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;
      }
    }

    tbody {
      display: flex;
      flex-wrap: wrap;

      .calendar-day {
        width: calc((100% / 7));
        box-sizing: border-box;
        text-align: center;
        line-height: 1rem; /* 50/50 */
        border-right: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;
      }

      .prev {
        background-color: #F7F7F7;
      }

      .current {
        background-color: #fff;
      }

      .in-range {
        background-color: #fcd3cf;
      }

      .start-time, .end-time {
        color: #fff;
        background-color: red;
      }

      .today {
        color: #3296FF;
        background-color: #EBF5FF;
      }

      .next {
        background-color: #F7F7F7;
      }
    }
  }
}
</style>
