<template lang='pug'>
  .Survey.p-md-5.m-md-3
    .Survey-center
      h1 Umfragen
      transition(name='fade' mode='out-in')
        router-view
</template>

<script>
export default {

}
</script>

<style lang='stylus' scoped>
  .Survey {
    display flex
    flex-direction column

    &-center {
      width 100%
    }
  }
</style>
