import React from 'react'
import Chart from 'react-apexcharts'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '700px',
    marginTop: '30px',
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
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
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
    chart: {
      id: 'record',
    },
    xaxis: {
      categories: record,
    },
  }
  const series = [
    {
      name: 'kendaraan',
      data: time,
    },
  ]

  return (
    <Paper className={classes.root}>
      <Chart options={options} series={series} type='line' width='700' />
    </Paper>
  )
}
