import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleDish from './pages/SingleDish'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
import AddDish from './pages/AddDish'
import Login from './pages/Login'
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/dish/:id'>
          <SingleDish />
        </Route>
        <Route path='/AddDish'>
          <AddDish />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
