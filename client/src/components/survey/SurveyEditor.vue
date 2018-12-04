<template lang='pug'>
  .SurveyEditor
    select(v-model='activeTab')
      option(value='VisualEditor') Visual editor
      option(value='ViewJson') View JSON
    transition(name='fade' mode='out-in')
      keep-alive
        component(:is='activeTab')
</template>

<script>
import * as SurveyVue from 'survey-vue'

import SurveyService from '@/services/SurveyService'
import VisualEditor from './VisualEditor/'

let Survey = SurveyVue.Survey

export default {
  name: 'survey-editor',
  components: {
    Survey,
    VisualEditor
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
      console.log(response)
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
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
