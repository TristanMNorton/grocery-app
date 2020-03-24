import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    allIngredients: null
  },

  actions: {
    getAllIngredients ({ commit }) {
      axios.get('/api/v1/ingredient')
        .then(res => {
          commit('setAllIngredients', res.data.data)
        })
    },

    saveIngredient ({ commit }, data) {
      axios({
        method: 'POST',
        url: '/api/v1/ingredient',
        data,
        headers: {
          'content-type': 'application/vnd.api+json'
        }
      }).then(res => {
        this.dispatch('getIngredientUpdateState', res.data._id)
      })
    },

    getIngredientUpdateState ({ commit }, ingredientId) {
      axios.get(`/api/v1/ingredient/${ingredientId}`)
        .then(res => {
          commit('addOneToAllIngredients', res.data.data)
        })
    }
  },

  mutations: {
    setAllIngredients (state, ingredients) {
      state.allIngredients = ingredients
    },
    addOneToAllIngredients (state, ingredientData) {
      state.allIngredients.push(ingredientData)
    }
  }

})

export default store
