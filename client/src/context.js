import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'http://localhost:8080/api/dishes/search'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const optbody = {
        filters: {
          maxexp: 3,
        },
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
      console.log(data)
      const drinks = data
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { FID, dname, ImageURL, Expertise, Veg } = item

          return {
            id: FID,
            name: dname,
            image: ImageURL,
            info: Expertise,
            glass: Veg ? 'Veg' : 'Non-Veg',
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])
  useEffect(() => {
    fetchDrinks()
  }, [fetchDrinks])
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
