import Api from '@/services/Api'

export default {
  getSurveys () {
    return Api().get('surveys')
  },
  getSurvey (params) {
    return Api().get(`surveys/${params.id}`)
  },
  getSurveyResults (params) {
    return Api().get(`surveys/${params.id}/`)
  }
}
