import React from 'react'
import { data50 } from '../data/Data50'
import { data100 } from '../data/Data100'
import { data300 } from '../data/Data300'
import { data500 } from '../data/Data500'
import { data200 } from '../data/Data200'
import { data150 } from '../data/Data150'
import { Grid } from '@material-ui/core'
import Delay from './Delay'

export default function DelayChart() {
  return (
    <div style={{ flexGrow: 1, margin: '50px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data50} rata={50} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data100} rata={100} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data150} rata={150} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data200} rata={200} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data300} rata={300} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Delay dataOccupancy={data500} rata={500} />
        </Grid>
      </Grid>
    </div>
  )
}
