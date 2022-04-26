import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleDish from './pages/SingleDish'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
import AddDish from './pages/AddDish'
import RegistrationForm from './pages/RegistrationForm'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'
import AlertComponent from './components/AlertComponent'

function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  return (
    <Router>
      <Navbar title={title} />
      <Switch>
        <Route path='/register'>
          <RegistrationForm
            showError={updateErrorMessage}
            updateTitle={updateTitle}
          />
        </Route>

        <PrivateRoute path='/home'>
          <Home />
        </PrivateRoute>

        <Route path='/login'>
          <Login showError={updateErrorMessage} updateTitle={updateTitle} />
        </Route>
        <Route path='/register'>
          <RegistrationForm
            showError={updateErrorMessage}
            updateTitle={updateTitle}
          ></RegistrationForm>
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
      <AlertComponent
        errorMessage={errorMessage}
        hideError={updateErrorMessage}
      />
    </Router>
  )
}

export default App
