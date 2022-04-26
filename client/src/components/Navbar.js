import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { getUser, logoutUser, getAdmin, logoutAdmin } from '../sessHandler'
export default function Navbar() {
  function onLogout() {
    logoutUser()
    logoutAdmin()
    window.location.href = 'http://localhost:3000/'
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
          <li>
            <Link to='/Requestform'>Request</Link>
          </li>
          <li>
            {getUser() ? (
              <Link to='/userdash'>Dashboard</Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
          <li>
            {getUser() ? (
              <button
                className='btn btn-primary btn-details'
                onClick={onLogout}
              >
                Log Out
              </button>
            ) : (
              <div></div>
            )}
          </li>
        </ul>
        {getUser() ? (
          <Link to='/userdash'>{getUser().uname}</Link>
        ) : getAdmin() ? (
          <Link to='/AdminDash'>{getAdmin().aname}</Link>
        ) : (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/adminlogin'>Admin Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
