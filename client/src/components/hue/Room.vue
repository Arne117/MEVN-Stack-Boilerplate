<template lang='pug'>
  .Room
    h4.Room-headline.Hue-headline test {{ id }}
    //- .Room-list.Hue-list
    //-   .Room-item.Hue-item(
    //-     v-for='room, i in rooms'
    //-     :class='room.state.any_on === true ? "active" : ""'
    //-     :data-id='i'
    //-     )
    //-     .Room-header.Hue-header
    //-       input.Hue-color(:style='room.state.xy' type='color' value='')
    //-       input.Hue-switch(
    //-         type='checkbox'
    //-         name='Hue-switch'
    //-         :checked='room.state.any_on'
    //-         @click='updateRoom(i, { on: $event.target.checked })'
    //-         )
    //-     .Room-body.Hue-body
    //-       .Room-icon.Hue-icon
    //-         img(:src='getAssetUrl(room.class)')
    //-       .Room-name.Hue-name {{ room.name }} ({{ room.lights.length }})
    //-     .Room-footer.Hue-footer
</template>

<script>
  import HueService from '@/services/HueService'

  export default {
    name: 'Room',
    data () {
      return {
        interval: {}
      }
    },
    mounted: {
      // this.getRoom()
      // setInterval(() => {
      //   this.getRoom()
      // }, 10000)
    },
    props: {
      id: {
        type: Number,
        default: 1
      }
    },
    methods: {
      async getRoom (i) {
        const response = await HueService.getRoom(i)
        this.room = response.data
      },
      getAssetUrl (asset) {
        return `/static/Product/filled/SVG/${asset}.svg`
      }
    }
  }
</script>

<style lang='stylus' scoped>

</style>
