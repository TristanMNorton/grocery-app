export default {

  setAllIngredients (state, ingredients) {
    state.allIngredients = ingredients
  },

  setAllRecipes (state, recipes) {
    state.allRecipes = recipes
  },

  addOneToAllIngredients (state, ingredientData) {
    state.allIngredients.push(ingredientData)
  },

  addOneToAllRecipes (state, recipeData) {
    state.allRecipes.push(recipeData)
  },

  updateExistingIngredient (state, data) {
    const [existingIngredient] = state
      .allIngredients
      .filter(ingredient => ingredient.id === data.id)

    Object.keys(existingIngredient).forEach(key => {
      existingIngredient[key] = data[key]
    })
  },

  removeIngredientFromState (state, ingredientId) {
    state.allIngredients = state
      .allIngredients
      .filter(
        ingredient => ingredient.id !== ingredientId
      )
  }

}
