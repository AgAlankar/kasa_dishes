import React, { Component } from 'react'

class TextField extends Component {
  handleChange = (ev) => {
    const { name, value } = ev.target
    this.props.onChange({
      ...this.props.value,
      [name]: value,
    })
  }

  render() {
    const { value: ingredient } = this.props
    return (
      <React.Fragment>
        <br></br>
        <input
          className='form-control'
          name='iname'
          value={ingredient.iname}
          onChange={this.handleChange}
          placeholder='iname'
          type='text'
          required
        />
        <hr></hr>
        <input
          className='form-control'
          name='restrictions'
          value={ingredient.restrictions}
          onChange={this.handleChange}
          placeholder='restrictions'
          type='text'
        />
        <hr></hr>
      </React.Fragment>
    )
  }
}

export default TextField
