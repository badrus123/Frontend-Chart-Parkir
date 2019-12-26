import React from 'react'
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
      width: '600px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '700px',
    },
    marginTop: '50px',
  },
  chart: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '600px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '700px',
    },
  },
}))

export default function Occupancy(props) {
  const classes = useStyles()
  const record = []
  const time = []

  props.dataOccupancy.map(val => {
    record.push(val.no)
    time.push(parseInt(val.waktu_delay_int, 10))
  })
  const options = {
    chart: {
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: `Delay Data ${props.rata}`,
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: record,
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
  }
  const series = [
    {
      name: 'kendaraan',
      data: time,
    },
  ]

  return (
    <Paper className={classes.root}>
      <Chart
        options={options}
        series={series}
        type='line'
        className={classes.chart}
      />
    </Paper>
  )
}
