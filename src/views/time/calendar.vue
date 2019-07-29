<template>
  <div class="calendar">
    <div class="calendar-header"></div>
    <div class="calendar-body">
      <table class="calendar-table">
        <thead>
          <tr v-for="(item, index) in weeks" :key="index">{{item}}</tr>
        </thead>
        <tbody>
          <div class="calendar-day" v-for="(item, index) in currentDays" :key="index">{{item.text}}</div>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
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
      currMonth: new Date().getMonth(),
      currDay: new Date().getDate(), // 几号
    }
  },
  mounted() {
    this.init()
    console.log(this.firstDayOfWeek)
    console.log(this.currentDays)
    console.log(this.prevDays)
    console.log(this.nextDays)
  },
  methods: {
    init(year = 2019, month = 7) {
      let currentMonthDays = new Date(year, month, 0).getDate()
      console.log(currentMonthDays)

      // 获取当前月份天数
      for (let i = 0; i < currentMonthDays; i++) {
        this.currentDays.push({
          text: i + 1,
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.calendar {
  background-color: #fff;
  width: 100%;

  .calendar-table {
    width: 100%;

    thead {
      display: flex;

      tr {
        flex: 1;
        text-align: center;
        padding: 20px 0;
      }
    }

    tbody {
      tr {
        display: flex;
        flex-wrap: wrap;

        .calendar-day {
          flex: 1;
        }
      }
    }
  }
}
</style>
