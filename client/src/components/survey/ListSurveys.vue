<template lang='pug'>
  .p-lg-1
    h3 List of surveys
    router-link.Button(:to='{ name: "CreateSurvey" }' tag='button')
      span Create survey
    ul.SurveyList
        li.SurveyList-item(
          v-if='surveys.length > 0'
          v-for='survey, i in surveys'
          @click=''
          )
          | {{ survey.title }}
          router-link.SurveyList-link(:to='{ name: "EvaluateSurvey", params: {id: survey._id} }' tag='a')
            span Evaluate
          router-link.SurveyList-link(:to='{ name: "EditSurvey", params: {id: survey._id} }' tag='a')
            span Edit
          a.SurveyList-link(@click='deleteSurvey(survey._id)') Delete
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
    },
    async deleteSurvey (id) {
      this.$swal({
        title: 'Are you sure you want to delete the survey?',
        text: 'All data will be gone',
        type: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Yes'
      }).then(async res => {
        if (res.value) {
          const response = await SurveyService.deleteSurvey(id)
          if (response.status === 204) {
            this.$swal({
              type: 'success',
              title: 'Deleted successfully',
              confirmButtonText: 'Ok'
            }).then(res => { this.$router.go(0) })
          } else {
            this.$swal({
              type: 'error',
              title: 'There was an error',
              confirmButtonText: 'Ok'
            }).then(res => { this.$router.go(0) })
          }
        }
      })
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
