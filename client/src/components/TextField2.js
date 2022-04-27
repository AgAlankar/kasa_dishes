import React, { Component } from 'react'

class TextField2 extends Component {
  handleChange = (ee) => {
    const { name, value } = ee.target
    this.props.onChange({
      ...this.props.value,
      [name]: value,
    })
  }

  render() {
    const { value: equipment } = this.props
    return (
      <React.Fragment>
        <br></br>
        <input
          className='form-control'
          name='ename'
          value={equipment.ename}
          onChange={this.handleChange}
          placeholder='ename'
          type='text'
        />
        <hr></hr>
      </React.Fragment>
    )
  }
}

export default TextField2
