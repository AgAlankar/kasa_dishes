import React, { Component, useState } from 'react'
export default function ViewDishes() {
  const [loaded, setLoaded] = useState(false)
  const [dishList, setDishList] = useState([])

  async function loadReqs() {
    const response = await fetch('http://localhost:8080/api/dishes')
    const data = await response.json()
    console.log(data)
    setDishList(data)
  }
  async function delDish(fid) {
    const url = `http://localhost:8080/api/dishes/${fid}`
    // console.log(optbody)
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(`${url}`, options)
    const data = await response.json()
    console.log(data)
    window.location.reload()
  }
  // loadReqs()
  if (!loaded) {
    loadReqs()
    setLoaded(true)
  }
  return (
    <section className='section search'>
      <form className='search-form'>
        <div className='form-control row'>
          <h1>Delete Dish</h1>
          {dishList.map((item) => (
            <div key={item.FID}>
              {item.dname}

              <button
                className='btn btn-primary btn-details'
                onClick={() => {
                  delDish(item.FID)
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </form>
    </section>
  )
}
