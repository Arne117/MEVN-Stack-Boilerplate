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
                v-for='question, j in page.elements'
                :key='question.questionsID'
                :class='activeQuestion.questionsID === question.questionsID ? "active" : ""'
                @click='setQuestionActive(question, $event)'
                )
                .EndNode(
                  v-show='activeStartNode || question.connectedToQuestion'
                  @click='connectQuestions(question)'
                  :class='question.connectedToQuestion ? "connected" : "" '
                  :data-questionsID='question.questionsID'
                  )
                .QuestionDetails
                  .QuestionDetails-container
                    .QuestionDetails-header
                      span.QuestionDetails-title {{ question.title[surveyData.locale] }}
                      i.QuestionDetails-handle.fa.fa-bars(aria-hidden='true')
                    .QuestionDetails-body
                      component(:is='question.type' v-bind='{ question: question, language: surveyData.locale }')
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
              input(v-model='activeQuestion.title[surveyData.locale]' id='questionTitle')
              label(for='questionName') Question name
              input(v-model='activeQuestion.name' id='questionName')
              label(for='questionRequired') Question required
              input(type='checkbox' v-model='activeQuestion.isRequired' id='questionRequired')

        .Sidebar-questions(v-show='sidebarContent === "questions"')
          .Sidebar-header
            h5 Page options
          .Sidebar-body
            label(for='pageTitle') Page title
            input(v-model='surveyData.pages[activePage].title' name='pageTitle' v-if='activePage')
            h6 Questiontypes
            draggable.Question-list(
              element='ul'
              v-model='defaultQuestionValueList'
              :options='dragOptionsSidebar'
              :move='onQuestionMove'
              :clone='onQuestionClone'
            )
              li.Sidebar-question.Question-item(
                v-for='question, i in defaultQuestionValueList'
                :key='question.name'
              ) {{ question.type }}
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
import draggable from 'vuedraggable'
import { mapMutations } from 'vuex'
import { ObjectID } from 'bson'

import SurveyService from '@/services/SurveyService'

import defaultQuestionValueList from './questionTypes/defaultQuestionValueList'
import checkbox from './questionTypes/Checkbox'
import rating from './questionTypes/Rating'

export default {
  name: 'visualEditor',
  components: {
    draggable,
    checkbox,
    rating
  },
  computed: {
    activeStartNode: {
      set (obj) { this.$store.commit('setActiveStartNode', obj) },
      get () { return this.$store.getters.getActiveStartNode }
    }
  },
  data () {
    return {
      activePage: undefined,
      activeQuestion: {},
      sidebarContent: 'general',
      surveyData: undefined,
      defaultQuestionValueList,
      dragOptions: {
        group: 'questions',
        ghostClass: 'Question-item--moving',
        handle: '.QuestionDetails-handle'
      },
      dragOptionsSidebar: {
        group: {
          name: 'questions',
          pull: 'clone',
          put: false
        },
        sort: false
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
    connectQuestions (question) {
      if (this.activeStartNode) {
        console.log('connectQuestions')
        console.log(`CONNECT Answer: ${this.activeStartNode.answerID} TO Question: ${question.questionsID}`)
        if (typeof question.connectedToQuestion !== Array) question.connectedToQuestion = [this.activeStartNode.answerID]
        else question.connectedToQuestion.push(this.activeStartNode.answerID)
        console.log(question)
        console.log(this.activeStartNode)
        this.activeStartNode.leadsToQuestion = question.questionsID
        // this.activeStartNode = undefined
      }
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
    onPageDragDeactivate () {},
    onPageDrag (x, y) { /* collision handler */ },
    onPageDragStop (x, y) {
      this.surveyData.pages[this.activePage].position.x = x
      this.surveyData.pages[this.activePage].position.y = y
    },
    onQuestionMove (evt, originalEvent) {
      // console.log(evt, originalEvent)
    },
    onQuestionClone (el) {
      let cloned = {...el}
      cloned.questionsID = new ObjectID().toString()
      cloned.choices.map(choice => { choice.answerID = new ObjectID().toString() })
      // console.log(cloned.choices.map(choice => choice.answerID = new ObjectID().toString()))
      console.log(cloned)
      return cloned
    },
    setPageActive (activePage, $event) {
      // console.log('setPageActive')
      this.activePage = activePage
      if ($event.path.some(e => e.classList ? e.classList.contains('Question-item') : null)) this.sidebarContent = 'questionDetails'
      else {
        this.activeQuestion = {}
        this.sidebarContent = 'questions'
      }
    },
    setEditAreaActive ($event) {
      // console.log('setEditAreaActive')
      this.sidebarContent = 'general'
      this.activePage = undefined
      this.activeQuestion = {}
    },
    setQuestionActive (activeQuestion) {
      // console.log('setQuestionActive')
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
        console.log('survey changed')
        this.setSurvey(this.surveyData)
      },
      deep: true
    }
  }
}
</script>

<style lang='stylus' scoped>
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

      &-body {
        overflow scroll
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
      min-height 5em

      border 2px dashed $lightGrey
      border-radius 10px
    }

    &-item {
      position relative
      padding .5em
      margin-bottom .5em

      border 1px solid transparent
      background-color $lightBlue
      border-radius 10px
      cursor pointer

      &:first-child {
        margin-top .5em
      }

      &.active {
        border 1px solid $darkBlue

        .QuestionDetails-body {
          display flex
        }
      }

      &--moving {
        opacity 0.5
        background $lightGrey
        cursor grabbing
      }

      .EndNode {
        position absolute
        left -8px
        top -7px
        width 15px
        height 15px

        border-radius 50%
        border 5px solid $orange


        &.connected {
          border 5px solid $green
        }
      }
    }
  }

  .QuestionDetails {

    &-container {}
    &-header {
      display flex
      justify-content space-between
    }

    &-body {
      display none
    }
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
        margin 0
        width 100%

        text-align left
      }
    }
  }
}
</style>
