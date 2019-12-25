import React, { useState } from 'react'
import { Paper, Grid, Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Chart from 'react-apexcharts'

const useStyles = makeStyles(theme => ({
  rootPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '70px',
      marginTop: '20px',
      marginLeft: '25px',
    },
    [theme.breakpoints.up('md')]: {
      width: '350px',
      height: '70px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '420px',
      height: '100px',
    },
  },
  iconPaper: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '50px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '60px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '70px',
    },
  },
  titlePaper: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '25px',
    },
  },
  descPaper: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
      color: 'gray',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      color: 'gray',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '20px',
      color: 'gray',
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '30px',
      paddingLeft: '15px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '10px',
      paddingLeft: '10px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '30px',
      paddingLeft: '100px',
    },
  },
  chart: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '700px',
    },
  },
}))

export default function Home() {
  const classes = useStyles()
  const [donut, setDonut] = React.useState({
    options: {
      labels: ['Occupency Data 50', 'Occupency Data 100', 'Occupency Data 150'],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      states: {
        hover: {
          enabled: false,
        },
      },
      theme: {
        palette: 'palette2',
      },
      title: {
        text: 'Occupancy Total',
        align: 'center',
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  })
  return (
    <div style={{ marginTop: '50px' }}>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>person</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Total User
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    18 0000 +
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={3}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>bar_chart</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Avaibiity
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    75 %
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={3}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>show_chart</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Revenue
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    Rp 18 M
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={3}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>monetization_on</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Vr Mail
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    15 C
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '10px' }}>
            <Paper className={classes.root}>
              <Chart
                options={donut.options}
                series={[30, 40, 30]}
                type='donut'
                className={classes.chart}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '10px' }}>
            <Paper className={classes.root}>
              <Chart
                options={donut.options}
                series={[30, 40, 30]}
                type='line'
                className={classes.chart}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
