<template>
  <div class="my-test">
    <button>试试看呢</button>
  </div>
</template>

<script>
export default {
  created() {
    const {
      name,
      age,
      info: { sport: sport2 }
    } = this.getObj()
    console.log(name)
    console.log(age)
    console.log(sport2)
  },
  methods: {
    getObj() {
      return {
        name: 'lx',
        age: 18,
        info: {
          favitor: 'singer',
          sport: 'basket'
        }
      }
    }
  }
}
</script>

<style></style>
