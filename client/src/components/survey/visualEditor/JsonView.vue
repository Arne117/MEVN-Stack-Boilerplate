<template lang='pug'>
  .JsonView
    h4 JSON
    .JsonView-container
      button.Button(
        @click='options.modifiable = !options.modifiable'
        ) {{ options.modifiable ? 'Done' : 'Edit' }}
      tree-view(
        :data='getSurvey'
        :options='options'
        @change-data="onChangeData"
      )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'survey-editor',
  computed: {
    ...mapGetters([
      'getSurvey'
    ])
  },
  data () {
    return {
      options: {
        maxDepth: 5,
        modifiable: false
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSurvey'
    ]),
    onChangeData (data) {
      console.log(data)
      this.setSurvey(data)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .JsonView {
    max-width 800px
    margin auto

    text-align left
    &-container {
      position relative
      padding 1em

      border 1px solid $darkBlue

      .Button {
        position absolute
        right 10px
        top 10px
        z-index 1
      }
    }
  }
</style>
