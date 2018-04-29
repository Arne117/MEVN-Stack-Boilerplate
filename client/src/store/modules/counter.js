const state = {
  counter: 0
}

const getters = {
  doubleCounter: state => {
    return state.counter * 2
  },
  stringCounter: state => {
    return `${state.counter} Clicks`
  }
}

const mutations = {
  increment: state => {
    state.counter++
  },
  incrementBy: (state, by) => {
    state.counter += by
  },
  decrement: (state) => {
    state.counter--
  },
  decrementBy: (state, arg) => {
    state.counter -= arg
  }
}

const actions = {
  increment: context => {
    context.commit('increment')
  },
  decrement: ({ commit }, arg) => {
    commit('decrementBy', arg)
  },
  asyncIncrement: ({ commit }, arg) => {
    setTimeout(() => {
      commit('incrementBy', arg.by)
    }, arg.duration)
  },
  asyncDecrement: ({ commit }) => {
    setTimeout(() => {
      commit('decrement')
    }, 1000)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
