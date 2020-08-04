import Vue from 'vue'
import Vuex from 'vuex'
import actions from './_actions'
import mutations from './_mutations'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    allIngredients: null,
    allRecipes: null
  },

  actions,
  mutations

})

export default store
