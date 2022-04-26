import React, { Component } from 'react';
import AddDishForm from '../components/AddDishForm';
export default class AddDish extends Component {
  constructor(props){
    super(props);
    this.state={};
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
