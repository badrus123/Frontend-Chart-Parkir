import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Cookies from 'js-cookie'

const useStyles = makeStyles(theme => ({
  list: {
    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
    [theme.breakpoints.up('lg')]: {
      width: 350,
    },
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  textList: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '18px',
    },
  },
}))

function DrawerHeader() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const Logout = () => {
    Cookies.remove('_q')
    Cookies.remove('expires')
    window.location.reload()
  }

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <center>
          <h1 className={classes.textList}>Parkir</h1>
        </center>
        <Divider />
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <Icon>dashboard</Icon>
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} classes={classes.textList} />
        </ListItem>
        <ListItem button component={Link} to='/akumulasi'>
          <ListItemIcon>
            <Icon>table</Icon>
          </ListItemIcon>
          <ListItemText primary={'Akumulasi'} classes={classes.textList} />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer('left', true)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Parkir
          </Typography>
          <Button onClick={Logout} color='inherit'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}
export default DrawerHeader
