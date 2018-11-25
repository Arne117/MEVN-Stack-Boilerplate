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
  },
  addSurvey (params) {
    return Api().post('surveys', params)
  },
  deleteSurvey (id) {
    return Api().delete(`surveys/${id}`)
  }
}
