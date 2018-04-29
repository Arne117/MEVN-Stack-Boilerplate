<template lang='pug'>
  footer.Footer
    .container.py-5
      .row
        .col-12.col-md.Footer-block
          h5.Footer-headline Arne Rolf
          small.d-block.mb-3.text-muted &copy; {{year}}
        .col-6.col-md.Footer-block
          h5.Footer-headline Features
          ul.text-small.Footer-list
            li
              a.Footer-item(href='#') Cool stuff
            li
              a.Footer-item(href='#') Random feature
            li
              a.Footer-item(href='#') Team feature
            li
              a.Footer-item(href='#') Stuff for developers
            li
              a.Footer-item(href='#') Another one
            li
              a.Footer-item(href='#') Last time
        .col-6.col-md.Footer-block
          h5.Footer-headline Resources
          ul.text-small.Footer-list
            li
              a.Footer-item(href='#') Resource
            li
              a.Footer-item(href='#') Resource name
            li
              a.Footer-item(href='#') Another resource
            li
              a.Footer-item(href='#') Final resource
</template>

<script>
  export default {
    data () {
      return {
        year: new Date().getFullYear()
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .Footer {
    background-color $blueBlack

    &-block {
      color $green
    }

    &-headline {
      color $lightGreen
    }

    &-list {
      display flex
      flex-direction column
      list-style none
    }

    &-item {
      color $darkGreen

      &:hover {
        color $green
      }
    }

  }
</style>
