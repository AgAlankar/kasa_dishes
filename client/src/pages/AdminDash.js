import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAdmin, logoutAll } from '../sessHandler'
export default function AdminDash(params) {
  if (!getAdmin()) {
    window.location.href = 'http://localhost:3000/adminlogin'
    return <div></div>
  }
  return (
    <div>
      <Link to='/AddDish'>Add Dish</Link>
      <br></br>
      <Link to='/ViewRequest'>View Dish Requests</Link>
    </div>
  )
}
