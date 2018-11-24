<template lang='pug'>
  .Survey-evaluate
    p Auswerten
</template>

<script>
import SurveyService from '@/services/SurveyService'

export default {
  data () {
    return {
      survey: {},
      confirmLeave: false
    }
  },
  mounted () {
    this.getSurveyResults()
  },
  methods: {
    async getSurvey () {
      const response = await SurveyService.getSurveyResults({
        id: this.$route.params.id
      })
      this.surveys = response.data
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
