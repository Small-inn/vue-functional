<template>
    <div class="carousel">
        <carousel></carousel>
    </div>
</template>
<script>
import { widthScreen } from '@/assets/js/util.js'
import carousel from './child.vue'
export default {
    components: {
        carousel
    },
    created() {
        console.log(widthScreen)
    }
}
</script>
<style lang="stylus" scoped>

</style>
