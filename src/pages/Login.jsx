import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import SnackbarComponent from '../component/Snackbar/SnackbarComponent'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login() {
  const classes = useStyles()
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  const handleSubmit = async event => {
    try {
      setLoading(true)
      const response = await axios.post(
        `https://api-parkiran.herokuapp.com/api/v1/login`,
        {
          email: state.email,
          password: state.password,
        },
      )
      document.cookie = '_q=' + response.data.token
      document.cookie = 'expires=' + response.data.expires_in
      window.location.reload()
    } catch (e) {
      console.log(e)
      setOpen(true)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon style={{ color: '#fff' }}>local_parking</Icon>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange('email')}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange('password')}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <SnackbarComponent
        message={'Login Failed!!! Please Try Again'}
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
      />
    </Container>
  )
}
