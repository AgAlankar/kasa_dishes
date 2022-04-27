import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

export default function SingleDish() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [dish, setDish] = React.useState(null)
  const [ingredient, setIngredient] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    async function getDish() {
      try {
        const response = await fetch(`http://localhost:8080/api/dishes/${id}`)

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
        const response2 = await fetch(`http://localhost:8080/api/dishes/ingredients/${id}`, options)
        const data2 = await response2.json()
        console.log(data2)
        const data = await response.json()
        console.log(data)
        const food = data

        if (food) {
          const {
            FID:fid,
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
            fid,
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
          setIngredient(data2)
        } else {
          setDish(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getDish()
    // async function getIngredient() {
    //   try {
    //     // const optbody = {
    //     //   dish,
    //     // }
    //     const options = {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json;charset=utf-8',
    //       },
    //       // body: JSON.stringify(optbody),
    //     }
    //     const{fid}=dish
    //     const response = await fetch(`http://localhost:8080/api/dishes/ingredients/${fid}`, options)
    //     const data = await response.json()
    //     console.log(data)
    //     const newingredient = data
    //     if (newingredient) {
    //       console.log(newingredient);
    //       setIngredient(newingredient);
    //     } else {
    //       setIngredient(null);
    //     }
    //   } catch(error){
    //     console.log(error);
    //   }
    // }
    // getIngredient();
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
            <p>
              
              <span className='food-data'>ingredients :</span>
              {ingredient.map(x => x.iname).join(", ")}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
