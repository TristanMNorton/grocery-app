<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <IngredientAddForm></IngredientAddForm>
      </v-col>
      <v-col cols="12" md="9" v-if="ingredientList">
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-for="ingredient in ingredientList"
            :key="ingredient._id"
          >
            <Ingredient
                :ingredient="ingredient"
            ></Ingredient>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
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
    ingredientList () {
      return this.ingredientData.map(ingredient => ingredient.attributes)
    }
  },

  methods: {
    getIngredients () {
      axios.get('/api/v1/ingredient')
        .then(res => {
          this.ingredientData = res.data.data
        })
    }
  },

  mounted () {
    this.getIngredients()
  }

}
</script>
