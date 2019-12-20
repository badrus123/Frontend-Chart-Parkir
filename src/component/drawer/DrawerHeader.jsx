import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import SvgIcon from '@material-ui/core/SvgIcon'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  list: {
    width: 350,
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
}))

function DrawerHeader() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

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
          <h1>Parkir</h1>
        </center>
        <Divider />
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <SvgIcon>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={'Occpency Chart'} />
        </ListItem>
        <ListItem button component={Link} to='/delay-chart'>
          <ListItemIcon>
            <SvgIcon>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={'Delay Chart'} />
        </ListItem>
        <ListItem button component={Link} to='/fairness-chart'>
          <ListItemIcon>
            <SvgIcon>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={'Fairness Grafik'} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={'Fairness Tabel'} />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Parkir
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}
export default DrawerHeader
