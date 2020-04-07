import Vue from 'vue'
import VueRouter from 'vue-router'
import RecipeList from './views/RecipeList'
import IngredientList from './views/IngredientList'
import RecipeDetail from './views/RecipeDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: RecipeList
  },
  {
    path: '/recipes',
    component: RecipeList
  },
  {
    path: '/ingredients',
    component: IngredientList
  },
  {
    path: '/recipes/:id',
    component: RecipeDetail,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
