<template>
  <v-card
    class="mx-auto"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        {{ ingredient.name }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true
    }
  }
}
</script>
