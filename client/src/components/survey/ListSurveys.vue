<template lang='pug'>
  .p-lg-1
    router-link.Button(:to='{ name: "CreateSurvey" }' tag='li')
      span Create survey
    h3 List of surveys
    ul.SurveyList
        li.SurveyList-item(
          v-if='surveys.length > 0'
          v-for='survey, i in surveys'
          @click=''
          )
          | {{ survey.title }}
          router-link.SurveyList-link(:to='{ name: "EvaluateSurvey", params: {id: survey.id} }' tag='a')
            span Evaluate
          router-link.SurveyList-link(:to='{ name: "EditSurvey", params: {id: survey.id} }' tag='a')
            span Edit
        .Error(v-else) There was an Error
</template>

<script>
import SurveyService from '@/services/SurveyService'

export default {
  data () {
    return {
      surveys: {}
    }
  },
  mounted () {
    this.getSurveys()
  },
  methods: {
    async getSurveys () {
      const response = await SurveyService.getSurveys()
      this.surveys = response.data
    }
  }
}
</script>

<style lang='stylus' scoped>
  .SurveyList {
    margin-top 1em
    display flex
    flex-direction column

    &-item {
      margin .5em 1em
      padding 0 .5em
    }

    &-link {
      margin 0 .5em
    }
  }
</style>
