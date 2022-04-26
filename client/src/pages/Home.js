import React from 'react'
import DishList from '../components/DishList'
import SearchForm from '../components/SearchForm'

import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
function Home(props) {
  // useEffect(() => {
  //   axios
  //     .get(API_BASE_URL + '/user/me', {
  //       headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
  //     })
  //     .then(function (response) {
  //       if (response.status !== 200) {
  //         redirectToLogin()
  //       }
  //     })
  //     .catch(function (error) {
  //       redirectToLogin()
  //     })
  // })
  // function redirectToLogin() {
  //   props.history.push('/login')
  // }
  return (
    <main>
      <SearchForm />
      <DishList />
    </main>
  )
}

export default withRouter(Home)
