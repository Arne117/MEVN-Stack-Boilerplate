<template lang='pug'>
  .SurveyEditor
    #surveyEditorContainer
</template>

<script>
import SurveyService from '@/services/SurveyService'

import * as SurveyEditor from 'surveyjs-editor'
import 'surveyjs-editor/surveyeditor.css'
import * as SurveyKo from 'survey-knockout'

import * as widgets from 'surveyjs-widgets'
import 'inputmask/dist/inputmask/phone-codes/phone.js'
widgets.icheck(SurveyKo)
widgets.select2(SurveyKo)
widgets.inputmask(SurveyKo)
widgets.jquerybarrating(SurveyKo)
widgets.jqueryuidatepicker(SurveyKo)
widgets.nouislider(SurveyKo)
widgets.select2tagbox(SurveyKo)
widgets.signaturepad(SurveyKo)
widgets.sortablejs(SurveyKo)
widgets.ckeditor(SurveyKo)
widgets.autocomplete(SurveyKo)
widgets.bootstrapslider(SurveyKo)

export default {
  name: 'survey-editor',
  data () {
    return {}
  },
  mounted () {
    let editorOptions = { showEmbededSurveyTab: false }
    this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions)
    this.editor.saveSurveyFunc = function () {
      console.log((this))
    }
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
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
