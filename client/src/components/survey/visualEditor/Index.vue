<template lang='pug'>
  .VisualEditor(v-if='getSurvey')
    .EditArea(@click='setActivePage(null, $event)')
      vue-drag-res.Page(
        v-for='page, i in getSurvey.pages'
        :parent='true'
        :resizable='false'
        :x='page.position ? page.position.x : 25'
        :y='page.position ? page.position.y : 25'
        :minw='300'
        :minh='400'
        :grid='[12.5, 12.5]'
        :key='page.name'
        @activated='onActivate(i)'
        @deactivated="onDeactivate"
        @dragging='onDrag'
        @dragstop='onDragStop'
        drag-handle='.DragHandle'
      )
        .Page-container(@click='setActivePage(i, $event)')
          .Page-header
            i.DragHandle.fa.fa-arrows(aria-hidden='true')
            h4 {{ page.title }}
          .Page-body
            draggable.Question-list(
              element='ul'
              v-model='page.elements'
              :options='dragOptions'
              :move='onMove'
              @start='isDragging=true'
              @end='isDragging=false'
            )
              transition-group.Question-transition(type='transition' :name='"flip-list"')
                li.Question-item(v-for='question, j in page.elements' :key='question.name') {{ question.title[getSurvey.locale] }}
                  //- component(:is='question.type') {{ question.type }}
                  //- checkbox

            //- draggable(element='span' v-model='list2' :options='dragOptions' :move='onMove')
            //-   transition-group(name='no' class='list-group' tag='ul')
            //-     li(class='list-group-item' v-for='element in list2' :key='element.order') {{element.name}}
          .Page-footer
    //- Sidebar
    .Sidebar
      .Sidebar-container
        .Sidebar-questions(
          :class='sidebarContent === "questions" ? "active" : ""')
          .Sidebar-header
            h5 Questiontypes
          .Sidebar-body
            .Sidebar-question(v-for='question, i in Survey.ElementFactory.Instance.getAllTypes()') {{ question }}
        .Sidebar-pages(:class='sidebarContent === "pages" ? "active" : ""')
          .Sidebar-header
            h5 Pages
          .Sidebar-body
</template>

<script>
import * as SurveyVue from 'survey-vue'
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'

window.Survey = SurveyVue
let Survey = SurveyVue.Survey
Survey.cssType = 'bootstrap'

export default {
  name: 'visualEditor',
  components: {
    SurveyVue,
    checkbox: SurveyVue.Checkbox,
    draggable
  },
  computed: {
    ...mapGetters([
      'getSurvey'
    ])
  },
  data () {
    return {
      activePage: 0,
      sidebarContent: 'pages',
      surveyData: {},
      Survey: SurveyVue,
      dragOptions: {
        ghostClass: 'Question-item--moving'
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSurvey'
    ]),
    onActivate (activePage) {
      this.activePage = activePage
      this.sidebarContent = 'questions'
    },
    onDeactivate () {
      this.activePage = 0
      this.sidebarContent = 'pages'
    },
    onDrag (x, y) {},
    onDragStop (x, y) {
      // this.survey.pages[this.activePage].position.x = x
      // this.survey.pages[this.activePage].position.y = y
      // console.log(this.survey)
      // this.setSurvey(this.survey)
    },
    setActivePage (activePage, $event) {
      document.querySelectorAll('.Page').forEach(el => el.classList.remove('active'))
      if ($event.target.classList.contains('EditArea')) return
      $event.target.parentNode.classList.add('active')
      this.activePage = activePage
      this.sidebarContent = 'questions'
    },
    onMove () {}
  }
}
</script>

<style lang='stylus'>
.VisualEditor {
  display flex
  flex-direction row
  min-height 1000px

  .EditArea {
    position relative
    padding 1em
    width 100%
    background-color $lightGrey

    .Page {
      background-color #fff
      border 1px solid $darkBlue
      user-select none

      &.active {
        outline 2px solid $darkBlue
      }

      &.dragging {
        box-shadow 2px 2px 5px 0px #000
      }

      &-container {
        display flex
        flex-direction column
        padding .5em
        height 100%
      }

      &-header {
        display flex
        flex-direction row
        justify-content space-between

        border-bottom 1px solid $darkBlue

        .DragHandle {
          padding .25em

          cursor grab
        }
      }

      &.dragging {
        .DragHandle {
          cursor grabbing
        }
      }

      .Question {
        &-list {

        }

        &-transition {
          display flex
          flex-direction column
        }

        &-item {
          padding .5em

          border-bottom 1px solid $darkBlue

          &--moving {
            opacity 0.5
            background $lightGrey
          }
        }
      }

      .flip-list-move {
        transition transform 0.5s
      }
    }
  }

  .Sidebar {
    width 300px

    background-color #fff
    border 1px solid $darkBlue

    &-container {
      padding 1em
    }

    &-questions {
      display none

      &.active {
        display block
      }
    }

    &-pages {
      display none

      &.active {
        display block
      }
    }
  }
}
</style>
