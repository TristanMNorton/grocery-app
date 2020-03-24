<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <IngredientAddForm></IngredientAddForm>
      </v-col>
      <v-col cols="12" md="9" v-if="allIngredients">
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-for="ingredient in allIngredients"
            :key="ingredient.id"
          >
            <Ingredient
                :ingredient="ingredient.attributes"
            ></Ingredient>
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
