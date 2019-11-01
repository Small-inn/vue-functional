<template>
    <div class="calendar">
        <div class="text" @click="visible">日历区间</div>
        <nut-calendar
            :is-visible="isVisible"
            :default-value="date"
            type="range"
            @close="switchPicker('isVisible')"
            @choose="setChooseValue"
            :animation="`nutSlideUp`"
            :start-date="null"
        >
        </nut-calendar>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isVisible: false,
      // date: null
      date: ''
    }
  },
  methods: {
    visible () {
      this.isVisible = true
    },
    switchPicker () {
      this.isVisible = false
    },
    setChooseValue () {}
  }
}
</script>
<style lang="stylus" scoped>
.calendar
    text-align center
    .text
        height .88rem
        line-height .88rem
</style>
