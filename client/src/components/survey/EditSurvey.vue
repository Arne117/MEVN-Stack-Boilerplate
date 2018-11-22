<template lang='pug'>
  .Survey-create
    p Editieren
</template>

<script>
import SurveyService from '@/services/SurveyService'

export default {
  beforeRouteLeave (to, from, next) {
    if (this.confirmLeave) {
      this.$swal({
        title: 'You did not saved your chanegs!',
        text: 'All changes will be lost',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes it is ok'
      }).then((res) => {
        res.value === true ? next() : next(false)
      })
    } else next()
  },
  data () {
    return {
      survey: {},
      confirmLeave: false
    }
  },
  mounted () {
    this.getSurvey()
  },
  methods: {
    async getSurvey () {
      const response = await SurveyService.getSurvey({
        id: this.$route.params.id
      })
      this.surveys = response.data
    },
    async updateSurvey () {
      await SurveyService.updateSurvey({
        id: this.$route.params.id,
        data: this.survey
      })
      this.confirmLeave = false
      this.$swal(
        'Great!',
        `Your Survey has been updated!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
