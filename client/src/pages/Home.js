import React from 'react'
import DishList from '../components/DishList'
import SearchForm from '../components/SearchForm'
export default function Home() {
  return (
    <main>
      <SearchForm />
      <DishList />
    </main>
  )
}
