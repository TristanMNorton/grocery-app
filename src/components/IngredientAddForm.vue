<template>
  <v-form>
    <h2 class="headline mb-2">Add Ingredient</h2>
    <v-text-field
      label="Ingredient Name"
      required
      v-model="formData.name"
      class="mb-4"
    ></v-text-field>
    <v-text-field
      label="Quantity"
      v-model="formData.quantity"
      type="number"
      class="mb-4"
    ></v-text-field>
    <v-select
      :items="normalizedMeasurmentOptions"
      label="Measurement"
      required
      v-model="formData.quantityType"
      class="mb-4"
    ></v-select>
    <v-alert
      dense
      outlined
      color="red"
      v-if="errorsExist"
    >
      <ul>
        <li v-for="error in errors" :key="error.path" v-text="error.message"></li>
      </ul>
    </v-alert>
    <v-btn
      small
      color="primary"
      @click="saveIngredient"
      class="mt-2"
    >
      Add
    </v-btn>
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
      measurementTypes,
      errors: []
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
    },

    errorsExist () {
      return this.errors.length > 0
    }

  },

  methods: {

    saveIngredient () {
      this.errors = []

      store.dispatch('saveIngredient', this.formData)
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

  }

}
</script>
