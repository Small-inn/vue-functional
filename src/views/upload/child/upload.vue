<template>
  <div class="uploader" v-show="files.length < maxNums">
    <label for="inputFile">
      <img class="img" :src="CDN_BASE_URL + 'juneAct/plac.png'" alt="">
      <span class="count-icon">{{files.length}}/6</span>
    </label>
    <input
      ref="input"
      type="file"
      id="inputFile"
      multiple="multiple"
      class="input-file"
      @change="onChange">
  </div>
</template>

<script>
import compressFile from '@/assets/js/compressFile.js'
import { CDN_BASE_URL } from '@/api/config'
export default {
  props: {
    maxNums: {
      type: Number,
      default: 6
    },
    files: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      CDN_BASE_URL,
      listImg: []
    }
  },
  methods: {
    async onChange(event) {
      console.log('上传中')
      this.listImg = []
      const list = this.$refs.input.files
      if (list.length >= 6 || list.length > this.maxNums - this.files.length) { return }
      for (let i = 0; i < list.length; i++) {
        const content = await compressFile(list[i])
        const res = await this.submit(content)
        this.listImg.push(res.data.data)
      }
      console.log('上传完成')
      this.$emit('uploadend', this.listImg)
      this.resetInput()
    },
    async submit(file) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        return this.instance.post('http://ininwb.life.cntaiping.com/tpyl-taiping/user/commUpload', formData)
      }
      catch (err) {
        console.log(err)
      }
    },
    resetInput() {
      if (this.$refs.input) this.$refs.input.value = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .uploader
    display inline-block
    .count-icon
      font-size .26rem /* 13/50 */
      color #999
      position absolute
      top .06rem /* 3/50 */
      right .06rem /* 3/50 */
    .input-file
      display none
</style>

