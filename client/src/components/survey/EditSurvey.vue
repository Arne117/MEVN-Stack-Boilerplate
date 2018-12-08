<template lang='pug'>
  .Survey-edit
    p Edit
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
    return {}
  },
  mounted () {
    this.getSurvey()
  },
  methods: {
    ...mapMutations([
      'setSurvey'
    ]),
    async getSurvey () {
      const response = await SurveyService.getSurvey({
        id: this.$route.params.id
      })
      this.setSurvey(response.data)
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
