import React, { Component, useState } from 'react'
export default function ViewReqs() {
  const [loaded, setLoaded] = useState(false)
  const [reqList, setReqList] = useState([])
  
  const u = window.localStorage.getItem('sessAdmin')
  if (!u) {
    window.location.href = 'http://localhost:3000/'
  }
  else
  {
      async function loadReqs() {
      const response = await fetch('http://localhost:8080/api/ask/all')
      const data = await response.json()
      console.log(data)
      setReqList(data)
    }
    async function delReq(rid) {
      const url = `http://localhost:8080/api/ask/${rid}`
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
          <h1>View Requests</h1>
          {reqList.map((item) => (
            <div key={item.RID}>
              <p>{item.RName}</p>
              <p>{item.recipieurl}</p>

              <button
                className='btn btn-primary btn-details'
                onClick={() => {
                  delReq(item.RID)
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
}
