import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAdmin, logoutAll } from '../sessHandler'
export default function AdminDash(params) {
  if (!getAdmin()) {
    window.location.href = 'http://localhost:3000/adminlogin'
    return <div></div>
  }
  return (
    <section className='section search'>
      <form className='search-form'>
        <div className='form-control row'>
          <Link
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className='btn btn-primary btn-details'
            to='/AddDish'
          >
            Add Dish
          </Link>
          <br></br>
          <Link
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className='btn btn-primary btn-details'
            to='/ViewRequest'
          >
            View Dish Requests
          </Link>
        </div>
      </form>
    </section>
  )
}
