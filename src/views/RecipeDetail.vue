<template>
  <v-container v-if="recipeData">
    <h2 v-text="recipe.name"></h2>
    <p v-text="recipe.description"></p>
    <ul>
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        v-text="ingredient.text"
      >
      </li>
    </ul>
    <p v-text="recipe.instructions"></p>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  name: 'RecipeDetail',

  data: () => ({
    recipeData: null
  }),

  computed: {
    recipe () {
      return this.recipeData.attributes
    },

    ingredients () {
      return this.recipeData.attributes.availibleIngredients.map(ingredient => {
        const quantity = ingredient.quantityRequired
        const id = ingredient._id
        const type = ingredient.quantityType.abbreviation
        const name = ingredient.name

        return {
          id,
          text: `${quantity}${type} - ${name}`
        }
      })
    }
  },

  props: ['id'],

  methods: {
    getRecipe () {
      axios.get(`/api/v1/recipe/${this.id}`)
        .then(res => {
          this.recipeData = res.data.data
        })
    }
  },

  mounted () {
    this.getRecipe()
  }

}
</script>
