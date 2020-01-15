import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LoadingGif from '../loading.gif'
import LoadingText from '../loadingText.gif'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
  },
  images: {
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '300px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '400px',
    },
  },
}))

function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.images} src={LoadingGif} alt='centered image' />
      <img className={classes.images} src={LoadingText} alt='centered image' />
    </div>
  )
}
export default Loading
