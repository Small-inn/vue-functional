<template>
  <div>
    <uploader
      class="img-list"
      :files="imgList"
      @uploadend="uploadEnd">
    </uploader>
  </div>
</template>

<script>
import uploader from './child/upload.vue'
export default {
  components: {
    uploader
  },
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    uploadEnd() {}
  }
}
</script>

<style>

</style>

