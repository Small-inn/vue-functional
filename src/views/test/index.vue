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
    this.getArr()
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
    },
    getArr() {
      let [num1, num2, ...otherarr] = [1, 2, 3, 4]
      let [num3, , , num4] = [5, 6, 7, 8]

      console.log(num1)
      console.log(num2)
      console.log(otherarr)
      console.log(num3)
      console.log(num4)
    }
  }
}
</script>

<style></style>
