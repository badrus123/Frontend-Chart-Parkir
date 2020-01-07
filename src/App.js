import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Drawer from './component/drawer/DrawerHeader'
import Simulasi from './pages/SimulasiChart'
import Home from './pages/Home'
import Login from './pages/Login'
import { TOKEN } from './utils'
import Akumulasi from './pages/AkumulasiParkir'

function App() {
  return (
    <div>
      {TOKEN ? <Drawer /> : ''}
      <Switch>
        <Route exact path='/' component={TOKEN ? Home : Login} />
        <Route exact path='/akumulasi' component={Akumulasi} />
        <Route exact path='/simulasi' component={Simulasi} />
      </Switch>
    </div>
  )
}

export default App
