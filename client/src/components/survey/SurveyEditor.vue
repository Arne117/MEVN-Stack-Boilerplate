<template lang='pug'>
  .SurveyEditor
    .SurveyEditor-container
      .SurveyEditor-header
        select(v-model='activeTab')
          option(value='VisualEditor') Visual editor
          option(value='JsonView') View JSON
        button.Button(@click='updateSurvey') Save
      .SurveyEditor-body
        transition(name='fade' mode='out-in')
          component(:is='activeTab')
</template>

<script>
import { mapGetters } from 'vuex'

import SurveyService from '@/services/SurveyService'
import VisualEditor from './VisualEditor/'
import JsonView from './VisualEditor/JsonView'

export default {
  name: 'survey-editor',
  components: {
    VisualEditor,
    JsonView
  },
  computed: {
    ...mapGetters({
      survey: 'getSurvey'
    })
  },
  data () {
    return {
      activeTab: 'VisualEditor'
    }
  },
  mounted () {
    // this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions)
    // this.editor.saveSurveyFunc = function () {
    //   console.log((this))
    // }
  },
  methods: {
    async addSurvey () {
      const response = await SurveyService.addSurvey({
        survey: this.survey
      })
      if (response.status === 201) {
        this.$swal({
          title: 'Great!',
          text: 'Your survey has been added.',
          type: 'success',
          confirmButtonText: 'ok'
        }).then(() => { this.$router.push({ name: 'EditSurvey', params: {id: response.data._id} }) })
        //
      } else {
        this.$swal({
          title: 'Oh No!',
          text: 'Something went wrong',
          type: 'error',
          confirmButtonText: 'ok'
        })
      }
    },
    async updateSurvey () {
      const response = await SurveyService.updateSurvey({
        id: this.$route.params.id,
        surveyData: this.surveyData
      })
      console.log(response)
      if (response.status === 200) {
        this.$swal(
          'Great!',
          'Your Survey has been updated!',
          'success'
        )
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .SurveyEditor {

    &-container {

    }

    &-header {
      display flex
      flex-direction row
      justify-content space-between
      margin-bottom .5em
    }

    &-body {

    }
  }

</style>
