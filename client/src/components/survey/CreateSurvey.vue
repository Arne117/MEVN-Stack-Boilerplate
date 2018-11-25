<template lang='pug'>
  .Survey-create
    p Create
    SurveyEditor
</template>

<script>
import SurveyEditor from './SurveyEditor'
import * as SurveyVue from 'survey-vue'
import 'bootstrap/dist/css/bootstrap.css'

let Survey = SurveyVue.Survey
Survey.cssType = 'bootstrap'

export default {
  components: {
    Survey,
    SurveyEditor
  },
  data () {
    let json = {
      elements: [
        { type: 'text', name: 'customerName', title: 'What is your name?', isRequired: true }
      ]
    }
    // Create the model and pass it into VueSJ Survey component
    let model = new SurveyVue.Model(json)
    // You may set model properties
    // model.mode='display'

    return {
      survey: model
    }
  }
}
</script>

<style lang='stylus' scoped>
  .SurveyEditor {
    text-align left
  }
</style>
