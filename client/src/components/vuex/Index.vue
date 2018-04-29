<template lang='pug'>
  .container
      h1 Vuex
      Result
      Counter
      SecondCounter
      Search
</template>

<script>
  import Counter from './Counter.vue'
  import SecondCounter from './SecondCounter.vue'
  import Result from './Result.vue'
  import Search from './Search.vue'

  export default {
    components: {
      Counter,
      SecondCounter,
      Result,
      Search
    }
  }
</script>

<style lang="stylus">

</style>
