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
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '700px',
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
    options: {},
    Occupancy: [
      Occupency50,
      Occupency100,
      Occupency150,
      Occupency200,
      Occupency300,
      Occupency500,
    ],
  })

  return (
    <div style={{ flexGrow: 1, margin: '50px' }}>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <Occupancy dataOccupancy={data50} rata={50} donut={setOccupency50} />
        </Grid>
        <Grid item xs={6}>
          <Occupancy
            dataOccupancy={data100}
            rata={100}
            donut={setOccupency100}
          />
        </Grid>
        <Grid item xs={6}>
          <Occupancy
            dataOccupancy={data150}
            rata={150}
            donut={setOccupency150}
          />
        </Grid>
        <Grid item xs={6}>
          <Occupancy
            dataOccupancy={data200}
            rata={200}
            donut={setOccupency200}
          />
        </Grid>
        <Grid item xs={6}>
          <Occupancy
            dataOccupancy={data300}
            rata={300}
            donut={setOccupency300}
          />
        </Grid>

        <Grid item xs={6}>
          <Occupancy
            dataOccupancy={data500}
            rata={500}
            donut={setOccupency500}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.root}>
            <Typography variant='h5' component='h3'>
              Occupancy Total
            </Typography>
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
              width='780'
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
