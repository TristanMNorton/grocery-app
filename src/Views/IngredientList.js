import React from 'react'
import axios from 'axios'

class IngredientList extends React.Component {
  state = {
    ingredients: []
  }

  componentDidMount () {
    axios.get('/api/v1/ingredient')
      .then(res => {
        const ingredients = res.data.data.map(ingredient => {
          return {
            ...ingredient.attributes,
            id: ingredient.id
          }
        })

        this.setState({ ingredients })
      })
  }

  render () {
    return (
      <div className='ingredientList'>
        <h2>Ingredient List</h2>
        <ul>
          {this.state.ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default IngredientList
