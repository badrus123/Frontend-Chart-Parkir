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
  const { donut } = props
  const record = []
  const tempat = []
  const slotParkiran = []
  let temp = 0
  let data = 0
  let sumOcupency = 0

  props.dataOccupancy.map(val => {
    slotParkiran.push(val.no_parkiran)
    let dataFilter = props.dataOccupancy.filter(
      filter => filter.no_parkiran === val.no_parkiran,
    )

    if (dataFilter.length > 1) {
      if (val.no === dataFilter[0].no) {
        data = (val.no / 84) * 100
        temp = data
      } else {
        data = temp
      }
    } else if (dataFilter.length === 1) {
      data = (val.no / 84) * 100
      temp = data
    }
    sumOcupency = sumOcupency + data
    record.push(parseInt(val.no))
    tempat.push(parseInt(data))
  })
  let meanOcupency = sumOcupency / props.rata

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
      text: `Occupancy Data ${props.rata}`,
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    xaxis: {
      categories: record,
    },
  }
  const series = [
    {
      name: 'Occupancy / car',
      data: tempat,
    },
  ]

  donut(meanOcupency)
  return (
    <Paper className={classes.root}>
      <Chart
        options={options}
        series={series}
        type='area'
        className={classes.chart}
      />
    </Paper>
  )
}
