import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  survey: {},
  changed: false,
  activeStartNode: undefined
}

export default {
  state,
  mutations,
  actions,
  getters
}
