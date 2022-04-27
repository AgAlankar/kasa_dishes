import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { getUser } from '../sessHandler'

export default function SingleDish() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [dish, setDish] = React.useState(null)
  const [fav, setFav] = React.useState(-1)
  const [ingredient, setIngredient] = React.useState([])
  const [equipment, setEquipment] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    async function getDish() {
      try {
        const response = await fetch(`http://localhost:8080/api/dishes/${id}`)
        const data = await response.json()
        // console.log(data)
        const food = data

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        }

        const response2 = await fetch(`http://localhost:8080/api/dishes/ingredients/${id}`, options)
        const data2 = await response2.json()
        console.log(data2)

        const response3 = await fetch(`http://localhost:8080/api/dishes/equipments/${id}`, options)
        const data3 = await response3.json()
        // console.log(data3)
        // const response4 =await fetch(`http://localhost:8080/api/dishes/equipments/${id}`);

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
          // console.log(newDish)
          let u = getUser();
          if(u){
            // console.log(u.favs.map(x=>x.fid))
            if(u.favs.map(x=>x.fid).includes(newDish.fid)) setFav(1);
            else setFav(0);
          }
          setDish(newDish)
          setIngredient(data2)
          setEquipment(data3)
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
   
    const handleFav = async () =>{
      let url = 'http://localhost:8080/api/users/'
      // console.log(this.state)
      const optbody = {
        uname: getUser().uname,
        fid: dish.fid
      }
      // console.log(optbody)
      const options = {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(optbody),
      }
      if(fav===0){
        url+= 'fav';
        options.method = 'POST';
        const u = getUser();
        // console.log(...(u.favs));
        u.favs.push({fid: dish.fid,dname:dish.name});
        window.localStorage.setItem('sessUser',JSON.stringify(u));
        // console.log(...(getUser().favs));
        setFav(1);
      }else{
        url+= 'del';
        options.method = 'DELETE';
        const u = getUser();
        // console.log(...(u.favs));
        u.favs = u.favs.filter(x => x.fid !== dish.fid);
        window.localStorage.setItem('sessUser',JSON.stringify(u));
        // console.log(...(getUser().favs));
        setFav(0);
      }
      const response = await fetch(`${url}`, options)
      // const data = await response.json()
      console.log(response.status);
    }
 
    return (
      <section className='section dish-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name} {fav===0? '☆' : fav===1? '⭐' : ''}</h2>
        {
          fav===-1? 
          <span classname='food-data'>Login to add to favourites</span>
          : fav ===0?
          <span><button className='btn btn-primary btn-details' onClick={handleFav}>Favourite</button></span>
          :
          <span><button className='btn btn-primary btn-details'onClick={handleFav}>Unfavourite</button></span>
        }
        <br></br><br></br>
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
              <span className='food-data'>Recipe :</span> <a className='food-dataa' href={`${recipeurl}`} >{recipeurl}</a>
            </p>
            <p>
              <span className='food-data'>Views :</span> {views}
            </p>
            <p>
              <span className='food-data'>ingredients :</span>
              {ingredient.map(x => x.iname).join(", ")}
            </p>
            <p>
              <span className='food-data'>equipments :</span>
              {equipment.map(x => x.ename).join(", ")}
            </p>
            <p>
              <span className='food-data'>Restrictions :</span>
              {ingredient.map(x => x.restrictions).filter((val,ind,self)=>val!=null&&self.indexOf(val)===ind).join(", ")}
            </p>
          </div>
        </div>
      </section>
    )
  }
}
