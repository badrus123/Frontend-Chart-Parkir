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
      width: '700px',
    },
  },
}))

export default function Occupancy(props) {
  const classes = useStyles()
  const harga = []
  const vip = []
  const reg = []
  let hargaVIP = 0
  let hargaReg = 0
  props.dataOccupancy.map(val => {
    harga.push(parseInt(val.biaya))
    if (val.jenis_parkir === 'reg') {
      hargaReg = hargaReg + parseInt(val.biaya)
      reg.push(parseInt(val.biaya))
    }
    if (val.jenis_parkir === 'vip') {
      hargaVIP = hargaVIP + parseInt(val.biaya)
      vip.push(parseInt(val.biaya))
    }
  })
  console.log('harga reguler', hargaReg)
  console.log('harga vip', hargaVIP)
  console.log('banyak reguler', reg.length)
  console.log('banyak vip', vip.length)
  const options = {
    chart: {
      shadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Fairness Biaya VIP dan Reguler',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 6,
    },
    xaxis: {
      categories: harga,
      title: {
        text: 'biaya',
      },
    },
    yaxis: {
      title: {
        text: 'Harga',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
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
      name: 'VIP',
      data: vip,
    },
    {
      name: 'reg',
      data: reg,
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
