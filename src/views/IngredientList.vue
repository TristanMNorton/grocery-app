<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <ingredient-add-form></ingredient-add-form>
      </v-col>
      <v-col cols="12" md="9" v-if="allIngredients">
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-for="ingredient in allIngredients"
            :key="ingredient.id"
          >
            <ingredient
                :ingredient="ingredient.attributes"
            ></ingredient>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import Ingredient from '../components/Ingredient'
import IngredientAddForm from '../components/IngredientAddForm'

export default {

  name: 'IngredientList',

  data: () => ({
    ingredientData: []
  }),

  components: {
    Ingredient,
    IngredientAddForm
  },

  computed: {
    ...mapState(['allIngredients'])
  },

  mounted () {
    store.dispatch('getAllIngredients')
  }

}
</script>
