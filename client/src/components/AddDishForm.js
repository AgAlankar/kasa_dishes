import React, { Component } from 'react'
import TextField from '../components/TextField'

class AddDishForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dish: {
        dname: '',
        cuisine: '',
        veg: '',
        category: '',
        expertise: '',
        preptime: '',
        imageurl: '',
        recipeurl: '',
        calories: '',
        fats: '',
        proteins: '',
        carbs: '',
      },
      ingredients: [
        {
          key: Date.now(),
          iname: '',
          restrictions: '',
        },
      ],
    }
  }

  handleSubmit = async () => {
    const url = 'http://localhost:8080/api/dishes/'
    // console.log(this.state)
    const optbody = {
      dish: {
        ...this.state.dish,
      },
      ingredients: [...this.state.ingredients],
    }
    console.log(optbody)
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
    window.location.reload();
  }

  onChangeDish = (field, val) => {
    this.setState((prevState) => ({
      ...prevState,
      dish: { ...prevState.dish, [field]: val },
    }))
  }
  onChangeIngr = (inputIngredient) => {
    this.setState((prevState) => {
      const newIngredient = prevState.ingredients.map((element) => {
        if (element.key === inputIngredient.key) return inputIngredient
        return element
      })
      return {
        ...prevState,
        ingredients: newIngredient,
      }
    })
  }

  addElement = () => {
    const { iname, restrictions } = this.state
    this.setState((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.concat({
        key: Date.now(),
        iname,
        restrictions,
      }),
    }))
  }

  removeElement = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter(
        (ingredient) => ingredient.key !== id
      ),
    }))
  }

  render() {
    const { dish, ingredients } = this.state
    // console.log(Object.keys(dish))
    return (
      <div className='row'>
        <h3>Add a dish</h3>
        {Object.keys(dish).map((field) => {
          // console.log(field)
          return (
            <div key={field}>
              <input
                className='form-control'
                name={field}
                value={dish[field]}
                onChange={(ev) => {
                  const { name, value } = ev.target
                  // console.log(name, value)
                  this.onChangeDish(name, value)
                }}
                placeholder={field}
                type='text'
              />
              <br></br>
            </div>
          )
        })}
        {/* <input
          className='form-control'
          name='dname'
          value={dish.dname}
          onChange={(ev) => {
            const { name, value } = ev.target
            console.log(name, value)
            this.onChangeDish(name, value)
          }}
          placeholder='DishName'
          type='text'
        /> */}
        <br></br>
        <button type='button' onClick={this.addElement}>
          Add
        </button>
        <div className='col-md-12 form-group'>
          {ingredients.map((ingredient) => (
            <React.Fragment key={ingredient.key}>
              <TextField
                value={ingredient}
                onChange={(inputIngredient) =>
                  this.onChangeIngr(inputIngredient)
                }
              />
              <button
                type='button'
                onClick={() => this.removeElement(ingredient.key)}
                disabled={ingredients.length <= 1}
              >
                Remove
              </button>
              <br></br>
            </React.Fragment>
          ))}
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default AddDishForm
