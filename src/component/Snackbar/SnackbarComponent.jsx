import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import { Icon, IconButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const SnackbarComponent = props => {
  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    props.setOpen(false)
    props.setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <Icon>close</Icon>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}
export default SnackbarComponent
