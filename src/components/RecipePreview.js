import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

function RecipePreview (props) {
  const classes = useStyles()
  const { recipe } = props
  const { name } = recipe

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RecipePreview
