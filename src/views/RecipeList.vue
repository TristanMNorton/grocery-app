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
            v-for="recipe in recipeList"
            :key="recipe._id"
          >
            <RecipePreview
              class="mx-auto"
              :recipe="recipe"
            >
            </RecipePreview>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
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
