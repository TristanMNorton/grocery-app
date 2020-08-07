import React from 'react'
import axios from 'axios'

class RecipeList extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount () {
    axios.get('/api/v1/recipe')
      .then(res => {
        const recipes = res.data.data.map(recipe => {
          return {
            ...recipe.attributes,
            id: recipe.id
          }
        })

        this.setState({ recipes })
      })
  }

  render () {
    return (
      <div className='recipeList'>
        <h2>Recipe List</h2>
        <ul>
          {this.state.recipes.map(recipe => <li key={recipe.id}>{recipe.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default RecipeList
