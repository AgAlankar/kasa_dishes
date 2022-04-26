import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import Select from 'react-select'
export default function SearchForm() {
  const [showFilt,setShowFilt] = useState(false)
  const [ingrs,setIngrs] = useState([])
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
  const ingrVal = React.useRef([])

  React.useEffect(() => {
    try {
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
      ingrVal.current.focus()
    }catch{

    }
  }, [])

  function searchDish() {
    const tempTerm = { dname: nameVal.current.value }
    if (cuisVal.current.value !== '') {
      tempTerm['cuisine'] = cuisVal.current.value
    }
    if (vegVal.current.value !== '') {
      tempTerm['veg'] = vegVal.current.value
    }
    if (catVal.current.value !== '') {
      tempTerm['category'] = catVal.current.value
    }
    if (expVal.current.value !== '') {
      tempTerm['maxexp'] = expVal.current.value
    }
    if (prepVal.current.value !== '') {
      tempTerm['maxprep'] = prepVal.current.value
    }
    if (
      calVal.current.value !== '' &&
      !isNaN(parseFloat(calVal.current.value))
    ) {
      tempTerm['maxcal'] = calVal.current.value
    }
    if (
      fatVal.current.value !== '' &&
      !isNaN(parseFloat(fatVal.current.value))
    ) {
      tempTerm['maxfat'] = fatVal.current.value
    }
    if (
      protVal.current.value !== '' &&
      !isNaN(parseFloat(protVal.current.value))
    ) {
      tempTerm['minprot'] = protVal.current.value
    }
    if (
      carbVal.current.value !== '' &&
      !isNaN(parseFloat(carbVal.current.value))
    ) {
      tempTerm['maxcarb'] = carbVal.current.value
    }

    let iCurr = ingrVal.current;
    if(iCurr.state.value !== null && iCurr.state.value.length>0){
      tempTerm['ingredients'] = ingrVal.current.state.value.map(x=>x.value);
    }
    setSearchTerm({...tempTerm})

  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  async function toggleFilt(){
    if(showFilt){
      setSearchTerm({dname:nameVal.current.value});
    }
    setShowFilt(!showFilt);
    try {
      const ingrList = await loadIngr();
      console.log(ingrList);
      setIngrs(ingrList);
    } catch (error) {
      
    }
  }
  async function loadIngr(){
    const url = "http://localhost:8080/api/ingredients";
    const response = await fetch(url);
    const data = await response.json();
    return data.map(x=>({label:x["IName"],value:x["IName"]}));

  }

  const vornv = [
    { label: 'Any', value: '', defaultValue: true },
    { label: 'Veg', value: '1' },
    { label: 'Non-Veg', value: '0' },
  ]

  const expva = [
    { label: 'Any', value: '', defaultValue: true },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ]

  const prepva = [
    { label: 'Any', value: '', defaultValue: true },
    { label: '10 mins', value: '10' },
    { label: '20 mins', value: '20' },
    { label: '30 mins', value: '30' },
    { label: '40 mins', value: '40' },
    { label: '50 mins', value: '50' },
    { label: '1 hour', value: '60' },
    { label: '1.5 hours', value: '90' },
    { label: '2 hours', value: '120' },
    { label: '2.5 hours', value: '150' },
    { label: '3 hours', value: '180' },
  ]

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

          <button onClick={toggleFilt} className='btn btn-primary btn-details'>
            {showFilt ? 'Hide' : 'Show'} Filter
          </button>
          {showFilt && (
            <div>
              <br></br>
              <label htmlFor='cuis'>Filter by cuisine</label>
              <input
                type='text'
                name='cuis'
                id='cuis'
                ref={cuisVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='veg'>Filter by veg/non-veg</label>
              <Select
                name='veg'
                id='veg'
                options={vornv}
                ref={vegVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='cat'>Filter by category</label>
              <input
                type='text'
                name='cat'
                id='cat'
                ref={catVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='exp'>Filter by maximum expertise</label>

              <Select
                name='exp'
                id='exp'
                options={expva}
                ref={expVal}
                onChange={searchDish}
              />

              <br></br>
              <label htmlFor='prep'>Filter by maximum prep time</label>
              <Select
                name='prep'
                id='prep'
                options={prepva}
                ref={prepVal}
                onChange={searchDish}
              />

              <br></br>
              <label htmlFor='cal'>Filter by max calorie value</label>
              <input
                type='text'
                name='cal'
                id='cal'
                ref={calVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='fat'>Filter by max fat value</label>
              <input
                type='text'
                name='fat'
                id='fat'
                ref={fatVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='prot'>Filter by min protein value</label>
              <input
                type='text'
                name='prot'
                id='prot'
                ref={protVal}
                onChange={searchDish}
              />
              <br></br>
              <label htmlFor='carb'>Filter by max carb value</label>
              <input
                type='text'
                name='carb'
                id='carb'
                ref={carbVal}
                onChange={searchDish}
              />
                  
            <label htmlFor='ingr'>Ingredients</label>
            <Select
              ref={ingrVal}
              name="ingr"
              options={ingrs}
              isMulti
            />
            <button onClick={searchDish}>Filter by ingredients</button>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
