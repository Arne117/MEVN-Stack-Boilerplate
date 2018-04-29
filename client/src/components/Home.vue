<template lang="pug">
  .p-md-5.m-md-3
    .col-md-5.p-lg-5.mx-auto.my-2
      h1 A / B Test check
      p.lead(for='url') Geben sie die URL der Webseite ein
      input.d-block.mx-auto.my-3(type='url' name='url' v-model='url' placeholder='www.example.com' v-on:keydown.enter='check' required)
      a.btn.btn-lg.btn-outline-primary(@click.prevent='check') check now
    .p-lg-3
      select(v-model='currentStep')
        option(value='one') v1
        option(value='two') v2
        option(value='three') v3
        option(value='four') v4
      transition(name='fade' mode='out-in')
        keep-alive
          component(:is='currentStep')
      h2 Essential Links
      ul
        li
          a(href='http://vuejs-templates.github.io/webpack/' target='_blank') Docs for This Template
      h2 Ecosystem
      ul(style='height:1000px')
        li
          a(href='http://router.vuejs.org/' target='_blank') vue-router
        li
          a(href='http://vuex.vuejs.org/' target='_blank') vuex
        li
          a(href='http://vue-loader.vuejs.org/' target='_blank') vue-loader
        li
          a(href='https://github.com/vuejs/awesome-vue' target='_blank') awesome-vue
      section#data test
</template>

<script>
import one from './test/one'
import two from './test/two'
import three from './test/three'
import four from './test/four'

export default {
  name: 'hello',
  data () {
    return {
      currentStep: 'one',
      url: undefined
    }
  },
  components: {
    one,
    two,
    three,
    four
  },
  methods: {
    check () {
      // axios
    }
  }
}
</script>

<style lang="stylus" scoped>
h1, h2 {
  font-weight normal
  color $blueBlack
}
</style>
