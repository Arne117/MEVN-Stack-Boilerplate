<template lang='pug'>
  .Rooms
    h2.Rooms-headline.Hue-headline Räume
    .Rooms-list.Hue-list
      .Rooms-item.Hue-item(
        v-for='room, i in rooms'
        :class='room.state.any_on === true ? "active" : ""'
        :data-id='i'
        )
        .Rooms-header.Hue-header
          input.Hue-color(:style='room.state.xy' type='color' value='')
          input.Hue-switch(
            type='checkbox'
            name='Hue-switch'
            :checked='room.state.any_on'
            @click='updateRoom(i, { on: $event.target.checked })'
            )
        router-link.Rooms-body.Hue-body(:to='{ name: "Room", params: {id: i} }' tag='div' active-class='active')
          .Rooms-icon.Hue-icon
            img(:src='getAssetUrl(room.class)')
          .Rooms-name.Hue-name {{ room.name }} ({{ room.lights.length }})
        .Rooms-footer.Hue-footer
    transition(name='fade' mode='out-in')
      router-view
</template>

<script>
  import HueService from '@/services/HueService'
  // import roomData from './roomData'

  export default {
    beforeRouteLeave (to, from, next) {
      clearInterval(this.interval)
      next()
    },
    name: 'Rooms',
    data () {
      return {
        rooms: {}
        // rooms: roomData
      }
    },
    mounted () {
      this.getRooms()
      this.interval = setInterval(() => {
        this.getRooms()
      }, 10000)
    },
    methods: {
      async getRooms () {
        const response = await HueService.getRooms()
        this.rooms = response.data
      },
      getAssetUrl (asset) {
        return `/static/Rooms/SVG/${asset.toLowerCase().replace(/\s.*/, '')}.svg`
      },
      async updateRoom (i, data) {
        console.log(data)
        const response = await HueService.updateRoom(i, data)
        console.log(response)
      }
    }
  }
</script>

<style lang='stylus'>
  .Rooms {

    &-list {

    }

    &-item {

    }
  }
</style>
