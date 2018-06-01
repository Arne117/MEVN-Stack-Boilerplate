<template lang='pug'>
  header.Header
    nav.Header-nav.site-header.sticky-top.py-1
      .container.d-flex.flex-md-row
        ul.Header-list
          li.py-2
            router-link.Header-item( :to="{ name: 'Home', params: {} }" tag='a' active-class='active' exact) Home
          //- li.py-2
          //-   router-link.Header-item( :to="{ name: 'Home', params: {}, hash: '#data' }" tag='a' active-class='active' exact) Scroll to #data
          li.py-2
            router-link.Header-item( :to="{ name: 'Posts' }" tag='a' active-class='active') Post
          li.py-2
            router-link.Header-item( :to="{ name: 'VuexComponent' }" tag='a' active-class='active') Vuex
          li.py-2
            router-link.Header-item( :to="{ name: 'Hue' }" tag='a' active-class='active') Hue
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang='stylus' scoped>
  .Header {
    background-color $blueBlack

    &-nav {
      margin auto
      width 100%
    }

    &-list {
      display flex
      list-style none
      margin-bottom 0
    }

    &-item {
      padding 10px
      color $green
      text-decoration none

      &.active {
        border-bottom 3px solid $green
      }
    }
  }
</style>
