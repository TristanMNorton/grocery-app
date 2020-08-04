import axios from 'axios'

export default {

  getAllIngredients ({ commit }) {
    axios.get('/api/v1/ingredient')
      .then(res => {
        commit('setAllIngredients', res.data.data)
      })
  },

  getAllRecipes ({ commit }) {
    axios.get('/api/v1/recipe')
      .then(res => {
        commit('setAllRecipes', res.data.data)
      })
  },

  saveIngredient ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: '/api/v1/ingredient',
        data,
        headers: {
          'content-type': 'application/vnd.api+json'
        }
      }).then(res => {
        this.dispatch('getIngredientUpdateState', res.data._id)
        resolve()
      }).catch(error => {
        reject(error.response.data.errors)
      })
    })
  },

  saveRecipe ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: '/api/v1/recipe',
        data,
        headers: {
          'content-type': 'application/vnd.api+json'
        }
      }).then(res => {
        this.dispatch('getRecipeUpdateState', res.data._id)
        resolve()
      }).catch(error => {
        reject(error.response.data.errors)
      })
    })
  },

  getIngredientUpdateState ({ commit }, ingredientId) {
    axios.get(`/api/v1/ingredient/${ingredientId}`)
      .then(res => {
        commit('addOneToAllIngredients', res.data.data)
      })
  },

  getRecipeUpdateState ({ commit }, recipeId) {
    axios.get(`/api/v1/recipe/${recipeId}`)
      .then(res => {
        commit('addOneToAllRecipes', res.data.data)
      })
  },

  updateIngredient ({ commit }, updateData) {
    return new Promise((resolve, reject) => {
      const data = updateData.data

      axios({
        method: 'PATCH',
        url: `/api/v1/ingredient/${updateData.id}`,
        data,
        headers: {
          'content-type': 'application/vnd.api+json'
        }
      }).then(res => {
        this.dispatch('getIngredientAndUpdateExisting', updateData.id)
        resolve()
      })
    })
  },

  deleteIngredient ({ commit }, ingredientId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/v1/ingredient/${ingredientId}`, {
        headers: {
          'content-type': 'application/vnd.api+json'
        }
      })
        .then(res => {
          commit('removeIngredientFromState', ingredientId)
          resolve()
        })
    })
  },

  getIngredientAndUpdateExisting ({ commit }, id) {
    axios.get(`/api/v1/ingredient/${id}`)
      .then(res => {
        commit('updateExistingIngredient', res.data.data)
      })
  }

}
