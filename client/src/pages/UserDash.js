import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
export default function UserDash(params) {
  const u = window.localStorage.getItem('sessUser')
  if (!u) {
    window.location.href = 'http://localhost:3000/'
  }
  function onLogout() {
    window.localStorage.removeItem('sessUser')
    window.location.href = 'http://localhost:3000/'
  }
  function favLinks() {
    const favs = JSON.parse(u).favs
    return favs.map((x) => {
      const { fid, dname } = x
      return (
        <React.Fragment>
          <Link
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className='btn btn-primary btn-details'
            key={fid}
            to={`/dish/${fid}`}
          >
            {dname}
          </Link>
          <br></br>
        </React.Fragment>
      )
    })
  }
  return (
    <section className='section search'>
      <form className='search-form'>
        <div className='form-control row'>
          <div className='column pd-4'>
            <h2>My favourites</h2>
            {favLinks()}
          </div>
        </div>
      </form>
    </section>
  )
}
