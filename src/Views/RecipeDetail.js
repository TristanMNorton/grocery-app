import React from 'react'
import { withRouter } from 'react-router'

class RecipeDetail extends React.Component {
  state = {
    id: null
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.setState({ id })
  }

  render () {
    return <h2>This Recipe ID is {this.state.id}</h2>
  }
}

export default withRouter(RecipeDetail)
