import React, { useCallback, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../index.css'
// import { check } from '../../../backend/app/models/user.model'

export default function Login() {
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')
  const [ok, setOk] = useState(true)
  const [go, setGo] = useState(false)

  function validateForm() {
    return uname.length > 0 && password.length > 0
  }
  async function getUserData() {
    try {
      const url = 'http://localhost:8080/api/users/check'
      const optbody = {
        uname,
        pass: password,
      }
      // console.log(optbody)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(optbody),
      }
      const response = await fetch(`${url}`, options)
      const data = await response.json()
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }
  async function getUserFavs() {
    try {
      const url = 'http://localhost:8080/api/users/allfav'
      const optbody = {
        uname,
      }
      console.log(optbody)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(optbody),
      }
      const response = await fetch(`${url}`, options)
      const data = await response.json()
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }
  const checkCred = useCallback(async () => {
    try {
      const udata = await getUserData()
      const { exists, sessUser } = udata
      if (exists) {
        const fdata = await getUserFavs()
        if (fdata) {
          sessUser.favs = fdata
        }
        localStorage.setItem('sessUser', JSON.stringify(sessUser))
        setGo(true)
      } else {
        setOk(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [uname, password])

  function handleSubmit(event) {
    event.preventDefault()
    // setCheck(true);
    checkCred()
  }
  useEffect(() => {
    if (go) {
      window.location.href = 'http://localhost:3000/'
    }
  }, [go])
  // useEffect(()=>{
  //   // if(check){
  //     checkCred()
  //   //   setCheck(false)
  //   // }
  // },[check,checkCred])

  return (
    <section className='section search'>
      <div className='Login'>
        <div className='form-control row'>
          <Form className='search-form' onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='uname'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type='uname'
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </Form.Group>
            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button
              className='btn btn-primary btn-details'
              type='submit'
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>

          {!ok && 'Incorrect credentials'}
        </div>
      </div>
    </section>
  )
}
