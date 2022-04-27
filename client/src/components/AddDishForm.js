import React, { Component } from 'react'
import TextField from '../components/TextField'
import TextField2 from '../components/TextField2'

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
      equipments: [
        {
          key: Date.now(),
          ename: '',
        },
      ],
    }
  }
  setStateDish = async (newDish) => {
    await this.setState({ dish: newDish })
  }
  dishAdd = async () => {
    const url = 'http://localhost:8080/api/dishes/'
    // console.log(this.state)
    const optbody = {
      dish: {
        ...this.state.dish,
      },
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
    const parsebetter = (x) =>
      isNaN(parseFloat(x))
        ? isNaN(parseInt(x))
          ? x.substring(1, x.length - 1)
          : parseInt(x)
        : parseFloat(x)
    for (let k of Object.keys(data)) {
      data[k] = parsebetter(data[k])
    }
    // console.log(data)
    await this.setStateDish(data)
    // console.log(this.state.dish)
  }
  ingrAdd = async (ingr) => {
    const url = 'http://localhost:8080/api/ingredients/'
    console.log(this.state.dish.fid)
    const optbody = {
      FID: this.state.dish.fid,
      ...ingr,
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
  }

  equipAdd = async (equip) => {
    const url = 'http://localhost:8080/api/equipments/'
    console.log(this.state.dish.fid)
    const optbody = {
      FID: this.state.dish.fid,
      ...equip,
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
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.dishAdd()
    // window.localStorage.setItem('dish', JSON.stringify(this.state.dish))
    for (let ingr of this.state.ingredients) {
      if (ingr.iname !== '') {
        await this.ingrAdd({ ...ingr, IName: ingr.iname })
      }
    }

    for (let equip of this.state.equipments) {
      if (equip.ename !== '') {
        await this.equipAdd({ ...equip, EName: equip.ename })
        window.location.reload()
      }
    }
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
  onChangeEquip = (inputEquipment) => {
    this.setState((prevState) => {
      const newEquipment = prevState.equipments.map((element) => {
        if (element.key === inputEquipment.key) return inputEquipment
        return element
      })
      return {
        ...prevState,
        equipments: newEquipment,
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
  addEquipment = () => {
    const { ename } = this.state
    this.setState((prevState) => ({
      ...prevState,
      equipments: prevState.equipments.concat({
        key: Date.now(),
        ename,
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
  removeEquipment = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      equipments: prevState.equipments.filter(
        (equipment) => equipment.key !== id
      ),
    }))
  }

  render() {
    const { dish, ingredients, equipments } = this.state
    // console.log(Object.keys(dish))
    return (
      <section className='section search'>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <div className='form-control row'>
            <div className='row'>
              <label>ADD A DISH</label>
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
                      required
                    />
                    <hr></hr>
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

              <button
                className='btn btn-primary btn-details'
                type='button'
                onClick={this.addElement}
              >
                Add Ingredients
              </button>

              <div className='col-md-12 form-group'>
                {ingredients.map((ingredient) => (
                  <React.Fragment key={ingredient.key}>
                    <TextField
                      value={ingredient}
                      onChange={(inputIngredient) =>
                        this.onChangeIngr(inputIngredient)
                      }
                    ></TextField>
                    <br></br>
                    <button
                      className='btn btn-primary btn-details'
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
              <br></br>

              <button
                className='btn btn-primary btn-details'
                type='button'
                onClick={this.addEquipment}
              >
                Add Equipment
              </button>

              <div className='col-md-12 form-group'>
                {equipments.map((equipment) => (
                  <React.Fragment key={equipment.key}>
                    <TextField2
                      value={equipment}
                      onChange={(inputEquipment) =>
                        this.onChangeEquip(inputEquipment)
                      }
                    ></TextField2>
                    <br></br>
                    <button
                      className='btn btn-primary btn-details'
                      type='button'
                      onClick={() => this.removeEquipment(equipment.key)}
                      disabled={equipment.length <= 1}
                    >
                      Remove
                    </button>
                    <br></br>
                  </React.Fragment>
                ))}
              </div>
              <br></br>
              <button
              type='submit'
                className='btn btn-primary btn-details'
              > Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default AddDishForm
