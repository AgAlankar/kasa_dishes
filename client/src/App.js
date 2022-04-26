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
import Requestform from './pages/Requestform'
import Login from './pages/Login'
import UserDash from './pages/UserDash'
import Admin from './pages/adminlog'
import AdminDash from './pages/AdminDash'
import UserRegister from './pages/UserRegister'
import ViewReqs from './pages/ViewReqs'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/UserReg'>
          <UserRegister />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/userdash'>
          <UserDash />
        </Route>
        <Route exact path='/adminlogin'>
          <Admin />
        </Route>
        <Route exact path='/admindash'>
          <AdminDash />
        </Route>
        <Route exact path='/ViewRequest'>
          <ViewReqs />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/dish/:id'>
          <SingleDish />
        </Route>
        <Route path='/Requestform'>
          <Requestform />
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
