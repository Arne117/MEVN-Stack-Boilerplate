import Api from '@/services/Api'

export default {
  getLights () {
    return Api().get('lights')
  },

  getLight (params) {
    return Api().get(`lights/${params.id}`)
  },

  updateLight (index, params) {
    return Api().put(`lights/${index}/state`, params)
  },

  getRooms () {
    return Api().get('groups')
  },

  getRoom (i) {
    return Api().get('groups')
  },

  updateRoom (index, params) {
    return Api().put(`groups/${index}/action`, params)
  }
}
