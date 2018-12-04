<template lang='pug'>
  .Survey-edit
    p Editieren
    SurveyEditor
</template>

<script>
import { mapMutations } from 'vuex'

import SurveyService from '@/services/SurveyService'
import SurveyEditor from './SurveyEditor'

export default {
  beforeRouteLeave (to, from, next) {
    if (this.confirmLeave) {
      this.$swal({
        title: 'You did not saved your chanegs!',
        text: 'All changes will be lost',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes it`s ok'
      }).then(res => {
        res.value === true ? next() : next(false)
      })
    } else next()
  },
  components: {
    SurveyEditor
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
    ...mapMutations([
      'setSurveyData'
    ]),
    async getSurvey () {
      const response = await SurveyService.getSurvey({
        id: this.$route.params.id
      })
      this.setSurveyData(response.data)
    },
    async updateSurvey () {
      await SurveyService.updateSurvey({
        id: this.$route.params.id,
        data: this.survey
      })
      this.confirmLeave = false
      this.$swal(
        'Great!',
        'Your Survey has been updated!',
        'success'
      )
      this.$router.push({ name: 'Surveys' })
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
