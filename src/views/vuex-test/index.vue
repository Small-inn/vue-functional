<template>
  <div class="vuex">
    <button @click="ADD_COUNT">按钮</button>
    <div>{{shopCount}}</div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopCount'])
  },
  mounted () {
    console.log(this.shopCount)
  },
  methods: {
    // 事件名必须要跟mutations定义的名称一致
    ...mapMutations(['ADD_COUNT'])
  }
}
</script>
<style lang="stylus" scoped></style>
