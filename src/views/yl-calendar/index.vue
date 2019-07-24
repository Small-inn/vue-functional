<template>
  <div class="contain">
    <router-link to="/" class="return-contain" tag="div">
      <span class="return">返回上一级</span>
    </router-link>
    <calendar></calendar>
  </div>
</template>
<script>
import calendar from './calendar'
import { mapGetters } from 'vuex'
export default {
  components: {
    calendar
  },
  computed: {
    ...mapGetters(['username'])
  },
  created() {
    console.log(this)
    console.log(this.username)
    this.$bus.$emit('loading', true)
    this._loading()
  },
  methods: {
    _loading() {
      setTimeout(() => {
        this.$bus.$emit('loading', false)
      }, 1500)
    }
  }
}
</script>
<style lang="stylus" scoped>
.contain {
  padding-top: 0.4rem;
}

.return-contain {
  width: 100%;
  display: flex;
  justify-content: center;
}

.return {
  display: inline-block;
  text-align: center;
  padding: 0 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: pink;
  border-radius: 4px;
}
</style>
