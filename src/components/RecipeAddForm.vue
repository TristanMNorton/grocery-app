<template>
  <v-form>
    <h2 class="headline mb-2">Add Recipe</h2>
    <v-text-field
      label="Recipe Name"
      required
      v-model="formData.name"
    ></v-text-field>
    <v-textarea
      label="Description"
      :rows="2"
      v-model="formData.description"
    ></v-textarea>
    <v-textarea
      label="Instructions"
      v-model="formData.instructions"
    ></v-textarea>
    <v-select
      :items="ratingOptions"
      v-model="formData.rating"
      label="Rating"
      class="mb-6"
    ></v-select>
    <h2 class="headline mb-2">Add Ingredients</h2>
    <v-row class="ingredient-add">
      <v-col sm="6" cols="12">
        <v-select
          :items="normalizedIngredients"
          label="Ingredient"
          v-model="formIngredient.ingredient"
        ></v-select>
      </v-col>
      <v-col sm="4" cols="12">
        <v-text-field
          label="Qty"
          required
          v-model="formIngredient.quantityRequired"
        ></v-text-field>
      </v-col>
      <v-col sm="2" cols="12">
        <v-btn text small class="add" @click="selectIngredient">
          +
        </v-btn>
      </v-col>
    </v-row>
    <ul v-if="selectedIngredientsNormalized">
      <li
        v-for="ingredient in selectedIngredientsNormalized"
        :key="ingredient._id"
      >
        {{ ingredient.quantity }}{{ ingredient.quantityType.abbreviation }} - {{ ingredient.name }}
      </li>
    </ul>
    <v-btn @click="saveRecipe">Save</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import store from '../store'

export default {
  data () {
    return {
      ratingOptions: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 }
      ],
      allIngredients: [],
      formData: {
        name: null,
        description: null,
        instructions: null,
        rating: null,
        ingredientsRequired: []
      },
      formIngredient: {
        ingredient: null,
        quantityRequired: null
      },
      errors: []
    }
  },

  computed: {

    normalizedIngredients () {
      return this.allIngredients
        ? this.allIngredients.map(ingredient => {
          const { ingredientsRequired } = this.formData
          let shouldDisable = false

          if (ingredientsRequired) {
            shouldDisable = ingredientsRequired
              .filter(selectedIngredient =>
                selectedIngredient.ingredient === ingredient.id
              ).length > 0
          }

          return {
            text: ingredient.attributes.name,
            value: ingredient.attributes._id,
            disabled: shouldDisable
          }
        })
        : null
    },

    selectedIngredientsNormalized () {
      const tempArray = []

      this.formData
        .ingredientsRequired
        .forEach(ingredient => {
          const [ingredientObject] = this.allIngredients
            .filter(topIngredient =>
              topIngredient.id === ingredient.ingredient
            )

          const {
            _id,
            quantityType,
            name
          } = ingredientObject.attributes

          tempArray.push({
            _id,
            quantityType,
            name,
            quantity: ingredient.quantityRequired
          })
        })

      return tempArray
    }

  },

  methods: {

    getAllIngredients () {
      axios.get('/api/v1/ingredient', {
        pagination: false
      })
        .then(res => {
          this.allIngredients = res.data.data
        })
    },

    selectIngredient () {
      const clonedIngredient = { ...this.formIngredient }

      clonedIngredient.quantityRequired = this.formIngredient.quantityRequired

      this.formData.ingredientsRequired.push({ ...clonedIngredient })

      this.formIngredient.ingredient = null
      this.formIngredient.quantityRequired = null
    },

    saveRecipe () {
      store.dispatch('saveRecipe', this.formData)
        .then(() => {
          Object.keys(this.formData).forEach(key => {
            this.formData[key] = null
          })
        })
        .catch(errors => {
          Object.keys(errors).forEach(error => {
            this.errors.push(errors[error])
          })
        })
    }

  },

  mounted () {
    this.getAllIngredients()
  }

}
</script>

<style lang="css">
  .add {
    padding: 0 !important;
    height: auto !important;
    min-width: auto !important;
    font-size: 1.4rem !important;
  }
  .ingredient-add .v-input {
    padding-top: 0;
    margin-top: 0;
  }
</style>
