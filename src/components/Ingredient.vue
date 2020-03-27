<template>
  <v-card
    class="mx-auto"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        {{ ingredient.name }}
        <v-chip
          class="ma-2"
          @click="setQuantityUpdateState"
        >
          {{ countWords }}
        </v-chip>
        <v-progress-circular
          indeterminate
          v-if="updatingIngredient"
          class="ml-2"
        ></v-progress-circular>
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
        <transition name="stay">
          <v-btn
            text
            color="red"
            class="ml-auto v-btn--delete"
            v-if="!isUpdatingQuantity"
            @click="deleteIngredient"
          >
            Delete
          </v-btn>
        </transition>
        <transition name="fade">
          <v-text-field
            label="Update Quantity"
            required
            v-model="currentQuantity"
            v-if="isUpdatingQuantity"
            class="ml-4"
          ></v-text-field>
        </transition>
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
      currentQuantity: this.ingredient.quantity,
      updatingIngredient: false
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
      const { name, abbreviation } = this.ingredient.quantityType
      const { quantity } = this.ingredient

      return name === 'count' ? quantity : `${quantity}${abbreviation}`
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

      this.updatingIngredient = true

      store.dispatch('updateIngredient', { id, data })
        .then(() => {
          this.isUpdatingQuantity = false
          this.updatingIngredient = false
        })
    },

    cancelQuantityUpdateState () {
      this.isUpdatingQuantity = false
      this.currentQuantity = this.ingredient.quantity
    },

    deleteIngredient () {
      store.dispatch('deleteIngredient', this.ingredient._id)
    }
  }

}
</script>

<style lang="css">
  .v-progress-circular {
    width: 16px !important;
    height: 16px !important;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s, max-height .25s;
    max-height: 44px;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    max-height: 0;
    overflow:hidden;
  }
  .stay-enter-active, .stay-leave-active {
    transition: opacity .25s;
  }
  .stay-enter, .stay-leave-to {
    opacity: 0;
  }
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-card__actions {
    position: relative;
  }
  .v-btn--delete {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
