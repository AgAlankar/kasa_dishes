import React, { useCallback, useEffect, useState } from 'react';

export default function Form() {

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState('');

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (event) => {
	event.preventDefault();
	if (name === '' || email === '' || password === '') {
	setError('Please enter all the fields');
	} else {
	setError('');
    


    const optbody = {
        uname:name ,
        pass:password ,
        email:email
    };        
    const options = {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json;charset=utf-8'
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(optbody)
      };
    
    console.log(optbody);
    fetch('http://localhost:8080/api/users/', 
    options).then(function(response) {
        console.log(response)
        if(response.status===500){
            setError('Already exists!')
        }else{
            setSubmitted(true);
        }
        return response.json();
      });
 
    event.preventDefault();


    }
};


// Showing success message
const successMessage = () => {
    if(submitted){
    setTimeout(() => {
        window.location.href = "http://localhost:3000/login"
    }, 1000);
    }
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>User {name} successfully registered!!</h1>
        <br></br>
        <h2>Redirecting..</h2>
	</div>
	);
    
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error.length>0 ? '' : 'none',
		}}>
		<h1>{error}</h1>
	</div>
	);
};

return (
	<section className='section search'>
      <div className='search-form'>
        <div className='form-control row'>
	<div>
		<h1>User Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		
		<label className="label">Name</label>
		<input onChange={handleName} className="input"
		value={name} type="text" required />

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" required/>

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" required/>
        <br></br>
		<br></br>
		<button  className='btn btn-primary btn-details' onClick={handleSubmit}  type="submit">
		Submit
		</button>
	</form>
	</div>
	</div>
	</section>
);
}
