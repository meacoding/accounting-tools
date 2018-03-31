import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const $localStorage = store => {
  store.subscribe((mutation, state) => {
    // console.log('updated localstorage', mutation)
    localStorage['taxes'] = JSON.stringify(state)
  })
}

export default new Vuex.Store({
  modules,
  plugins: [$localStorage]
})
