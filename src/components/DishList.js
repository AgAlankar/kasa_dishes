import React from 'react'
import Dish from './Dish'
import Loading from './Loading'
import { useGlobalContext } from '../context'

export default function DishList() {
  const { Dishes, loading } = useGlobalContext()
  if (loading) {
    return <Loading />
  }
  if (Dishes.length < 1) {
    return (
      <h2 className='section-title'>no dishes matched your search criteria</h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>dishes</h2>
      <div className='dishes-center'>
        {Dishes.map((item) => {
          return <Dishes key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}
