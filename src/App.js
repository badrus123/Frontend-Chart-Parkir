import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OccupencyChart from './pages/OccupencyChart'
import Drawer from './component/drawer/DrawerHeader'
import DelayChart from './pages/DelayChart'
import Simulasi from './pages/SimulasiChart'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Drawer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/occupancy-chart' component={OccupencyChart} />
        <Route exact path='/delay-chart' component={DelayChart} />
        <Route exact path='/simulasi' component={Simulasi} />
      </Switch>
    </div>
  )
}

export default App
