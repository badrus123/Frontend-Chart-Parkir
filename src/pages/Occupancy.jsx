import React from 'react'
import Chart from 'react-apexcharts'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '700px',
    marginTop: '50px',
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
    record.push(val.no)
    tempat.push(data)
  })
  let meanOcupency = sumOcupency / props.rata

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
      text: `Occupancy Data ${props.rata} dengan Rata Rata ${meanOcupency} %`,
      align: 'center',
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
      name: 'tempat terisi',
      data: tempat,
    },
  ]

  donut(meanOcupency)
  return (
    <Paper className={classes.root}>
      <Chart options={options} series={series} type='line' width='700' />
    </Paper>
  )
}
