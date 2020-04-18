import Vue from 'vue'
import Vuex from 'vuex'

import dialog from './dialog'
import model from './model'
import player from './player'
import search from './search'
import session from './session'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      session,
      dialog,
      model,
      player,
      search
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
