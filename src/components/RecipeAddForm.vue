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
    ></v-select>
    <v-select
      :items="normalizedIngredients"
      label="Ingredients"
      v-model="formData.ingredientsRequired"
      :multiple="true"
    ></v-select>
  </v-form>
</template>

<script>
import axios from 'axios'

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
        ingredients: null
      }
    }
  },

  computed: {
    normalizedIngredients () {
      return this.allIngredients
        ? this.allIngredients.map(ingredient => {
          return {
            text: ingredient.attributes.name,
            value: ingredient.attributes._id
          }
        })
        : null
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
    }
  },

  mounted () {
    this.getAllIngredients()
  }
}
</script>
