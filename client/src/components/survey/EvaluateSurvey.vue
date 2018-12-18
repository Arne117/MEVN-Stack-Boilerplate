<template lang='pug'>
  .Survey-evaluate
    p Evaluate
    div
      h6 Survey results would show here.
</template>

<script>
import SurveyService from '@/services/SurveyService'

export default {
  data () {
    return {
      surveyResults: undefined
    }
  },
  mounted () {
    this.getSurveyResults()
  },
  methods: {
    async getSurveyResults () {
      const response = await SurveyService.getSurveyResults({
        id: this.$route.params.id
      })
      console.log(response)
      // this.surveys = response.data
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
