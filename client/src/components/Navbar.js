import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { getUser, logoutAll, getAdmin } from '../sessHandler'
export default function Navbar() {
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
          {getUser() && <li>
            <Link to='/Requestform'>Request</Link>
          </li>}
          <li>
            {getUser() ? (
              <Link to='/userdash'>Dashboard</Link>
            ) : getAdmin() ? (
              <Link to='/AdminDash'>Dashboard</Link>
            ) : (
              <div>
                <Link to='/login'>Login</Link>
                <Link to='/adminlogin'>Admin Login</Link>
              </div>
            )}
          </li>
          <li>
            {getUser() || getAdmin() ? (
              <button
                className='btn btn-primary btn-details'
                onClick={logoutAll}
              >
                Log Out
              </button>
            ) : (
              <div></div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
