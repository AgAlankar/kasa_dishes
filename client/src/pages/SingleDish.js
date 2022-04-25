import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

export default function SingleDish() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [dish, setDish] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    async function getDish() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        const data = await response.json()
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newDish = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          }
          setDish(newDish)
        } else {
          setDish(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getDish()
  }, [id])
  if (loading) {
    return <Loading />
  }
  if (!dish) {
    return <h2 className='section-title'>no dish to display</h2>
  } else {
    const { name, image, category, info, glass, instructions, ingredients } =
      dish
    return (
      <section className='section dish-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='food'>
          <img src={image} alt={name}></img>
          <div className='food-info'>
            <p>
              <span className='food-data'>name :</span> {name}
            </p>
            <p>
              <span className='food-data'>category :</span> {category}
            </p>
            <p>
              <span className='food-data'>info :</span> {info}
            </p>
            <p>
              <span className='food-data'>glass :</span> {glass}
            </p>
            <p>
              <span className='food-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='food-data'>ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
