<template lang='pug'>
  .Light
    h2.Light-headline Lichter
    .Light-list
      .Light-item(
        v-for='light, i in lights'
        :class='light.state.on === true ? "active" : ""'
        :data-id='i'
        )
        .Light-header
          input.Light-color(:style='light.state.xy' type='color' value='')
          input.Light-switch(
            type='checkbox'
            name='Light-switch'
            :checked='light.state.on'
            @click='updateLight(i, { on: $event.target.checked })'
            )
        .Light-body
          .Light-icon
            img(:src='getAssetUrl(light.config.archetype)')
          .Light-name {{ light.name }}
        .Light-footer
          .Light-status(:class='light.state.reachable === true ? "online" : "offline"')
</template>

<script>
  import HueService from '@/services/HueService'
  // import lights from './lightsData'

  export default {
    beforeRouteLeave (to, from, next) {
      clearInterval(this.interval)
      next()
    },
    data () {
      return {
        lights: {},
        interval: {}
      }
    },
    mounted () {
      this.getLights()
      this.interval = setInterval(() => {
        this.getLights()
      }, 10000)
    },
    methods: {
      async getLights () {
        const response = await HueService.getLights()
        this.lights = response.data
      },
      getAssetUrl (asset) {
        return `/static/Product/filled/SVG/${asset}.svg`
      },
      async updateLight (i, data) {
        const response = await HueService.updateLight(i, data)
        console.log(response)
      }
    }
  }
</script>

<style lang='stylus' scoped>
.Light {

  &-headline {
  }

  &-list {
  }

  &-item {
  }

  &-header {
  }

  &-color {
  }

  &-switch {
  }

  &-icon {
  }

  &-name {
  }

  &-footer {
  }

  &-status {
  }
}
</style>
