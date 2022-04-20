import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'http://localhost:8080/api/dishes/'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}`)
      const data = await response.json()
      console.log(data)
      const drinks = data
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { FID, dname, ImageURL, Veg, Expertise } = item

          return {
            id: FID,
            name: dname,
            image: ImageURL,
            info: Expertise,
            glass: Veg ? 'Veg' : 'Non-Veg',
          }
        })
        console.log(newCocktails)
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
  }, [searchTerm, fetchDrinks])
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
