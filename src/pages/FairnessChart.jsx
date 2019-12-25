import React from 'react'
import { data150 } from '../data/Data150'
import { Grid } from '@material-ui/core'
import Fairness from './Fairness'

export default function FairnessChart() {
  return (
    <div style={{ flexGrow: 1, marginLeft: '100px', marginTop: '50px' }}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Fairness dataOccupancy={data150} rata={500} />
        </Grid>
      </Grid>
    </div>
  )
}
