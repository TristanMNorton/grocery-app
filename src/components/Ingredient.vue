<template>
  <v-card
    class="mx-auto"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        {{ ingredient.name }}
      </p>
      <p>
        <v-chip
          class="ma-2"
        >
          {{ countWords }}
        </v-chip>
        available in pantry
      </p>
      <v-card-actions class="py-0 px-0">
        <v-btn
          small
          @click="setQuantityUpdateState"
          v-if="!isUpdatingQuantity"
        >
          Update Quantity
        </v-btn>
        <v-btn
          small
          v-if="isUpdatingQuantity"
          @click="updateQuantity"
        >
          Save
        </v-btn>
        <v-btn
          small
          v-if="isUpdatingQuantity"
          @click="cancelQuantityUpdateState"
        >
          Cancel
        </v-btn>
        <v-text-field
          label="Update Quantity"
          required
          v-model="currentQuantity"
          v-if="isUpdatingQuantity"
          class="ml-4"
        ></v-text-field>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import store from '../store'

export default {

  name: 'Ingredient',

  data () {
    return {
      isUpdatingQuantity: false,
      currentQuantity: this.ingredient.quantity
    }
  },

  props: {
    ingredient: {
      type: Object,
      required: true
    }
  },

  computed: {
    countWords () {
      return this.ingredient.quantityType.name === 'count'
        ? this.ingredient.quantity
        : `${this.ingredient.quantity}${this.ingredient.quantityType.abbreviation}`
    }
  },

  methods: {
    setQuantityUpdateState () {
      this.isUpdatingQuantity = true
    },

    updateQuantity () {
      const id = this.ingredient._id
      const data = {
        quantity: this.currentQuantity
      }

      store.dispatch('updateIngredient', { id, data })
        .then(() => {
          this.isUpdatingQuantity = false
        })
    },

    cancelQuantityUpdateState () {
      this.isUpdatingQuantity = false
    }
  }

}
</script>
