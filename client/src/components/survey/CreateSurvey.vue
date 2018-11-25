<template lang='pug'>
  .Survey-create
    p Create
    form(v-on:submit.prevent='')
      input(
        type='text'
        name='title'
        placeholder='Title'
        v-model='title'
        maxlength='120'
        @keyup.enter='addSurvey'
        autofocus
      )
      button(@click='addSurvey') Create
</template>

<script>
import SurveyService from '@/services/SurveyService'

export default {
  data () {
    return {
      title: '',
      survey: {}
    }
  },
  methods: {
    async addSurvey () {
      const response = await SurveyService.addSurvey({
        title: this.title,
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
