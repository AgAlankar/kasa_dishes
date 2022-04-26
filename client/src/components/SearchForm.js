import React, { useState } from 'react'
import { useGlobalContext } from '../context'
export default function SearchForm() {
  const [showFilt,setShowFilt] = useState(false)
  const { setSearchTerm } = useGlobalContext()
  const nameVal = React.useRef('')
  const cuisVal = React.useRef('')
  const vegVal = React.useRef('')
  const catVal = React.useRef('')
  const expVal = React.useRef('')
  const prepVal = React.useRef('')
  const calVal = React.useRef('')
  const fatVal = React.useRef('')
  const protVal = React.useRef('')
  const carbVal = React.useRef('')

  React.useEffect(() => {
    try{
      nameVal.current.focus()
      cuisVal.current.focus()
      vegVal.current.focus()
      catVal.current.focus()
      expVal.current.focus()
      prepVal.current.focus()
      calVal.current.focus()
      fatVal.current.focus()
      protVal.current.focus()
      carbVal.current.focus()
    }catch{

    }
  }, [])

  function searchDish() {
    const tempTerm = {dname: nameVal.current.value}
    if(cuisVal.current.value !== ''){
      tempTerm['cuisine'] = cuisVal.current.value;
    }
    if(vegVal.current.value !== ''){
      tempTerm['veg'] = vegVal.current.value;
    }
    if(catVal.current.value !== ''){
      tempTerm['category'] = catVal.current.value;
    }
    if(expVal.current.value !== ''){
      tempTerm['maxexp'] = expVal.current.value;
    }
    if(prepVal.current.value !== ''){
      tempTerm['maxprep'] = prepVal.current.value;
    }
    if(calVal.current.value !== '' && !isNaN(parseFloat(calVal.current.value))){
      tempTerm['maxcal'] = calVal.current.value;
    }
    if(fatVal.current.value !== '' && !isNaN(parseFloat(fatVal.current.value))){
      tempTerm['maxfat'] = fatVal.current.value;
    }
    if(protVal.current.value !== '' && !isNaN(parseFloat(protVal.current.value))){
      tempTerm['minprot'] = protVal.current.value;
    }
    if(carbVal.current.value !== '' && !isNaN(parseFloat(carbVal.current.value))){
      tempTerm['maxcarb'] = carbVal.current.value;
    }
    setSearchTerm({...tempTerm})

  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  function toggleFilt(){
    if(showFilt){
      setSearchTerm({dname:nameVal.current.value});
    }
    setShowFilt(!showFilt);
  }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control row'>
          <label htmlFor='name'>Search a dish</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={nameVal}
            onChange={searchDish}
          />
          <br></br> <br></br> <hr></hr> <br></br>
          <button onClick={toggleFilt}>{showFilt? "Hide" : "Show"} Filter</button>
          {showFilt && <div>
            <label htmlFor='cuis'>Filter by cuisine</label>
            <input
              type='text'
              name='cuis'
              id='cuis'
              ref={cuisVal}
              onChange={searchDish}
            />
            <label htmlFor='veg'>Filter by veg/non-veg</label>
            <select
              name='veg'
              id='veg'
              ref={vegVal}
              onChange={searchDish}
            >            
              <option value="">Select</option>
              <option value="1">Veg</option>
              <option value="0">Non-veg</option>
            </select>          
            <label htmlFor='cat'>Filter by category</label>
            <input
              type='text'
              name='cat'
              id='cat'
              ref={catVal}
              onChange={searchDish}
            />
            <label htmlFor='exp'>Filter by maximum expertise</label>
            <select
              name='exp'
              id='exp'
              ref={expVal}
              onChange={searchDish}
            >            
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> 
            <label htmlFor='prep'>Filter by maximum prep time</label>
            <select
              name='prep'
              id='prep'
              ref={prepVal}
              onChange={searchDish}
            >            
              <option value="">Select</option>
              <option value="10">10 mins</option>
              <option value="20">20 mins</option>
              <option value="30">30 mins</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
            <label htmlFor='cal'>Filter by max calorie value</label>
            <input
              type='text'
              name='cal'
              id='cal'
              ref={calVal}
              onChange={searchDish}
            />
            <label htmlFor='fat'>Filter by max fat value</label>
            <input
              type='text'
              name='fat'
              id='fat'
              ref={fatVal}
              onChange={searchDish}
            />
            <label htmlFor='prot'>Filter by min protein value</label>
            <input
              type='text'
              name='prot'
              id='prot'
              ref={protVal}
              onChange={searchDish}
            />
            <label htmlFor='carb'>Filter by max carb value</label>
            <input
              type='text'
              name='carb'
              id='carb'
              ref={carbVal}
              onChange={searchDish}
            />
          </div>}
        </div>
      </form>
    </section>
  )
}
