<template lang='pug'>
  .Hue
    .Sidebar
      ul.Sidebar-list
        router-link.Sidebar-item(:to='{ name: "Rooms" }' tag='li' active-class='active')
          img.Sidebar-icon(src='/static/Rooms/SVG/frontdoor.svg' alt='Räume')
        router-link.Sidebar-item(:to='{ name: "Lights" }' tag='li' active-class='active')
          img.Sidebar-icon(src='/static/Product/filled/SVG/classicbulb.svg' alt='Lichter')
    .Hue-center.p-md-5.m-md-3
      h1 Hue Steuerung
      transition(name='fade' mode='out-in')
        router-view
</template>

<script>
  export default {
    name: 'Hue',
    mounted () {
      this.$router.push({ name: 'Rooms' })
    }
  }
</script>

<style lang='stylus'>
  .Hue {
    display flex

    &-center {
      width 100%
    }
  }

  .Sidebar {
    margin 0
    width 50px

    background-color $blueBlack

    &-list {
      display flex
      flex-direction column
      list-style none
    }

    &-item {
      height 50px
      width 50px
      margin 10px 0 0
      padding 10px
      cursor pointer

      &.active {
        background-color $darkBlue

        .Sidebar-icon {
          filter invert(100%) drop-shadow(0 0 1rem white)
        }
      }

      &:hover {
        background-color lighten($darkBlue, 10%)
      }
    }

    &-icon {
      max-width 100%
      filter invert(90%)
    }
  }

  .Light,
  .Hue {

    &-headline {
      margin-top 1rem
      text-align left
    }

    &-list {
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content start
      margin 0
    }

    &-item {
      margin .5rem
      height 150px
      width 150px

      background-color $blueBlack
      border 1px solid transparent
      color $lightGrey
      cursor pointer

      &.active {
        // background-color $green
        border 1px solid $green
        color #fff

        .Hue-icon,
        .Light-icon {
          filter invert(100%) drop-shadow(0 0 1rem white)
        }
      }

      &:hover {
        background-color $darkBlue
      }
    }

    &-header {
      display flex
      flex-direction row
      justify-content space-between
      margin 3px
    }

    &-color {
      -webkit-appearance none
      border none
      width 25px
      height 25px
      padding 0
      margin 2px
      background-color transparent
      border 1px solid #fff
      border-radius 25px
      cursor pointer

      &::-webkit-color-swatch-wrapper {
        padding 0
      }

      &::-webkit-color-swatch {
        border-radius 25px
      }
    }

    &-switch {
      margin 5px
    }

    &-icon {
      max-width 50px
      margin auto
      filter invert(50%)
    }

    &-name {
      min-height 48px
    }

    &-footer {
      display flex
      flex-direction row
      align-items baseline
      justify-content left
    }

    &-status {
      width 10px
      height 10px
      display inline-block
      margin 0 4px
      border-radius 50%
      background-color $lightGrey

      &.online {
        background-color $green
      }

      &.offline {
        background-color $orange
      }
    }

    // &-switch {
    //   position relative
    //   width 86px
    //   user-select none
    //
    //   &-checkbox {
    //     display none
    //
    //     &:checked + .Light-switch-label {
    //       .Light-switch-inner {
    //         margin-left: 0
    //       }
    //       .Light-switch-dragger {
    //         right 0px
    //       }
    //     }
    //   }
    //
    //   &-label {
    //     display block
    //     overflow hidden
    //     cursor pointer
    //     border 2px solid #999999
    //     border-radius 50px
    //   }
    //
    //   &-inner {
    //     display block
    //     width 200%
    //     margin-left -100%
    //     transition margin 0.3s ease-in 0s
    //
    //     &:before,
    //     &:after {
    //       display block
    //       float left
    //       width 50%
    //       height 24px
    //       padding 0
    //       line-height 24px
    //       font-size 18px
    //       color white
    //       font-weight bold
    //       box-sizing border-box
    //     }
    //
    //     &:before {
    //       content 'ON'
    //       padding-left 12px
    //       background-color #34A7C1
    //       color: #fff
    //     }
    //
    //     &:after {
    //       content 'OFF'
    //       padding-right 12px
    //       background-color #EEEEEE
    //       color #999999
    //       text-align right
    //     }
    //   }
    //
    //   &-dragger {
    //     display block
    //     position absolute
    //     top 0
    //     bottom 0
    //     right 58px
    //     width 31px
    //     margin -3.5px
    //
    //     background #fff
    //     border 2px solid #999999
    //     border-radius 50px
    //     transition: all 0.3s ease-in 0s
    //   }
    // }
  }
</style>
