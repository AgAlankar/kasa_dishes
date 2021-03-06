import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'http://localhost:8080/api/dishes/search'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState({})
  const [dishes, setDishes] = useState([])

  const fetchFood = useCallback(async () => {
    setLoading(true)
    try {
      const optbody = {
        filters: {...searchTerm}
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(optbody),
      }
      const response = await fetch(`${url}`, options)
      const data = await response.json()
      // console.log(data)
      const food = data
      if (food) {
        const newDishes = food.map((item) => {
          // console.log(item);
          const { fid, dname, imageurl, expertise, veg } = item

          return {
            id: fid,
            name: dname,
            image: imageurl,
            // info: expertise,
            glass: veg ? 'Veg' : 'Non-veg',
          }
        })
        setDishes(newDishes)
      } else {
        setDishes([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])
  useEffect(() => {
    fetchFood()
  }, [fetchFood])
  return (
    <AppContext.Provider value={{ loading, dishes, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
