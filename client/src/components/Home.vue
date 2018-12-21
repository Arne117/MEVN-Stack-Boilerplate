<template lang="pug">
  .p-md-5.m-md-3
    //- img(src='@/assets/logo.png')
    //- img(src='/static/Rooms/SVG/gym.svg')
    .col-md-5.p-lg-5.mx-auto.my-2
      h1 Bachelor thesis
      router-link( :to="{ name: 'ListSurveys' }" tag='a' ) Surveys
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
</style>
