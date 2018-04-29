<template lang='pug'>
  #app
    Header
    .PageContent
      transition(name='fade' mode='out-in')
        router-view
    Footer
</template>

<script>
import Header from './components/page/Header'
import Footer from './components/page/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang='stylus'>
#app {
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  text-align center
  background-color white

  .PageContent {
    min-height 50vh
  }

  .btn-outline-primary {
    color $darkGreen
    border-color $darkGreen

    &:hover,
    &:active {
      color white
      background-color $darkGreen
    }
  }
}
</style>
