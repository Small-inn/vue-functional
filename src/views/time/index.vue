<template>
  <div class="time">
    <p>{{time}}</p>
  </div>
</template>
<script>
import moment from 'moment'
export default {

  data() {
    return {
      time: '',
      timer: null
    }
  },
  created() {
    this.retTime()
  },
  methods: {
    retTime() {
      // clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time = moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped></style>
