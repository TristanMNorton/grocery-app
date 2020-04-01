<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <recipe-add-form></recipe-add-form>
      </v-col>
      <v-col cols="12" md="9" v-if="recipeList">
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-for="recipe in allRecipes"
            :key="recipe._id"
          >
            <RecipePreview
              class="mx-auto"
              :recipe="recipe.attributes"
            >
            </RecipePreview>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import RecipePreview from '../components/RecipePreview'
import RecipeAddForm from '../components/RecipeAddForm'

export default {

  name: 'RecipeList',

  data: () => ({
    recipeData: []
  }),

  components: {
    RecipePreview,
    RecipeAddForm
  },

  computed: {
    ...mapState(['allRecipes']),
    recipeList () {
      return this.recipeData.map(recipe => recipe.attributes)
    }
  },

  mounted () {
    store.dispatch('getAllRecipes')
  }

}
</script>
