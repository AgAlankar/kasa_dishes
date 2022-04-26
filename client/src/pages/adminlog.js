import React, { useCallback, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import '../index.css'
// import { check } from '../../../backend/app/models/user.model'

export default function Adminlog() {
  const [aname, setaname] = useState('')
  const [password, setPassword] = useState('')
  const [ok, setOk] = useState(true)
  const [go, setGo] = useState(false)

  function validateForm() {
    return aname.length > 0 && password.length > 0
  }
  async function getAdminData() {
    try {
      const url = 'http://localhost:8080/api/admin/check'
      const optbody = {
        aname,
        pass: password,
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(optbody),
      }
      console.log(options)
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
      const adata = await getAdminData()
      const { exists, sessAdmin } = adata
      if (exists) {
        localStorage.setItem('sessAdmin', JSON.stringify(sessAdmin))
        setGo(true)
      } else {
        setOk(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [aname, password])

  function handleSubmit(event) {
    event.preventDefault()
    // setCheck(true);
    checkCred()
  }
  useEffect(() => {
    if (go) {
      window.location.href = 'http://localhost:3000/admindash'
    }
  }, [go])
  // useEffect(()=>{
  //   // if(check){
  //     checkCred()
  //   //   setCheck(false)
  //   // }
  // },[check,checkCred])

  return (
    <div className='Admin'>
      <Form onSubmit={handleSubmit}>
        <Form.Group size='lg' controlId='aname'>
          <Form.Label>Admin Username</Form.Label>
          <Form.Control
            autoFocus
            type='aname'
            value={aname}
            onChange={(e) => setaname(e.target.value)}
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
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {!ok && 'Incorrect credentials'}
    </div>
  )
}
