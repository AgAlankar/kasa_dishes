import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
export default function Navbar() {
  function getUser(){
    const u = window.localStorage.getItem('sessUser');
    if(!u){
      return false;
    }else{
      const parsed = JSON.parse(u);
      // for(let k of Obj 
      console.log(parsed);
      return parsed;
    }
  }

  function getAdmin(){
    const u = window.localStorage.getItem('sessAdmin');
    if(!u){
      return false;
    }else{
      const parsed = JSON.parse(u);
      // for(let k of Obj 
      console.log(parsed);
      return parsed;
    }
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
        </ul>
        {
          getUser()? 
          <Link to='/userdash'>
            {(getUser()).uname}
          </Link> 
          : (
              getAdmin()?
              <Link to='/AdminDash'>{(getAdmin()).aname}</Link>
              :(<div>
              <Link to='/login'>Login</Link>
              <Link to='/adminlogin'>Admin Login</Link>
              </div>
              )
            )
        }
      

      </div>
    </nav>
  )
}
