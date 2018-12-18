<template lang='pug'>
  .VisualEditor(v-if='surveyData')
    .EditArea(@click.self='setEditAreaActive($event)')
      vue-drag-res.Page(
        v-for='page, i in surveyData.pages'
        :class='activePage === i ? "active" : ""'
        :parent='true'
        :resizable='false'
        :x='page.position ? page.position.x : 25'
        :y='page.position ? page.position.y : 25'
        :minw='300'
        :minh='400'
        :grid='[12.5, 12.5]'
        :key='page.name'
        @activated='onPageDragActivate(i)'
        @deactivated="onPageDragDeactivate"
        @dragging='onPageDrag'
        @dragstop='onPageDragStop'
        drag-handle='.DragHandle'
      )
        .Page-container(@click='setPageActive(i, $event)')
          .Page-header
            i.DragHandle.fa.fa-arrows(aria-hidden='true')
            h4 {{ page.title }}
          .Page-body
            draggable.Question-list(
              element='ul'
              v-model='page.elements'
              :options='dragOptions'
              :move='onQuestionMove'
              @start='isDragging=true'
              @end='isDragging=false'
            )
              li.Question-item(
                v-for='question, j in page.elements' :key='question.name'
                :class='activeQuestion.name === question.name ? "active" : ""'
                @click.self='setQuestionActive(question, $event)'
                ) {{ question.title[surveyData.locale] }}
                .QuestionDetails
                  .QuestionDetails-container
                    .QuestionDetails-header {{ question.type }}
                    .QuestionDetails-body
                    //- component(:is='question.type')
                    //- checkbox

            //- draggable(element='span' v-model='list2' :options='dragOptions' :move='onMove')
            //-   transition-group(name='no' class='list-group' tag='ul')
            //-     li(class='list-group-item' v-for='element in list2' :key='element.order') {{element.name}}
          .Page-footer
    //- Sidebar
    .Sidebar
      .Sidebar-container
        .Sidebar-questionDetails(v-show='sidebarContent === "questionDetails"')
          .Sidebar-header
            h5 Question details
          .Sidebar-body(v-if='activeQuestion.title')
            .Sidebar-settings
              label(for='questionTitle') Question title
              input(v-model='activeQuestion.title[surveyData.locale]' name='questionTitle')
              label(for='questionName') Question name
              input(v-model='activeQuestion.name' name='questionName')
              label(for='questionRequired') Question required
              input(type='checkbox' v-model='activeQuestion.isRequired')

        .Sidebar-questions(v-show='sidebarContent === "questions"')
          .Sidebar-header
            h5 Questiontypes
          .Sidebar-body
            draggable.Question-list(
              element='ul'
              v-model='Survey.ElementFactory.Instance.getAllTypes()'
              :options='{group:{ pull:"clone", put:false }, sort: false}'
              :move='onQuestionMove'
              @start='isDragging=true'
              @end='isDragging=false'
            )
              li.Sidebar-question.Question-item(v-for='question, i in Survey.ElementFactory.Instance.getAllTypes()' :key='question') {{ question }}
        .Sidebar-general(v-show='sidebarContent === "general"')
          .Sidebar-header
            h5 Settings
          .Sidebar-body(v-if='surveyData')
            .Sidebar-settings
              label(for='surveyTitle') Survey title
              input(v-model='surveyData.title' name='surveyTitle')
            button.Button(@click='addNewPage') New page
</template>

<script>
import * as SurveyVue from 'survey-vue'
import draggable from 'vuedraggable'
import { mapMutations } from 'vuex'

import SurveyService from '@/services/SurveyService'

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
  data () {
    return {
      activePage: undefined,
      activeQuestion: {},
      sidebarContent: 'general',
      surveyData: undefined,
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
    addNewPage () {
      this.surveyData.pages.push({
        title: `Seite ${this.surveyData.pages.length + 1} Titel`,
        name: `Seite ${this.surveyData.pages.length + 1}`,
        position: this.getPagePosition(),
        elements: []
      })
    },
    async getSurvey () {
      const response = await SurveyService.getSurvey({
        id: this.$route.params.id
      })
      this.surveyData = response.data
    },
    getPagePosition () {
      const length = this.surveyData.pages.length
      const pages = this.surveyData.pages
      const y = length % 3 === 0 ? pages[length - 1].position.y + 425 : pages[length - 1].position.y
      if (length % 3 === 0) return { x: 25, y }
      if (length % 3 === 1) return { x: 375, y }
      if (length % 3 === 2) return { x: 725, y }
    },
    onPageDragActivate (activePage) { this.activePage = activePage },
    onPageDragDeactivate () { this.activePage = undefined },
    onPageDrag (x, y) { /* collision handler */ },
    onPageDragStop (x, y) {
      this.surveyData.pages[this.activePage].position.x = x
      this.surveyData.pages[this.activePage].position.y = y
    },
    onQuestionMove () {},
    setPageActive (activePage, $event) {
      console.log('setPageActive')
      if ($event.target.classList.contains('Question-item')) {
        this.activePage = activePage
        this.sidebarContent = 'questionDetails'
      } else {
        this.activePage = activePage
        this.activeQuestion = {}
        this.sidebarContent = 'questions'
      }
    },
    setEditAreaActive ($event) {
      console.log('setEditAreaActive')
      this.sidebarContent = 'general'
      this.activePage = undefined
      this.activeQuestion = {}
    },
    setQuestionActive (activeQuestion, $event) {
      console.log('setQuestionActive')
      this.activeQuestion = activeQuestion
      this.sidebarContent = 'questionDetails'
    }
  },
  mounted () {
    this.getSurvey()
  },
  watch: {
    surveyData: {
      handler (now, before) {
        // console.log('survey changed')
        this.setSurvey(this.surveyData)
      },
      deep: true
    }
  }
}
</script>

<style lang='stylus'>
.VisualEditor {
  display flex
  flex-direction row
  min-height 1300px

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
    }
  }

  .Question {
    &-list {
      margin-top .5em
      display flex
      flex-direction column
    }

    &-item {
      padding .5em
      margin-bottom .5em

      border 1px solid transparent
      background-color $lightBlue
      border-radius 10px
      cursor pointer

      &.active {
        border 1px solid $darkBlue

        .QuestionDetails {
          display flex
        }
      }

      &--moving {
        opacity 0.5
        background $lightGrey
        cursor grabbing
      }
    }
  }

  .QuestionDetails {
    display none

    &-container {}
    &-header {}
    &-body {}
  }

  .Sidebar {
    width 300px

    background-color #fff
    border 1px solid $darkBlue

    &-container {
      padding 1em
    }

    &-settings {
      margin 1em 0

      label, input {
        text-align left
        width 100%
      }
    }
  }
}
</style>
