import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OccupencyChart from './pages/OccupencyChart'
import Drawer from './component/drawer/DrawerHeader'
import DelayChart from './pages/DelayChart'
import Simulasi from './pages/SimulasiChart'
import Home from './pages/Home'
import Login from './pages/Login'
import { TOKEN } from './utils'

function App() {
  return (
    <div>
      {TOKEN ? <Drawer /> : ''}
      <Switch>
        <Route exact path='/' component={TOKEN ? Home : Login} />
        <Route exact path='/occupancy-chart' component={OccupencyChart} />
        <Route exact path='/delay-chart' component={DelayChart} />
        <Route exact path='/simulasi' component={Simulasi} />
      </Switch>
    </div>
  )
}

export default App
