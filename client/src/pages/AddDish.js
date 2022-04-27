import React, { Component } from 'react';
import AddDishForm from '../components/AddDishForm';
export default class AddDish extends Component {
  constructor(props){
    super(props);
    this.state={};
    const u = window.localStorage.getItem('sessAdmin')
    if (!u) {
      window.location.href = 'http://localhost:3000/'
    }
  }
  
  render(){
    return(
      <div className='row'>
        <div className='col'>
          <AddDishForm />
        </div>
        <div className='col'>
          
        </div>
      </div>
    )
  }
};
