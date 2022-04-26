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
        const response = await fetch(`http://localhost:8080/api/dishes/${id}`)
        const data = await response.json()
        console.log(data)
        const food = data
        if (food) {
          const {
            dname: name,
            ImageURL: image,
            Cuisine: info,
            Category: category,
            Veg: vegg,
            Expertise: expertise,
            PrepTime: preptime,
            RecipeURL: recipeurl,
            Views: views,
            Calories: calories,
            Fats: fats,
            Proteins: proteins,
            Carbs: carbs,
          } = data
          // const ingredients = [
          //   Ingredient1,
          //   Ingredient2,
          //   Ingredient3,
          //   Ingredient4,
          //   Ingredient5,
          // ]
          const newDish = {
            name,
            image,
            info,
            category,
            vegg,
            expertise,
            preptime,
            recipeurl,
            views,
            calories,
            fats,
            proteins,
            carbs,
            // instructions,
            // ingredients,
          }
          console.log(newDish)
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
    const {
      name,
      image,
      category,
      info,
      vegg,
      expertise,
      preptime,
      recipeurl,
      views,
      calories,
      fats,
      proteins,
      carbs,
      instructions,
      ingredients,
    } = dish
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
              <span className='food-data'>Veg :</span>
              {vegg === '1' ? 'Veg' : 'Non-Veg'}
            </p>
            <p>
              <span className='food-data'>Expertise :</span> {expertise}
            </p>
            <p>
              <span className='food-data'>Cooking time (mins):</span> {preptime}
            </p>
            <p>
              <span className='food-data'>Calories :</span> {calories}
            </p>
            <p>
              <span className='food-data'>Fats :</span> {fats}
            </p>
            <p>
              <span className='food-data'>Protiens :</span> {proteins}
            </p>
            <p>
              <span className='food-data'>Carbs :</span> {carbs}
            </p>
            <p>
              <a className='food-data'>Recipe :</a> {recipeurl}
            </p>
            <p>
              <span className='food-data'>Views :</span> {views}
            </p>
            {/* <p>
              <span className='food-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='food-data'>ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p> */}
          </div>
        </div>
      </section>
    )
  }
}
