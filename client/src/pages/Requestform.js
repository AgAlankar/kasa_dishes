import React from 'react'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    alert('A form was submitted: ' + this.state)
    const optbody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    }
    console.log(optbody)
    fetch('http://localhost:8080/api/ask', optbody).then(function (response) {
      console.log(response)
      return response.json()
    })

    event.preventDefault()
  }

  render() {
    return (
      <section className='section search'>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <div className='form-control row'>
            <label>
              Name of Dish:
              <input
                type='text'
                value={this.state.value}
                name='rname'
                onChange={this.handleChange}
                required
              />
            </label>
            <br></br>
            <label>
              Recipie link:
              <input
                type='text'
                value={this.state.value}
                name='recipieurl'
                onChange={this.handleChange}
                required
              />
            </label>
            <button
              className='btn btn-primary btn-details'
              type='submit'
              value='Submit'
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default MyForm
