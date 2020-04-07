<template>
  <v-card
    class="mx-auto"
  >
    <v-card-text>
      <div>Rating: {{ recipe.rating }}/5</div>
      <p class="display-1 text--primary">
        {{ recipe.name }}
      </p>
      <div class="text--primary mb-4">
        {{ recipe.description }}
      </div>
      <p class="overline mb-1">Pantry Availibility</p>
      <v-progress-linear :value="ingredientPercentage"></v-progress-linear>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="viewRecipe"
      >
        Read Full Recipe
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from '../router'

export default {

  name: 'RecipePreview',

  props: {
    recipe: {
      type: Object,
      required: true
    }
  },

  computed: {
    ingredientPercentage () {
      return this.recipe.ingredientPercentage > 1
        ? 100
        : this.recipe.ingredientPercentage * 100
    }
  },

  methods: {
    viewRecipe () {
      router.push(`/recipes/${this.recipe._id}`)
    }
  }

}
</script>
