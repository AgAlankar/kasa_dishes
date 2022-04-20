import React from 'react'
import { Link } from 'react-router-dom'
export default function Dish({ image, name, id, info, glass }) {
  return (
    <article className='dish'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='dish-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/dish/${id}`} className='btn btn-primary btn-details'>
          details
        </Link>
      </div>
    </article>
  )
}
