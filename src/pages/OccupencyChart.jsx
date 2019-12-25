import React from 'react'
import { data50 } from '../data/Data50'
import { data100 } from '../data/Data100'
import { data300 } from '../data/Data300'
import { data500 } from '../data/Data500'
import { data200 } from '../data/Data200'
import { data150 } from '../data/Data150'
import { Grid } from '@material-ui/core'
import Occupancy from './Occupancy'
import Chart from 'react-apexcharts'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
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

export default function OccupencyChart() {
  const classes = useStyles()
  const [Occupency50, setOccupency50] = React.useState(0)
  const [Occupency100, setOccupency100] = React.useState(0)
  const [Occupency150, setOccupency150] = React.useState(0)
  const [Occupency200, setOccupency200] = React.useState(0)
  const [Occupency300, setOccupency300] = React.useState(0)
  const [Occupency500, setOccupency500] = React.useState(0)

  const [donut, setDonut] = React.useState({
    options: {
      labels: [
        'Occupency Data 50',
        'Occupency Data 100',
        'Occupency Data 150',
        'Occupency Data 200',
        'Occupency Data 300',
        'Occupency Data 500',
      ],
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
    series: [
      Occupency50,
      Occupency100,
      Occupency150,
      Occupency200,
      Occupency300,
      Occupency500,
    ],
  })

  return (
    <div style={{ flexGrow: 1, marginTop: '50px' }}>
      <center>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data50}
              rata={50}
              donut={setOccupency50}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data100}
              rata={100}
              donut={setOccupency100}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data150}
              rata={150}
              donut={setOccupency150}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data200}
              rata={200}
              donut={setOccupency200}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data300}
              rata={300}
              donut={setOccupency300}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Occupancy
              dataOccupancy={data500}
              rata={500}
              donut={setOccupency500}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '10px' }}>
            <Paper className={classes.root}>
              <Chart
                options={donut.options}
                series={[
                  Occupency50,
                  Occupency100,
                  Occupency150,
                  Occupency200,
                  Occupency300,
                  Occupency500,
                ]}
                type='donut'
                className={classes.chart}
              />
            </Paper>
          </Grid>
        </Grid>
      </center>
    </div>
  )
}
