import React, { useState, useEffect } from 'react'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Chart from 'react-apexcharts'
import MaterialTable from 'material-table'
import axios from 'axios'
import { TOKEN } from '../utils'
import Denah from '../denah.png'
import ImgsViewer from 'react-images-viewer'
import Loading from './Loading'

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
      width: '1500px',
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
      width: '1500px',
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
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '150px',
    },
    [theme.breakpoints.up('md')]: {
      width: '200px',
      height: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1100px',
      height: '500px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '1500px',
      height: '700px',
    },
  },
}))

export default function AkumulasiParkir() {
  const classes = useStyles()
  let Xakumulasi = []
  let Xmasuk = []
  let Xkeluar = []

  let ranges = []

  const [dataPerform, setDataPerform] = useState(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const DataPerform = await axios(
        'https://api-parkiran.herokuapp.com/api/v1/get-performance',
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )

      setDataPerform(DataPerform.data)
    }

    fetchData()
  }, [])

  if (dataPerform === null) {
    return <Loading />
  }

  dataPerform.map(v => {
    Xakumulasi.push(v.akumulasi_)
    Xkeluar.push(v.total_keluar)
    Xmasuk.push(v.total_masuk)
    ranges.push(v.ranges)
  })

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
      categories: ranges,
    },
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} style={{ marginTop: '10px' }}>
            <Paper className={classes.rootLine}>
              <Chart
                options={linePerform}
                series={[
                  {
                    name: 'masuk',
                    data: Xmasuk,
                  },
                  {
                    name: 'keluar',
                    data: Xkeluar,
                  },
                  {
                    name: 'akumulasi',
                    data: Xakumulasi,
                  },
                ]}
                type='line'
                className={classes.chartLine}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: '10px' }}>
            <Paper className={classes.rootLine}>
              <img
                src={Denah}
                alt='denah'
                className={classes.image}
                onClick={() => setOpen(true)}
              />
              <ImgsViewer
                imgs={[{ src: Denah }]}
                isOpen={open}
                onClose={() => setOpen(false)}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <center>
        <div className={classes.table}>
          <MaterialTable
            columns={[
              { title: 'ranges', field: 'ranges' },
              { title: 'Delay', field: 'rata_rata_delay_antrian' },
              {
                title: 'total masuk',
                field: 'total_masuk',
              },
              {
                title: 'rate kedatangan',
                field: 'rate_kedatangan',
              },
              {
                title: 'akumulasi',
                field: 'akumulasi_',
              },
              {
                title: 'Total Keluar',
                field: 'total_keluar',
              },
              {
                title: 'Slot kosong',
                field: 'kosong',
              },
              {
                title: 'Slot Isi',
                field: 'isi',
              },
              {
                title: 'Occupancy (%)',
                field: 'occupancy',
              },
            ]}
            data={dataPerform}
            options={{
              search: true,
              width: '250px',
              rowStyle: {
                backgroundColor: '#EEE',
              },
              sorting: true,
            }}
            title='Table Akumulasi'
          />
        </div>
      </center>
    </div>
  )
}
