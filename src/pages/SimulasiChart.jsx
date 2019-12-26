import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import Simulasi from './Simulasi'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '1000px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1100px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '1700px',
    },
  },
  chart: {
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      marginTop: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      marginTop: '50px',
    },
    [theme.breakpoints.up('xl')]: {
      flexGrow: 1,
      marginTop: '50px',
    },
  },
}))
export default function SimulasiChart() {
  const classes = useStyles()
  return (
    <div className={classes.chart}>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={12} lg={12}>
          <center>
            <Paper className={classes.root}>
              <Simulasi styleChart={classes.chart} />
            </Paper>
          </center>
        </Grid>
      </Grid>
    </div>
  )
}
