<template lang='pug'>
  .VisualEditor
    vue-drag-res.Page(
      v-for='page, i in surveyData.pages'
      :parent='true'
      :resizable='false'
      :x='page.position ? page.position.x : 25'
      :y='page.position ? page.position.y : 25'
      :minw='300'
      :minh='400'
      :grid='[25,25]'
      :key='page.name'
      @activated='onActivate(i)'
      @deactivated='onDeactivate'
      @resizing='onResize'
      @dragging='onDrag'
      @dragstop='onDragStop'
    )
      .Page-container
        .Page-header
          h4 {{ page.title }}
        .Page-body
          .Question-list
            .Question-item(v-for='question, j in page.elements')
              p {{ question.type }}
              p {{ question.title[surveyData.locale] }}
        .Page-footer
          span footer
</template>

<script>
import * as SurveyVue from 'survey-vue'
import { mapGetters, mapMutations } from 'vuex'

let Survey = SurveyVue.Survey
Survey.cssType = 'bootstrap'

export default {
  name: 'visualEditor',
  computed: {
    ...mapGetters({
      surveyData: 'getSurveyData'
    })
  },
  data () {
    return {
      activePage: 0
    }
  },
  methods: {
    ...mapMutations([
      'setSurveyData'
    ]),
    onActivate (activePage) {
      this.activePage = activePage
    },
    onDeactivate () {},
    onResize () {},
    onDrag () {},
    onDragStop (x, y) {
      this.surveyData.pages[this.activePage].position.x = x
      this.surveyData.pages[this.activePage].position.y = y
      this.setSurveyData(this.surveyData)
    }
  }
}
</script>

<style lang='stylus'>
  .VisualEditor {
    position relative
    margin 1em
    min-height 1000px
    width 100%
    background-color $lightGrey

    .Page {
      background-color #fff
      border 1px solid $darkBlue
      user-select none

      &:active {
        outline 2px solid $darkBlue
      }

      &-container {
        display flex
        flex-direction column
        padding .5em
      }
    }
  }
</style>
