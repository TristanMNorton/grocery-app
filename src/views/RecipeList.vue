<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <p>Test Column</p>
      </v-col>
      <v-col cols="12" md="9" v-if="recipeList">
        <v-card
          class="mx-auto"
          v-for="recipe in recipeList"
          :key="recipe._id"
        >
          <v-card-text>
            <p class="display-1 text--primary">
              {{ recipe.name }}
            </p>
            <div class="text--primary">
              {{ recipe.description }}
            </div>
          </v-card-text>
          <v-list-item
            v-for="ingredient in recipe.availibleIngredients"
            :key="ingredient._id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  name: 'RecipeList',

  data: () => ({
    recipeData: []
  }),

  computed: {
    recipeList () {
      return this.recipeData.map(recipe => recipe.attributes)
    }
  },

  mounted () {
    axios.get('/api/v1/recipe')
      .then(res => {
        this.recipeData = res.data.data
      })
  }

}
</script>
