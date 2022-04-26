import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants'
import { withRouter } from 'react-router-dom'

function Navbar(props) {
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  let title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  )
  if (props.location.pathname === '/') {
    title = 'Welcome'
  }
  function renderLogout() {
    if (props.location.pathname === '/home') {
      return (
        <div className='ml-auto'>
          <button className='btn btn-danger' onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      )
    }
  }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
    //props.history.push('/login')
  }
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <Link to='/'>
          <img src={logo} alt='dish db logo' className='logo' />
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
          {/* <div className='row col-12 d-flex justify-content-center text-white'>
            <span className='h3'>{props.title || title}</span>
            {renderLogout()}
          </div> */}
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
