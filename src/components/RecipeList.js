import React from 'react'
import RecipePreview from './RecipePreview'
import Grid from '@material-ui/core/Grid'

function RecipeList (props) {
  const { recipes } = props

  return (
    <div className='recipeList'>
      <h2>Recipe List</h2>

      <Grid container spacing={3}>

        {recipes.map(recipe =>
          <Grid item xs={12} lg={6} key={recipe.id}>
            <RecipePreview recipe={recipe} />
          </Grid>
        )}

      </Grid>

    </div>
  )
}

export default RecipeList
