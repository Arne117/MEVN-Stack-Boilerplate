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
      surveyData: 'getSurvey'
    })
  },
  data () {
    return {
      activeTab: 'VisualEditor'
    }
  },
  methods: {
    async updateSurvey () {
      const response = await SurveyService.updateSurvey(this.surveyData)
      if (response.status === 200) this.$swalSuccess({ text: 'Your Survey has been updated!' })
      else this.$swalError({text: `Statuscode: ${response.status}`})
    }
  }
}
</script>

<style lang='stylus' scoped>
  .SurveyEditor {

    &-container {}

    &-header {
      display flex
      flex-direction row
      justify-content space-between
      margin-bottom .5em
    }

    &-body {}
  }

</style>
