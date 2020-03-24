<template>
  <v-form>
    <h2 class="headline mb-2">Add Ingredient</h2>
    <v-text-field
      label="Ingredient Name"
      required
      v-model="formData.name"
    ></v-text-field>
    <v-text-field
      label="Quantity"
      v-model="formData.quantity"
      type="number"
    ></v-text-field>
    <v-select
        :items="normalizedMeasurmentOptions"
        label="Measurement"
        required
        v-model="formData.quantityType"
    ></v-select>
    <v-btn small color="primary" @click="saveIngredient">Add</v-btn>
  </v-form>
</template>

<script>
import store from '../store'
import measurementTypes from '../../config/measurement-types'

export default {
  data () {
    return {
      formData: {
        name: null,
        quantity: null,
        quantityType: null
      },
      measurementTypes
    }
  },

  computed: {
    normalizedMeasurmentOptions () {
      return Object.keys(this.measurementTypes).map(key => {
        return {
          text: this.measurementTypes[key],
          value: key
        }
      })
    }
  },

  methods: {
    saveIngredient () {
      store.dispatch('saveIngredient', this.formData)
    }
  }
}
</script>
