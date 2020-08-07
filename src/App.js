import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import RecipeList from './Views/RecipeList'
import IngredientList from './Views/IngredientList'
import RecipeDetail from './Views/RecipeDetail'
import './App.css'

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/recipes'>Recipes</Link>
            </li>
            <li>
              <Link to='/ingredients'>Ingredients</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/ingredients'>
            <IngredientList />
          </Route>
          <Route path='/recipes'>
            <RecipeList />
          </Route>
          <Route path='/recipe/:id'>
            <RecipeDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
