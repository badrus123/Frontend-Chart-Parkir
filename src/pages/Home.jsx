import React, { useState, useEffect } from 'react'
import { Paper, Grid, Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Chart from 'react-apexcharts'
import MaterialTable from 'material-table'
import axios from 'axios'
import { TOKEN } from '../utils'
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '500px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '700px',
    },
  },
  rootLine: {
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
  rootPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '70px',
      marginTop: '20px',
      marginLeft: '25px',
    },
    [theme.breakpoints.up('md')]: {
      width: '300px',
      height: '70px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '300px',
      height: '100px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '550px',
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
      paddingLeft: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '30px',
      paddingLeft: '100px',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '30px',
      paddingLeft: '100px',
    },
  },
  chartPie: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '500px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '700px',
    },
  },
  chartLine: {
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
  table: {
    [theme.breakpoints.down('sm')]: {
      width: '350px',
      marginTop: '30px',
    },
    [theme.breakpoints.up('md')]: {
      width: '1000px',
      marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1100px',
      marginTop: '30px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '1700px',
      marginTop: '30px',
    },
  },
}))

export default function Home() {
  const classes = useStyles()
  let Xrecord = []
  let YDelay = []
  const harga = []
  const vip = []
  const reg = []
  let hargaVIP = 0
  let hargaReg = 0
  const [dataParkir, setDataParkir] = useState(null)
  const [dataPerform, setDataPerform] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const DataParkir = await axios(
        'https://api-parkiran.herokuapp.com/api/v1/get-all-parkiran',
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )
      const DataPerform = await axios(
        'https://api-parkiran.herokuapp.com/api/v1/get-performance',
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )
      setDataParkir(DataParkir.data)
      setDataPerform(DataPerform.data)
    }

    fetchData()
  }, [])
  if (dataParkir === null) {
    return <div>loading</div>
  }
  if (dataPerform === null) {
    return <div>loading</div>
  }
  console.log(dataPerform)
  dataParkir.map(val => {
    harga.push(parseInt(val.harga_reservasi))
    if (val.jenis_parkiran === 'REG') {
      hargaReg = hargaReg + parseInt(val.harga_reservasi)
      reg.push(parseInt(val.harga_reservasi))
    }
    if (val.jenis_parkiran === 'VIP') {
      hargaVIP = hargaVIP + parseInt(val.harga_reservasi)
      vip.push(parseInt(val.harga_reservasi))
    }
  })

  dataPerform.map(v => {
    Xrecord.push(v.rate_kedatangan)
    YDelay.push(v.rata_rata_delay_antrian)
  })
  const pieHarga = {
    labels: ['Reguler', 'VIP'],
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
      text: 'Fairness Revenue VIP dan Reguler',
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
  }
  const pieTotal = {
    labels: ['Reguler', 'VIP'],
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
      text: 'Fairness Jumlah VIP dan Reguler',
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
  }

  const linePerform = {
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
      text: `Performace`,
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
      categories: Xrecord,
    },
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} md={4}>
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
                    800 ++
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>monetization_on</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Revenue
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    Rp {hargaReg + hargaVIP}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <Paper className={classes.rootPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Icon className={classes.iconPaper}>show_chart</Icon>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={'h6'} className={classes.titlePaper}>
                    Occupancy
                  </Typography>
                  <Typography variant={'p'} className={classes.descPaper}>
                    9.52 %
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{ marginTop: '10px' }}>
            <Paper className={classes.root}>
              <Chart
                options={pieHarga}
                series={[hargaReg, hargaVIP]}
                type='pie'
                className={classes.chartPie}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} style={{ marginTop: '10px' }}>
            <Paper className={classes.root}>
              <Chart
                options={pieTotal}
                series={[reg.length, vip.length]}
                type='pie'
                className={classes.chartPie}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '10px' }}>
            <Paper className={classes.rootLine}>
              <Chart
                options={linePerform}
                series={[
                  {
                    name: 'performance',
                    data: YDelay,
                  },
                ]}
                type='line'
                className={classes.chartLine}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <center>
        <div className={classes.table}>
          <MaterialTable
            columns={[
              { title: 'nama', field: 'nama' },
              { title: 'Nomer Parkiran', field: 'no_parkiran' },
              {
                title: 'jenis parkiran',
                field: 'jenis_parkiran',
              },
              {
                title: 'Waktu Datang',
                field: 'jam_masuk',
              },
              {
                title: 'Waktu Dapat Parkir',
                field: 'waktu_dapat_parkir',
              },
              {
                title: 'Waktu Keluar',
                field: 'jam_keluar',
              },
              {
                title: 'Biaya Parkir',
                field: 'harga_reservasi',
              },
            ]}
            data={dataParkir}
            options={{
              search: true,
              width: '250px',
              rowStyle: {
                backgroundColor: '#EEE',
              },
              sorting: true,
            }}
            title='Table User Parkir'
          />
        </div>
      </center>
    </div>
  )
}
