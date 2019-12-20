import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OccupencyChart from './pages/OccupencyChart'
import Drawer from './component/drawer/DrawerHeader'
import DelayChart from './pages/DelayChart'
import FairnessChart from './pages/FairnessChart'

function App() {
  return (
    <div>
      <Drawer />
      <Switch>
        <Route exact path='/' component={OccupencyChart} />
        <Route exact path='/delay-chart' component={DelayChart} />
        <Route exact path='/fairness-chart' component={FairnessChart} />
      </Switch>
    </div>
  )
}

export default App
